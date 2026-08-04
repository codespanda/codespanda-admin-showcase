// Run: node scripts/optimize-images.js
// Generates optimized .webp siblings for every raster image under public/images
// plus public/logo.png. Originals are kept on disk (used as social/OG images and
// icons); on-page <img> references point at the .webp versions for fast LCP/FCP.
//
// - Caps very large images at 1600px wide (plenty for full-width web heroes).
// - quality 80 (82 for the logo) — visually lossless for UI screenshots.
// - Skips regeneration when an up-to-date .webp already exists.
import { readdirSync, statSync, existsSync } from "fs";
import { resolve, dirname, join, extname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, "../public");
const MAX_WIDTH = 1600;

/** Recursively collect raster images (png/jpg/jpeg) under a directory. */
function collect(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) collect(full, out);
    else if (/\.(png|jpe?g)$/i.test(name)) out.push(full);
  }
  return out;
}

const targets = [
  ...collect(join(PUBLIC, "images")),
  join(PUBLIC, "logo.png"),
].filter(existsSync);

let converted = 0, skipped = 0, savedBytes = 0;

for (const src of targets) {
  const webp = src.replace(/\.(png|jpe?g)$/i, ".webp");
  // Skip if webp exists and is newer than the source.
  if (existsSync(webp) && statSync(webp).mtimeMs >= statSync(src).mtimeMs) {
    skipped++;
    continue;
  }
  const isLogo = src.endsWith("logo.png");
  const rel = src.slice(PUBLIC.length + 1).replace(/\\/g, "/");
  try {
    const meta = await sharp(src).metadata();
    const pipeline = sharp(src);
    if (!isLogo && meta.width > MAX_WIDTH) {
      pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
    await pipeline.webp({ quality: isLogo ? 82 : 80 }).toFile(webp);
    const before = statSync(src).size;
    const after = statSync(webp).size;
    savedBytes += before - after;
    converted++;
    console.log(
      `  ${rel}  ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB webp`
    );
  } catch (err) {
    console.warn(`  ! skipped ${rel} — ${err.message.split("\n")[0]}`);
  }
}

console.log(
  `\n✓ ${converted} converted, ${skipped} up-to-date — saved ${Math.round(savedBytes / 1024 / 1024 * 10) / 10} MB`
);
