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
const BASE = "https://codespanda.com";

const ROUTES = [
  "/templates",
  "/templates/Alpine-Admin-React",
  "/templates/Brisk-Admin",
  "/templates/portfolio-template",
  "/templates/cornerstone",
  "/templates/flowers",
  "/portfolio",
  "/legal/privacy",
  "/legal/terms",
  "/legal/security",
];

// Per-route static meta injected into the pre-rendered HTML so crawlers and
// social scrapers see correct title/description/canonical before JS runs.
const PAGE_META = {
  "/": {
    title: "CodeSpanda — Free React Admin Dashboard Templates",
    description: "Free, production-ready React admin dashboard templates built with Vite, Tailwind CSS and TypeScript. Download Alpine, Brisk, Cornerstone, Flowers POS and more.",
    ogImage: `${BASE}/og-image.png`,
  },
  "/templates": {
    title: "All Templates — CodeSpanda",
    description: "Browse all free, production-ready React admin dashboard and SaaS templates by CodeSpanda. Built with Vite, Tailwind CSS and TypeScript.",
    ogImage: `${BASE}/og-image.png`,
  },
  "/templates/Alpine-Admin-React": {
    title: "Alpine Admin React — Free HR Dashboard Template | CodeSpanda",
    description: "A comprehensive HR admin dashboard template with 30+ pages covering employees, payroll, attendance, leave management and performance. Built with React, Vite and Tailwind CSS.",
    ogImage: `${BASE}/images/alpine/dashboard.png`,
  },
  "/templates/Brisk-Admin": {
    title: "Brisk Admin — Free React Admin Dashboard Template | CodeSpanda",
    description: "A sleek, enterprise-grade admin dashboard template with clean layouts and responsive design. Perfect for building business management systems and CRMs.",
    ogImage: `${BASE}/images/brisk/dashboard.png`,
  },
  "/templates/portfolio-template": {
    title: "Portfolio Template — Free React Portfolio | CodeSpanda",
    description: "A clean, modern portfolio template for developers and designers built with React, Vite and Tailwind CSS.",
    ogImage: `${BASE}/images/portfolio/portfolio.jpg`,
  },
  "/templates/cornerstone": {
    title: "Cornerstone — Free React SaaS Dashboard Template | CodeSpanda",
    description: "A complete SaaS dashboard template with 30+ pages for customers, orders, billing, analytics and support. Built with React, Vite, Tailwind CSS and TypeScript.",
    ogImage: `${BASE}/images/cornerstone-dashboard-2.png`,
  },
  "/templates/flowers": {
    title: "Flowers POS — Free React Point-of-Sale Template | CodeSpanda",
    description: "A beautiful point-of-sale system template for flower shops and retail boutiques. Covers product grid, cart, coupons, orders, customers and reports.",
    ogImage: `${BASE}/images/flowers/pos-counter.png`,
  },
  "/portfolio": {
    title: "Deepak Kumar — UI/UX Designer & React Developer | Portfolio",
    description: "Portfolio of Deepak Kumar — UI/UX designer and React developer from Mohali, India. 24+ design shots covering mobile apps, dashboards, SaaS and POS design.",
    ogImage: "https://cdn.dribbble.com/userupload/48428945/file/007a381ab43254d9a40ffde8369916a5.png?format=webp&resize=400x300&vertical=center",
  },
  "/legal/privacy": {
    title: "Privacy Policy — CodeSpanda",
    description: "Privacy policy for CodeSpanda — how we collect, use and protect your data.",
  },
  "/legal/terms": {
    title: "Terms of Service — CodeSpanda",
    description: "Terms of service for CodeSpanda React templates.",
  },
  "/legal/security": {
    title: "Security — CodeSpanda",
    description: "Security policy for CodeSpanda.",
  },
};

// Each page's eager/fetchPriority=high hero <img> src — kept in sync with the
// corresponding page component so the browser can discover and preload it
// from the static HTML, before React ever boots.
const HERO_IMAGE = {
  "/": "/images/alpine-dashboard.png",
  "/templates/Alpine-Admin-React": "/images/alpine/dashboard.webp",
  "/templates/Brisk-Admin": "/images/brisk/dashboard.png",
  "/templates/portfolio-template": "/images/portfolio/portfolio.jpg",
  "/templates/cornerstone": "/images/cornerstone-dashboard-2.png",
  "/templates/flowers": "/images/flowers/pos-counter.png",
};

function withHeroPreload(html, route) {
  const heroSrc = HERO_IMAGE[route];
  if (!heroSrc) return html;
  const tag = `<link rel="preload" as="image" fetchpriority="high" href="${heroSrc}" />\n    `;
  return html.replace("<meta name=\"viewport\"", tag + "<meta name=\"viewport\"");
}

// Inject per-page title, description, canonical and og tags into the <head>
// before React boots, so crawlers and social scrapers see correct metadata.
function withPageMeta(html, route) {
  const meta = PAGE_META[route];
  if (!meta) return html;

  const canonical = `${BASE}${route}`;

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);

  // Build the injection block (goes right after <meta name="viewport">)
  const inject = [
    `<meta name="description" content="${meta.description}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${meta.title}" />`,
    `<meta property="og:description" content="${meta.description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    meta.ogImage ? `<meta property="og:image" content="${meta.ogImage}" />` : "",
    `<meta name="twitter:title" content="${meta.title}" />`,
    `<meta name="twitter:description" content="${meta.description}" />`,
    meta.ogImage ? `<meta name="twitter:image" content="${meta.ogImage}" />` : "",
  ].filter(Boolean).join("\n    ");

  // Insert after viewport meta
  html = html.replace(
    /(<meta name="viewport"[^/]*\/>)/,
    `$1\n    ${inject}`
  );

  return html;
}

const indexHtml = resolve(DIST, "index.html");
if (!existsSync(indexHtml)) {
  console.error("dist/index.html not found — run vite build first");
  process.exit(1);
}

const baseHtml = readFileSync(indexHtml, "utf-8");

// Patch the root index.html in place
writeFileSync(indexHtml, withPageMeta(withHeroPreload(baseHtml, "/"), "/"));

for (const route of ROUTES) {
  let html = withHeroPreload(baseHtml, route);
  html = withPageMeta(html, route);

  const flatTarget = resolve(DIST, "." + route + ".html");
  mkdirSync(dirname(flatTarget), { recursive: true });
  writeFileSync(flatTarget, html);

  const dirTarget = resolve(DIST, "." + route, "index.html");
  mkdirSync(dirname(dirTarget), { recursive: true });
  writeFileSync(dirTarget, html);
}
console.log(`✓ wrote index.html to ${ROUTES.length * 2} SPA route paths (with per-route meta + hero preload)`);
