// node scripts/scrape-remaining-shots.js
import puppeteer from 'puppeteer';

const SHOTS = [
  { id: 'kids-learning',      thumbId: 48428848, url: 'https://dribbble.com/shots/27570908-Kids-Learning-App-Fun-Interactive-Education-UI' },
  { id: 'nexora-crm',         thumbId: 48428809, url: 'https://dribbble.com/shots/27570895-Nexora-CRM-Modern-Customer-Relationship-Management-Dashboard' },
  { id: 'nexora-admin',       thumbId: 48428771, url: 'https://dribbble.com/shots/27570880-Nexora-Modern-Admin-Dashboard-UI' },
  { id: 'interior',           thumbId: 48395766, url: 'https://dribbble.com/shots/27561784-Interior-Decoration-Mobile-App-UI' },
  { id: 'ebooks',             thumbId: 48395665, url: 'https://dribbble.com/shots/27561762-eBooks-App-UI-Design' },
  { id: 'school',             thumbId: 48395620, url: 'https://dribbble.com/shots/27561743-Modern-School-Management-System-UI' },
  { id: 'hairaura',           thumbId: 48384064, url: 'https://dribbble.com/shots/27558538-HairAura-Hair-Salon-Mobile-App-UI-Design' },
  { id: 'harmony',            thumbId: 48383665, url: 'https://dribbble.com/shots/27558401-Harmony-Music-Streaming-Mobile-App-UI-Design' },
  { id: 'foodiego',           thumbId: 48382845, url: 'https://dribbble.com/shots/27558165-FoodieGo-Food-Delivery-Mobile-App-UI' },
  { id: 'beauty',             thumbId: 48382647, url: 'https://dribbble.com/shots/27558126-Beauty-Skincare-Cosmetics-Mobile-App-UI' },
  { id: 'waygo',              thumbId: 48382527, url: 'https://dribbble.com/shots/27558077-WayGo-Smart-Car-Travel-Road-Trip-App-UI' },
  { id: 'lumiere',            thumbId: 48382450, url: 'https://dribbble.com/shots/27558047-Lumi-re-Luxury-Jewellery-Shopping-App-UI' },
  { id: 'nutrifit',           thumbId: 48382383, url: 'https://dribbble.com/shots/27558023-NutriFit-Healthy-Products-Marketplace-Nutrition-App' },
  { id: 'cornerstone-concept',thumbId: 48374252, url: 'https://dribbble.com/shots/27555844-Cornerstone-Modern-SaaS-Landing-Page-Concept' },
  { id: 'jewellery-pos',      thumbId: 48352741, url: 'https://dribbble.com/shots/27549892-Luxury-Jewellery-POS-System-UI' },
  { id: 'cafe-pos',           thumbId: 48352510, url: 'https://dribbble.com/shots/27549817-Modern-Cafe-POS-Dashboard-UI' },
  { id: 'posymart',           thumbId: 48348854, url: 'https://dribbble.com/shots/27548893-PosyMart-Modern-Cafe-POS-Dashboard-UI' },
  { id: 'greenerp',           thumbId: 48344990, url: 'https://dribbble.com/shots/27547980-GreenERP-Modern-ERP-Dashboard-Finance-Business-Management' },
];

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

const results = [];

for (const shot of SHOTS) {
  process.stdout.write(`Scraping ${shot.id}...`);

  try {
    await page.goto(shot.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));

    for (let i = 0; i < 6; i++) {
      await page.evaluate(() => window.scrollBy(0, 600));
      await new Promise(r => setTimeout(r, 500));
    }

    const data = await page.evaluate((thumbId) => {
      const uploadIdMap = new Map();
      [...document.querySelectorAll('img')].forEach(img => {
        const m = img.src.match(/userupload\/(\d+)\/file\/([a-f0-9]+\.\w+)/);
        if (!m || img.src.includes('avatar')) return;
        const id = parseInt(m[1]);
        if (!uploadIdMap.has(id)) uploadIdMap.set(id, m[2]);
      });
      [...document.querySelectorAll('img[srcset]')].forEach(img => {
        img.srcset.split(',').forEach(part => {
          const src = part.trim().split(' ')[0];
          const m = src.match(/userupload\/(\d+)\/file\/([a-f0-9]+\.\w+)/);
          if (!m || src.includes('avatar')) return;
          const id = parseInt(m[1]);
          if (!uploadIdMap.has(id)) uploadIdMap.set(id, m[2]);
        });
      });

      const shotImgs = [];
      uploadIdMap.forEach((file, id) => {
        if (id >= thumbId - 2 && id <= thumbId + 30) {
          shotImgs.push({ id, file });
        }
      });
      shotImgs.sort((a, b) => a.id - b.id);

      const descSelectors = [
        '[class*="shot-description"]',
        '[class*="ShotDescription"]',
        '[class*="description"]',
        'article',
      ];
      let desc = '';
      for (const sel of descSelectors) {
        const el = document.querySelector(sel);
        const t = el?.innerText?.trim();
        if (t && t.length > 50) { desc = t; break; }
      }
      if (!desc) {
        const candidates = [...document.querySelectorAll('p, div')]
          .map(el => el.innerText?.trim() || '')
          .filter(t => t.length > 100 && !t.includes('Dribbble') && !t.includes('Follow'))
          .sort((a, b) => b.length - a.length);
        if (candidates[0]) desc = candidates[0];
      }

      return { shotImgs, desc: desc.slice(0, 3000) };
    }, shot.thumbId);

    const gallery = data.shotImgs
      .filter(img => img.id !== shot.thumbId && img.id !== shot.thumbId + 1)
      .map(img => `https://cdn.dribbble.com/userupload/${img.id}/file/${img.file}?resize=1600x&vertical=center`);

    results.push({ id: shot.id, gallery, description: data.desc });
    console.log(` ✓  gallery: ${gallery.length}, desc: ${data.desc ? data.desc.slice(0, 60).replace(/\n/g, ' ') + '…' : 'none'}`);
  } catch (e) {
    console.log(` ✗  ${e.message}`);
    results.push({ id: shot.id, gallery: [], description: '' });
  }

  await new Promise(r => setTimeout(r, 1000));
}

await browser.close();

console.log('\n\n===== RESULTS =====\n');
console.log(JSON.stringify(results, null, 2));
