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
await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 2500));

// Get scroll positions of ALL sections
const sectionTops = await page.evaluate(() => {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  return Array.from(document.querySelectorAll('section')).map((el, i) => ({
    index: i,
    id: el.id || null,
    top: Math.min(el.getBoundingClientRect().top + window.scrollY, maxScroll),
  }));
});
console.log('All sections:', JSON.stringify(sectionTops, null, 2));

// Map section indices to output filenames
// Order in App.tsx: Hero(0) TripPlanner(1) IndiaMap(2) Experiences(3) Unesco(4)
//   ItineraryBuilder(5) Festivals(6) Hotels(7) FoodTrails(8) CinematicVideos(9)
//   Gallery(10) BestTime(11) VisaInfo(12)
const FILE_MAP = [
  'hero.png',
  'trip-planner.png',
  'india-map.png',
  'experiences.png',
  'unesco.png',
  'itinerary-builder.png',
  'festivals.png',
  'hotels.png',
  'food-trails.png',
  'cinematic-videos.png',
  'gallery.png',
  'best-time.png',
  'visa-info.png',
];

for (const sec of sectionTops) {
  const file = FILE_MAP[sec.index];
  if (!file) continue;
  try {
    await page.evaluate((y) => window.scrollTo(0, y), sec.top);
    await new Promise(r => setTimeout(r, 900));
    await page.screenshot({ path: path.join(OUT_DIR, file), fullPage: false });
    console.log(`✓ ${file} (section #${sec.index}, id="${sec.id}", scrollY=${sec.top})`);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
  }
}

await browser.close();
console.log('Done.');
