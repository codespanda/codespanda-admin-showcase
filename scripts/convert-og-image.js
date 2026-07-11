import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const svg = readFileSync(resolve(__dirname, "../public/og-image.svg"));

await sharp(svg)
  .resize(1200, 630)
  .png()
  .toFile(resolve(__dirname, "../public/og-image.png"));

console.log("✓ og-image.png written (1200×630)");
