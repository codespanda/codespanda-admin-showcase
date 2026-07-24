// node scripts/screenshot-hamarabharat.js
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../public/images/hamarabharat');
fs.mkdirSync(OUT_DIR, { recursive: true });

const BASE = 'https://hamarabharat.codespanda.com';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// Load page once
await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));

const SHOTS = [
  { file: 'hero.png',          selector: null,                scrollY: 0 },
  { file: 'trip-planner.png',  selector: null,                scrollY: 900 },
  { file: 'india-map.png',     selector: null,                scrollY: 1800 },
  { file: 'experiences.png',   selector: null,                scrollY: 2700 },
  { file: 'festivals.png',     selector: null,                scrollY: 4500 },
  { file: 'food-trails.png',   selector: null,                scrollY: 5400 },
  { file: 'gallery.png',       selector: null,                scrollY: 7200 },
];

for (const { file, scrollY } of SHOTS) {
  try {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await new Promise(r => setTimeout(r, 800));
    const out = path.join(OUT_DIR, file);
    await page.screenshot({ path: out, fullPage: false });
    console.log(`✓ ${file}`);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
  }
}

await browser.close();
console.log('Done.');
