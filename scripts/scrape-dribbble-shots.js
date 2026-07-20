// node scripts/scrape-dribbble-shots.js
// Visits each Dribbble shot page with Puppeteer and extracts:
//   - full-size image URLs (all userupload images)
//   - description text
import puppeteer from 'puppeteer';

const SHOT_URLS = [
  { id: 'homefinder',         url: 'https://dribbble.com/shots/27570937-HomeFinder-Real-Estate-App-UI' },
  { id: 'taxi',               url: 'https://dribbble.com/shots/27570927-Taxi-Booking-App-Modern-Ride-Hailing-UI' },
  { id: 'music',              url: 'https://dribbble.com/shots/27570919-Music-Streaming-App-Premium-Mobile-UI-Design' },
  { id: 'medicare',           url: 'https://dribbble.com/shots/27570916-Medicare-Clinic-App-Healthcare-Mobile-UI' },
  { id: 'carwash',            url: 'https://dribbble.com/shots/27570910-Car-Wash-App-Premium-Mobile-UI-Design' },
  { id: 'kids-learning',      url: 'https://dribbble.com/shots/27570908-Kids-Learning-App-Fun-Interactive-Education-UI' },
  { id: 'nexora-crm',         url: 'https://dribbble.com/shots/27570895-Nexora-CRM-Modern-Customer-Relationship-Management-Dashboard' },
  { id: 'nexora-admin',       url: 'https://dribbble.com/shots/27570880-Nexora-Modern-Admin-Dashboard-UI' },
  { id: 'interior',           url: 'https://dribbble.com/shots/27561784-Interior-Decoration-Mobile-App-UI' },
  { id: 'ebooks',             url: 'https://dribbble.com/shots/27561762-eBooks-App-UI-Design' },
  { id: 'school',             url: 'https://dribbble.com/shots/27561743-Modern-School-Management-System-UI' },
  { id: 'hairaura',           url: 'https://dribbble.com/shots/27558538-HairAura-Hair-Salon-Mobile-App-UI-Design' },
  { id: 'harmony',            url: 'https://dribbble.com/shots/27558401-Harmony-Music-Streaming-Mobile-App-UI-Design' },
  { id: 'foodiego',           url: 'https://dribbble.com/shots/27558165-FoodieGo-Food-Delivery-Mobile-App-UI' },
  { id: 'beauty',             url: 'https://dribbble.com/shots/27558126-Beauty-Skincare-Cosmetics-Mobile-App-UI' },
  { id: 'waygo',              url: 'https://dribbble.com/shots/27558077-WayGo-Smart-Car-Travel-Road-Trip-App-UI' },
  { id: 'lumiere',            url: 'https://dribbble.com/shots/27558047-Lumi-re-Luxury-Jewellery-Shopping-App-UI' },
  { id: 'nutrifit',           url: 'https://dribbble.com/shots/27558023-NutriFit-Healthy-Products-Marketplace-Nutrition-App' },
  { id: 'cornerstone-concept',url: 'https://dribbble.com/shots/27555844-Cornerstone-Modern-SaaS-Landing-Page-Concept' },
  { id: 'jewellery-pos',      url: 'https://dribbble.com/shots/27549892-Luxury-Jewellery-POS-System-UI' },
  { id: 'cafe-pos',           url: 'https://dribbble.com/shots/27549817-Modern-Cafe-POS-Dashboard-UI' },
  { id: 'posymart',           url: 'https://dribbble.com/shots/27548893-PosyMart-Modern-Cafe-POS-Dashboard-UI' },
  { id: 'ecommerce-admin',    url: 'https://dribbble.com/shots/27547992-Modern-E-commerce-Admin-Dashboard-UI' },
  { id: 'greenerp',           url: 'https://dribbble.com/shots/27547980-GreenERP-Modern-ERP-Dashboard-Finance-Business-Management' },
];

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

const results = [];

for (const { id, url } of SHOT_URLS) {
  process.stdout.write(`Scraping ${id}...`);
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    const data = await page.evaluate(() => {
      // All full-res userupload images (not avatars, not tiny)
      const imgs = [...document.querySelectorAll('img')]
        .map(i => i.src)
        .filter(s => s && s.includes('cdn.dribbble.com/userupload') && !s.includes('avatar'))
        .filter((s, i, a) => a.indexOf(s) === i); // unique

      // Description — try multiple selectors
      const descSelectors = [
        '[class*="shot-description"]',
        '[class*="shot_description"]',
        '.shot-desc',
        '[data-testid="shot-description"]',
      ];
      let desc = '';
      for (const sel of descSelectors) {
        const el = document.querySelector(sel);
        if (el?.textContent?.trim()) { desc = el.textContent.trim(); break; }
      }

      return { imgs, desc: desc.slice(0, 600) };
    });

    results.push({ id, url, imgs: data.imgs, desc: data.desc });
    console.log(` ✓ ${data.imgs.length} imgs, desc=${data.desc ? data.desc.slice(0, 40) + '…' : 'none'}`);
  } catch (e) {
    console.log(` ✗ ${e.message}`);
    results.push({ id, url, imgs: [], desc: '' });
  }

  await new Promise(r => setTimeout(r, 800));
}

await browser.close();

console.log('\n--- RESULTS ---');
console.log(JSON.stringify(results, null, 2));
