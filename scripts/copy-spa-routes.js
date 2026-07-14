// Run after vite build: node scripts/copy-spa-routes.js
// Copies dist/index.html to BOTH dist/<route>.html and dist/<route>/index.html
// for each known SPA route, so GitHub Pages serves real content directly for
// either URL form (with or without a trailing slash) instead of:
// - falling through to 404.html's client-side "?p=" redirect, or
// - 301-redirecting one of the two URL forms to the other
// (all of which Lighthouse/crawlers see as a redirect away from the
// requested URL).
import { mkdirSync, existsSync, readFileSync, writeFileSync } from "fs";
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

// Each page's eager/fetchPriority=high hero <img> src — kept in sync with the
// corresponding page component so the browser can discover and preload it
// from the static HTML, before React ever boots.
const HERO_IMAGE = {
  "/": "/images/alpine-dashboard.png",
  "/templates/Alpine-Admin-React": "/images/alpine/dashboard.webp",
  "/templates/Brisk-Admin": "/images/brisk/dashboard.png",
  "/templates/portfolio-template": "/images/portfolio/portfolio.jpg",
  "/templates/cornerstone": "/images/cornerstone-dashboard-2.png",
};

function withHeroPreload(html, route) {
  const heroSrc = HERO_IMAGE[route];
  if (!heroSrc) return html;
  const tag = `<link rel="preload" as="image" fetchpriority="high" href="${heroSrc}" />\n    `;
  return html.replace("<meta name=\"viewport\"", tag + "<meta name=\"viewport\"");
}

const indexHtml = resolve(DIST, "index.html");
if (!existsSync(indexHtml)) {
  console.error("dist/index.html not found — run vite build first");
  process.exit(1);
}

const baseHtml = readFileSync(indexHtml, "utf-8");

writeFileSync(indexHtml, withHeroPreload(baseHtml, "/"));

for (const route of ROUTES) {
  const html = withHeroPreload(baseHtml, route);

  const flatTarget = resolve(DIST, "." + route + ".html");
  mkdirSync(dirname(flatTarget), { recursive: true });
  writeFileSync(flatTarget, html);

  const dirTarget = resolve(DIST, "." + route, "index.html");
  mkdirSync(dirname(dirTarget), { recursive: true });
  writeFileSync(dirTarget, html);
}
console.log(`✓ wrote index.html to ${ROUTES.length * 2} SPA route paths (with per-route hero preload)`);
