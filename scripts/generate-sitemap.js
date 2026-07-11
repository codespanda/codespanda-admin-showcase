// Run as part of the build: node scripts/generate-sitemap.js
// Reads ROUTES below and writes public/sitemap.xml automatically.
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://codespanda.com";
const TODAY = new Date().toISOString().split("T")[0];

const ROUTES = [
  { path: "/",                               changefreq: "weekly",  priority: "1.0" },
  { path: "/templates/Alpine-Admin-React",   changefreq: "monthly", priority: "0.9" },
  { path: "/templates/Brisk-Admin",          changefreq: "monthly", priority: "0.9" },
  { path: "/templates/portfolio",            changefreq: "monthly", priority: "0.9" },
  { path: "/legal/privacy",                  changefreq: "yearly",  priority: "0.3" },
  { path: "/legal/terms",                    changefreq: "yearly",  priority: "0.3" },
  { path: "/legal/security",                 changefreq: "yearly",  priority: "0.3" },
];

const urls = ROUTES.map(
  ({ path, changefreq, priority }) => `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const out = resolve(__dirname, "../public/sitemap.xml");
writeFileSync(out, xml, "utf-8");
console.log(`✓ sitemap.xml written with ${ROUTES.length} URLs`);
