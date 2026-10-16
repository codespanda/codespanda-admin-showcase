// node scripts/screenshot-lassiwala.js
// Captures the LassiWala template screens at 1600x1000 as WebP.
import puppeteer from 'puppeteer';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../public/images/lassiwala');
mkdirSync(OUT_DIR, { recursive: true });

const SITE = 'https://lassiwala.codespanda.com';

// name, path, and an optional selector to scroll to the top of the view
const SHOTS = [
  ['hero', '/'],
  ['range', '/', '#range'],
  ['shop', '/our-lassi', '[role="tablist"]'],
  ['flavors', '/flavors#mango-lassi'],
  ['story', '/our-story', 'ol'],
  ['find-us', '/find-us'],
  ['contact', '/contact'],
];

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
// 1280x800 CSS pixels at 1.25x gives the 1600x1000 frame the other templates use
await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1.25 });

for (const [name, route, selector] of SHOTS) {
  console.log(`Capturing ${name}...`);
  await page.goto(SITE + route, { waitUntil: 'networkidle0', timeout: 45000 });
  await page.evaluate(() => document.fonts.ready);
  if (selector) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      // leave room for the sticky header
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'instant' });
    }, selector);
  }
  await new Promise((r) => setTimeout(r, 1200));
  const png = await page.screenshot({ fullPage: false });
  await sharp(png).webp({ quality: 82 }).toFile(path.join(OUT_DIR, `${name}.webp`));
  console.log(`  ✓ ${name}.webp`);
}

await browser.close();
console.log('Done.');
