// node scripts/screenshot-template-galleries.js [--only=alpine|brisk|portfolio]
//
// Captures the gallery screenshots for the Alpine, Brisk and Portfolio template
// detail pages by screenshotting the live deployed demo apps. These previously
// shipped as broken 404-placeholder files (see commit fa35a00). Re-run to refresh.
//
// The demo apps are GitHub-Pages-style SPAs: deep links return an HTTP 404 whose
// 404.html boots the app and client-routes to the target view, so we navigate and
// wait for the real content to render before shooting.
import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";
import { mkdirSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, "../public/images");

const JOBS = {
  alpine: {
    dir: path.join(PUBLIC, "alpine"),
    base: "https://codespanda.github.io/Alpine-Admin-React",
    theme: "dark",
    pages: [
      { file: "employees.png",   route: "/employees" },
      { file: "attendance.png",  route: "/attendance" },
      { file: "leave.png",       route: "/leaves" },
      { file: "payroll.png",     route: "/payroll" },
      { file: "performance.png", route: "/performance" },
    ],
  },
  brisk: {
    dir: path.join(PUBLIC, "brisk"),
    base: "https://brisk.codespanda.com",
    theme: "dark",
    pages: [
      { file: "products.png",  route: "/products" },
      { file: "orders.png",    route: "/orders" },
      { file: "customers.png", route: "/customers" },
      { file: "analytics.png", route: "/analytics" },
      { file: "settings.png",  route: "/settings" },
    ],
  },
  // Portfolio is a single-page site; each "page" is a section captured by
  // scrolling its anchor into view and shooting the viewport.
  portfolio: {
    dir: path.join(PUBLIC, "portfolio"),
    base: "https://codespanda.github.io/portfolio",
    theme: "light",
    sections: [
      { file: "about.jpg",    anchor: "#about" },
      { file: "projects.jpg", anchor: "#projects" },
      { file: "skills.jpg",   anchor: "#skills" },
      { file: "contact.jpg",  anchor: "#contact" },
      { file: "footer.jpg",   anchor: "footer" },
    ],
  },
};

const only = (process.argv.find((a) => a.startsWith("--only=")) || "").split("=")[1];
const selected = only ? { [only]: JOBS[only] } : JOBS;

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1440,900"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

for (const [name, job] of Object.entries(selected)) {
  if (!job) { console.error(`unknown job: ${name}`); continue; }
  mkdirSync(job.dir, { recursive: true });
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: job.theme }]);
  console.log(`\n== ${name} (${job.base}) ==`);

  if (job.pages) {
    for (const { file, route } of job.pages) {
      try {
        await page.goto(job.base + route, { waitUntil: "networkidle2", timeout: 40000 });
        await new Promise((r) => setTimeout(r, 2500));
        await page.screenshot({ path: path.join(job.dir, file), fullPage: false });
        console.log(`  ✓ ${file}`);
      } catch (err) {
        console.error(`  ✗ ${file}: ${err.message.split("\n")[0]}`);
      }
    }
  } else {
    // Single-page: load once, then scroll to each section.
    await page.goto(job.base + "/", { waitUntil: "networkidle2", timeout: 40000 });
    await new Promise((r) => setTimeout(r, 2500));
    for (const { file, anchor } of job.sections) {
      try {
        await page.evaluate((sel) => {
          const el = sel.startsWith("#")
            ? document.querySelector(sel) || document.getElementById(sel.slice(1))
            : document.querySelector(sel);
          if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
        }, anchor);
        await new Promise((r) => setTimeout(r, 1200));
        await page.screenshot({ path: path.join(job.dir, file), fullPage: false });
        console.log(`  ✓ ${file}`);
      } catch (err) {
        console.error(`  ✗ ${file}: ${err.message.split("\n")[0]}`);
      }
    }
  }
}

await browser.close();
console.log("\nDone.");
