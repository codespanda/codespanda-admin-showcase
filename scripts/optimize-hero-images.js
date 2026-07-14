// One-off: resize+convert oversized hero images to WebP.
// Run with: node scripts/optimize-hero-images.js
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const src = resolve(ROOT, "public/images/alpine/dashboard.png");
const out = resolve(ROOT, "public/images/alpine/dashboard.webp");

const meta = await sharp(src).metadata();
const width = Math.min(1600, meta.width);

const info = await sharp(src)
  .resize({ width })
  .webp({ quality: 82 })
  .toFile(out);

console.log(`✓ ${src} (${meta.width}x${meta.height}) → ${out} (${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB)`);
