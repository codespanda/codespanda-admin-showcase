// Run as part of the build: node scripts/generate-sitemap.js
// Reads ROUTES below and writes public/sitemap.xml automatically.
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://codespanda.com";
const TODAY = new Date().toISOString().split("T")[0];

const SHOT_IDS = [
  "mobile-onboarding",
  "review-ratings",
  "eyewear-app",
  "lingora",
  "coupon-deals",
  "empty-states",
  "error-state-ui",
  "auth-ui",
  "kids-learning-2",
  "gaming-streaming",
  "vista-streaming",
  "digital-wellbeing",
  "fundora",
  "shopsphere",
  "invoice-hub",
  "vpn-app", "sos-app", "parkease", "stayease", "fittrack", "glowskin",
  "homefinder", "taxi", "music", "medicare", "carwash", "kids-learning",
  "nexora-crm", "nexora-admin", "interior", "ebooks", "school", "hairaura",
  "harmony", "foodiego", "beauty", "waygo", "lumiere", "nutrifit",
  "cornerstone-concept", "jewellery-pos", "cafe-pos", "posymart",
  "ecommerce-admin", "greenerp", "pos-system", "lumia", "hireai", "sprout",
  "dashboard-app", "kanban", "portfolio-web", "design-system", "dating-app",
  "calories-app", "ecommerce-app", "car-app", "cricket-app", "crypto-app",
  "employee-mgmt", "fresh-grocery", "carwash-pro", "logistics-driver-management",
  "messaging-calling-app", "furniture-app", "ancient-wisdom", "healthcare-appointment",
  "food-delivery-concept",
];

const BLOG_SLUGS = [
  "vibe-coding-future-of-software-development",
  "signs-your-business-needs-custom-web-application",
  "why-we-built-codespanda",
  "shadcn-vs-mui-vs-antd",
  "admin-dashboard-design-mistakes",
  "figma-to-production-workflow",
  "why-vite-for-admin-panels",
  "theme-shadcn-dashboard-in-10-minutes",
];

const ROUTES = [
  // Core pages
  { path: "/",                                  changefreq: "weekly",  priority: "1.0" },
  { path: "/templates",                         changefreq: "weekly",  priority: "0.9" },
  { path: "/portfolio",                         changefreq: "weekly",  priority: "0.8" },
  { path: "/blog",                              changefreq: "weekly",  priority: "0.8" },

  // Template detail pages
  { path: "/templates/finovo",                  changefreq: "monthly", priority: "0.9" },
  { path: "/templates/hamara-bharat",           changefreq: "monthly", priority: "0.9" },
  { path: "/templates/eva-autocare",            changefreq: "monthly", priority: "0.9" },
  { path: "/templates/deepcity-care",           changefreq: "monthly", priority: "0.9" },
  { path: "/templates/cornerstone",             changefreq: "monthly", priority: "0.9" },
  { path: "/templates/flowers",                 changefreq: "monthly", priority: "0.9" },
  { path: "/templates/brisk-admin",             changefreq: "monthly", priority: "0.9" },
  { path: "/templates/alpine-admin-react",      changefreq: "monthly", priority: "0.9" },
  { path: "/templates/portfolio-template",      changefreq: "monthly", priority: "0.9" },

  // Portfolio shot pages
  ...SHOT_IDS.map((id) => ({ path: `/portfolio/${id}`, changefreq: "monthly", priority: "0.7" })),

  // Blog posts
  ...BLOG_SLUGS.map((slug) => ({ path: `/blog/${slug}`, changefreq: "monthly", priority: "0.6" })),

  // Legal
  { path: "/legal/privacy",                     changefreq: "yearly",  priority: "0.3" },
  { path: "/legal/terms",                       changefreq: "yearly",  priority: "0.3" },
  { path: "/legal/security",                    changefreq: "yearly",  priority: "0.3" },
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
