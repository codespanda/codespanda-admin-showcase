// node scripts/screenshot-ca-firm.js
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../public/images/ca-firm');
mkdirSync(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

console.log('Capturing hero...');
await page.goto('https://ca-firm.codespanda.com/', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: path.join(OUT_DIR, 'hero.png'), fullPage: false });
console.log('  ✓ hero.png');

await browser.close();
console.log('Done.');
