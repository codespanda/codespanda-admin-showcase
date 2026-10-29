// Run last in the build: node scripts/prerender.js
// Loads every route that copy-spa-routes.js wrote into dist/ in headless Chrome and saves
// the rendered page over it, so crawlers that don't run JavaScript (Bing, link-preview
// scrapers) get the page's real content instead of an empty <div id="root">.
// The app still boots normally: createRoot replaces the pre-rendered markup on load.
import http from "http";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { extname, join, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "../dist");
const PORT = 4791;
const ORIGIN = `http://localhost:${PORT}`;
const CONCURRENCY = 6;
/** Private or no-index pages are left as they are. */
const SKIP = new Set(["/studio"]);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".woff2": "font/woff2",
};

/** The file GitHub Pages would serve for a path. */
function fileFor(urlPath) {
  const path = decodeURIComponent(urlPath.split("?")[0]);
  const direct = join(DIST, path);
  if (existsSync(direct) && statSync(direct).isFile()) return direct;
  if (existsSync(join(direct, "index.html"))) return join(direct, "index.html");
  if (existsSync(`${direct}.html`)) return `${direct}.html`;
  return join(DIST, "404.html");
}

/** Every route copy-spa-routes.js wrote: dist/index.html and each dist/<route>/index.html. */
function routes(dir = DIST, base = "") {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory() || name === "assets" || name === "images") continue;
    if (existsSync(join(full, "index.html"))) out.push(`${base}/${name}`);
    out.push(...routes(full, `${base}/${name}`));
  }
  return base ? out : ["/", ...out];
}

const server = http.createServer((req, res) => {
  const file = fileFor(req.url ?? "/");
  res.writeHead(file.endsWith("404.html") && !req.url?.endsWith("404.html") ? 404 : 200, {
    "Content-Type": TYPES[extname(file)] ?? "application/octet-stream",
  });
  res.end(readFileSync(file));
});
await new Promise((ok) => server.listen(PORT, ok));

// On Windows the installed Chrome is more reliable than Puppeteer's download; CI (Linux) uses the download.
const WINDOWS_CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const chrome = process.env.PRERENDER_CHROME || (process.platform === "win32" && existsSync(WINDOWS_CHROME) ? WINDOWS_CHROME : undefined);

let browser;
try {
  browser = await puppeteer.launch({
    headless: true,
    ...(chrome ? { executablePath: chrome } : {}),
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
} catch (err) {
  // Never fail the build over this: the static pages still work, they're just thinner for crawlers.
  console.warn(`⚠ skipped pre-rendering, Chrome could not start (${err.message.split("\n")[0]}). Set PRERENDER_CHROME to a Chrome path.`);
  server.close();
  process.exit(0);
}

async function render(page, route) {
  // Keep the snapshot to the site itself: no analytics hits, fonts or third-party images from the build.
  await page.goto(`${ORIGIN}${route}`, { waitUntil: "networkidle0", timeout: 30000 }).catch(() => {});
  await page.waitForFunction(() => (document.getElementById("root")?.children.length ?? 0) > 0, { timeout: 15000 });
  await new Promise((r) => setTimeout(r, 250));
  return page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);
}

const todo = routes().filter((r) => !SKIP.has(r));
let done = 0;
const failed = [];

async function worker() {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setRequestInterception(true);
  page.on("request", (req) => (req.url().startsWith(ORIGIN) || req.url().startsWith("data:") ? req.continue() : req.abort()));
  for (let route = todo.shift(); route; route = todo.shift()) {
    try {
      const target = route === "/" ? join(DIST, "index.html") : join(DIST, route, "index.html");
      const original = readFileSync(target, "utf8");
      const rendered = await render(page, route);
      // Keep the shipped <head> (its title, meta, share image and JSON-LD come from copy-spa-routes.js)
      // and <html> tag; take only the rendered <body>.
      const bodyAt = rendered.search(/<body[\s>]/i);
      if (bodyAt < 0) throw new Error("no <body> in the rendered page");
      const html = original.slice(0, original.search(/<body[\s>]/i)) + rendered.slice(bodyAt);
      writeFileSync(target, html);
      if (route !== "/" && existsSync(join(DIST, `${route}.html`))) writeFileSync(join(DIST, `${route}.html`), html);
      done++;
    } catch (err) {
      failed.push(`${route}: ${err.message}`);
    }
  }
  await page.close();
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));
await browser.close();
server.close();

console.log(`✓ pre-rendered ${done} routes`);
if (failed.length) {
  console.error(`✗ ${failed.length} routes kept their static HTML:\n  ${failed.join("\n  ")}`);
}
