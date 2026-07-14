// Run after vite build: node scripts/copy-spa-routes.js
// Copies dist/index.html to dist/<route>/index.html for each known SPA route
// so GitHub Pages serves real content directly instead of falling through to
// 404.html's client-side "?p=" redirect (which Lighthouse/crawlers see as a
// redirect away from the requested URL).
import { mkdirSync, copyFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "../dist");

const ROUTES = [
  "/templates",
  "/templates/Alpine-Admin-React",
  "/templates/Brisk-Admin",
  "/templates/portfolio-template",
  "/templates/cornerstone",
  "/legal/privacy",
  "/legal/terms",
  "/legal/security",
];

const indexHtml = resolve(DIST, "index.html");
if (!existsSync(indexHtml)) {
  console.error("dist/index.html not found — run vite build first");
  process.exit(1);
}

for (const route of ROUTES) {
  const dir = resolve(DIST, "." + route);
  mkdirSync(dir, { recursive: true });
  copyFileSync(indexHtml, resolve(dir, "index.html"));
}
console.log(`✓ copied index.html to ${ROUTES.length} SPA route paths`);
