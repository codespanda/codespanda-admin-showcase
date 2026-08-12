// node scripts/screenshot-finovo.js
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync, existsSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../public/images/finovo');
const BASE = 'https://finovo.codespanda.com';

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const PAGES = [
  { file: 'dashboard.png', url: `${BASE}/` },
  { file: 'sales.png',     url: `${BASE}/sales/invoices` },
  { file: 'purchases.png', url: `${BASE}/purchases/bills` },
  { file: 'banking.png',   url: `${BASE}/banking` },
  { file: 'payroll.png',   url: `${BASE}/payroll` },
  { file: 'inventory.png', url: `${BASE}/inventory/items` },
  { file: 'projects.png',  url: `${BASE}/projects` },
  { file: 'tax.png',       url: `${BASE}/tax` },
  { file: 'reports.png',   url: `${BASE}/reports` },
  { file: 'contacts.png',  url: `${BASE}/contacts` },
  { file: 'settings.png',  url: `${BASE}/settings` },
];

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// Set light mode preference to match Finovo's default theme
await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);

for (const { file, url } of PAGES) {
  try {
    console.log(`Capturing ${url} ...`);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1200));
    const out = path.join(OUT_DIR, file);
    await page.screenshot({ path: out, fullPage: false });
    console.log(`  ✓ ${file}`);
  } catch (err) {
    console.error(`  ✗ ${file}: ${err.message}`);
  }
}

await browser.close();
console.log('Done.');
