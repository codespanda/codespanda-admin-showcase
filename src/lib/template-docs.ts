/**
 * Documentation for each template, shown at /templates/<slug>/docs.
 * Facts come from each template's repo (package.json, folder layout, deploy setup).
 * The slug list is mirrored in src/lib/template-docs-routes.json for the build scripts.
 */

export interface DocsLink {
  path: string;
  desc: string;
}

export interface TemplateDocs {
  /** URL segment: /templates/<slug>/docs. */
  slug: string;
  /** Template id in data.ts. */
  id: string;
  repo: string;
  branch: "main" | "master";
  framework: "Vite" | "Next.js";
  language: "TypeScript" | "JavaScript";
  devPort: number;
  outDir: "dist" | "out";
  scripts: { cmd: string; desc: string }[];
  /** Folder tree, one entry per line. */
  structure: string;
  /** Where the text, data and pages live. */
  content: DocsLink[];
  theme: DocsLink;
  /** How pages and routes are organised. */
  routing: string;
  deploy: {
    /** How the repo deploys to GitHub Pages today. */
    steps: string[];
    /** How deep links keep working on a static host. */
    fallback?: string;
  };
  /** Screens shown at the top of the docs page; the first is shown large. */
  screens: { src: string; label: string }[];
  /** The template's own in-app docs with component reference, when it has one. */
  inAppDocs?: string;
  notes?: string[];
}

const VITE_SCRIPTS = {
  dev: { cmd: "npm run dev", desc: "Start the Vite dev server with hot reload" },
  build: { cmd: "npm run build", desc: "Type-check and build the production site into dist/" },
  buildJs: { cmd: "npm run build", desc: "Build the production site into dist/" },
  preview: { cmd: "npm run preview", desc: "Serve the built dist/ folder locally to check it" },
  oxlint: { cmd: "npm run lint", desc: "Lint the code with Oxlint" },
  eslint: { cmd: "npm run lint", desc: "Lint the code with ESLint" },
  ghPages: { cmd: "npm run deploy", desc: "Build and publish dist/ to the gh-pages branch" },
};

const ACTIONS_PAGES = [
  "In the repository, open Settings → Pages and set Source to GitHub Actions.",
  "Push to the default branch. The workflow in .github/workflows/ builds the site and publishes it.",
  "To use your own domain, add it under Settings → Pages → Custom domain.",
];

const GH_PAGES_SCRIPT = [
  "Run npm run deploy. It builds the site and pushes dist/ to a gh-pages branch with the gh-pages package.",
  "In the repository, open Settings → Pages and set Source to Deploy from a branch → gh-pages.",
  "To use your own domain, add it under Settings → Pages → Custom domain.",
];

const PUBLIC_404 =
  "public/404.html sends unknown URLs back to the app, so deep links such as /dashboard keep working on GitHub Pages. On Netlify or Vercel, add a rewrite of all routes to /index.html instead.";

export const TEMPLATE_DOCS: TemplateDocs[] = [
  {
    slug: "schulflow",
    id: "schulflow",
    repo: "https://github.com/codespanda/schulflow",
    branch: "main",
    framework: "Vite",
    language: "JavaScript",
    devPort: 5173,
    outDir: "dist",
    scripts: [VITE_SCRIPTS.dev, VITE_SCRIPTS.buildJs, VITE_SCRIPTS.preview],
    structure: `src/
  pages/               Home, Features, Pricing, About, Contact, Login, Signup, NotFound
    dashboard/         Overview, Students, Teachers, Classes, Attendance,
                       Timetable, Fees, Exams, Reports, Settings, ComingSoon
  components/
    sections/          Header, Hero, Features, Operations, WhyChoose,
                       Testimonials, CallToAction, Footer
    dashboard/         DashboardLayout (sidebar and top bar), BarChart, shared UI
    ui/                shadcn/ui primitives: button, card, sheet, switch, accordion…
  context/AuthContext.jsx   Signed-in user and route guards
  lib/
    auth.js            Mock auth service (localStorage) with the demo account
    timetable.js       The clash-free timetable generator
  data/school.js       Students, teachers, classes, invoices, exams, results, charts
  App.jsx              Website, auth and dashboard routes
  index.css            Theme colors as CSS variables
tailwind.config.js     Tailwind theme
scripts/spa-routes.mjs Writes a real page for every route on GitHub Pages`,
    content: [
      { path: "src/data/school.js", desc: "Sample school data: 10 students, 6 teachers, 10 classes, 10 invoices, 4 exams with schedules and results, plus attendance, fee and activity data for the charts. Swap it for API calls when you add a backend." },
      { path: "src/lib/auth.js", desc: "A mock auth service that keeps accounts in localStorage so the sign-up → dashboard flow works without a server. Demo login: demo@schulflow.com / demo1234. Replace each function with a call to your API before going live." },
      { path: "src/pages/Pricing.jsx", desc: "The Starter, Standard and Premium plans, prices and FAQs." },
      { path: "public/images/", desc: "Logo, hero visual, classroom photo and avatars." },
      { path: "index.html", desc: "The page title, description and favicon." },
    ],
    theme: { path: "src/index.css + tailwind.config.js", desc: "Colors are CSS variables in index.css (the yellow brand is --primary: 45 95% 55%), mapped to Tailwind in tailwind.config.js together with the navy text color and fonts. The shadcn/ui components pick them up." },
    routing: "React Router 6: src/App.jsx has three groups of routes — the public website inside a shared layout, Login and Signup (GuestOnly redirects signed-in users), and /dashboard/* behind RequireAuth. Dashboard links you haven't built yet show a Coming Soon page.",
    screens: [
      { src: "/images/schulflow/hero.webp", label: "Website" },
      { src: "/images/schulflow/dashboard.webp", label: "Dashboard" },
      { src: "/images/schulflow/students.webp", label: "Students" },
      { src: "/images/schulflow/timetable.webp", label: "Timetable generator" },
      { src: "/images/schulflow/fees.webp", label: "Fees" },
      { src: "/images/schulflow/pricing.webp", label: "Pricing" },
    ],
    deploy: {
      steps: [
        ...ACTIONS_PAGES.slice(0, 2),
        "The workflow sets VITE_BASE from your Pages settings: '/' for a custom domain, '/<repo>/' for a github.io address. To use your own domain, add it under Settings → Pages → Custom domain.",
      ],
      fallback: "After building, scripts/spa-routes.mjs writes a real index.html for every route plus a 404.html, so refreshing /dashboard/students returns the page instead of a 404. Keep its route list in sync with App.jsx. public/_redirects and vercel.json cover Netlify and Vercel.",
    },
    notes: [
      "The contact form shows a confirmation but doesn't send anything. Connect it to a form service or CRM in src/pages/Contact.jsx.",
      "Every page shares the title set in index.html. For better SEO on the website pages, give each its own title and description.",
    ],
  },
  {
    slug: "lassiwala",
    id: "lassiwala",
    repo: "https://github.com/codespanda/lassiwala",
    branch: "main",
    framework: "Vite",
    language: "TypeScript",
    devPort: 5173,
    outDir: "dist",
    scripts: [
      VITE_SCRIPTS.dev,
      VITE_SCRIPTS.build,
      { cmd: "npm run build:pages", desc: "Build for GitHub Pages and copy index.html to 404.html for deep links" },
      VITE_SCRIPTS.preview,
    ],
    structure: `src/
  pages/               Home, OurLassi (shop), Flavors, About, OurStory, FindUs,
                       Contact, Policy (shipping, returns, terms, privacy), NotFound
  components/
    sections/          Header, Hero, Highlights, LassiRange, Feeling, Testimonials,
                       OrderBanner, Footer
    layout/            Layout, PageHero, CartSheet
    ui/                shadcn/ui primitives: button, card, badge, input, textarea,
                       accordion, sheet
    ornaments.tsx      Logo, heart divider, leaf sprigs and section titles
  context/cart.tsx     Cart state, saved to localStorage
  data/flavors.ts      Flavours, prices, sizes, ingredients and nutrition
  assets/              Product photos, hero and illustrations
  App.tsx              Routes
  index.css            Theme colors, fonts and Tailwind v4 setup`,
    content: [
      { path: "src/data/flavors.ts", desc: "The five flavours with names, descriptions, photos, colours, taste profile, ingredients, nutrition and prices for each size. The home cards, shop, flavour pages and cart all read from it." },
      { path: "src/pages/FindUs.tsx", desc: "The outlets list: name, address, area and opening hours. The address drives the map and the Directions button." },
      { path: "src/pages/Contact.tsx", desc: "Contact cards, opening hours, head office and FAQs. Replace the sample phone, email and address before launch." },
      { path: "src/pages/About.tsx  src/pages/OurStory.tsx", desc: "Brand copy, stats, values, the process steps and the story timeline — sample text to replace with your own." },
      { path: "src/assets/", desc: "Product photos (one per flavour), the hero kulhad and the village illustration. Keep the same file names to swap them in." },
      { path: "index.html", desc: "The default title, description, fonts and favicon. Each route sets its own title in Layout.tsx." },
    ],
    theme: { path: "src/index.css", desc: "Colors are CSS variables in :root (navy --brand-navy: #13235b, green --brand-green: #4c9a3b, heart pink and cream), mapped into Tailwind v4 with @theme inline. Fonts are Anton and Oswald for headings, Kaushan Script for the script lines and Poppins for text, from Google Fonts." },
    routing: "React Router 6: routes are declared in src/App.tsx inside a shared layout (header, footer and cart). /policies/:slug renders the four policy pages from one component, and links like /flavors#rose-lassi scroll to that flavour.",
    screens: [
      { src: "/images/lassiwala/hero.webp", label: "Home" },
      { src: "/images/lassiwala/range.webp", label: "Lassi range" },
      { src: "/images/lassiwala/shop.webp", label: "Shop & cart" },
      { src: "/images/lassiwala/flavors.webp", label: "Flavour page" },
      { src: "/images/lassiwala/story.webp", label: "Our story" },
      { src: "/images/lassiwala/find-us.webp", label: "Find us" },
      { src: "/images/lassiwala/contact.webp", label: "Contact" },
    ],
    deploy: {
      steps: [
        ...ACTIONS_PAGES.slice(0, 2),
        "The site is served from a custom domain, so vite.config.ts uses base '/'. To host it at github.io/<repo>/ instead, build with BASE_PATH=/<repo>/.",
      ],
      fallback: "npm run build:pages copies index.html to 404.html, so deep links like /flavors or /policies/privacy keep working on GitHub Pages.",
    },
    notes: [
      "Place Order, the contact form and the pincode check show confirmations but don't send anything. Connect them to your ordering backend, payment gateway or form service.",
      "Prices, outlets, stats and the story timeline are sample content — replace them before launch.",
    ],
  },
  {
    slug: "fincore",
    id: "fincore",
    repo: "https://github.com/codespanda/fincore-accounting",
    branch: "main",
    framework: "Vite",
    language: "TypeScript",
    devPort: 5173,
    outDir: "dist",
    scripts: [VITE_SCRIPTS.dev, VITE_SCRIPTS.build, VITE_SCRIPTS.preview, VITE_SCRIPTS.oxlint],
    structure: `src/
  pages/               home, about, services, service-detail, industries,
                       resources, contact, legal (privacy & terms), not-found
  components/
    sections/          header, hero, benefits-bar, services, stats, why-choose-us,
                       testimonials, cta-banner, footer
    ui/                shadcn/ui primitives (Base UI): button, card, tabs, accordion…
    layout.tsx  logo.tsx  page-hero.tsx  section-heading.tsx  social-icons.tsx
  data/site.ts         Contact details, navigation, services, industries, team,
                       articles, guides and FAQs
  App.tsx              Routes
  index.css            Theme colors, fonts and Tailwind v4 setup`,
    content: [
      { path: "src/data/site.ts", desc: "All content in one typed file: contact details, hours and map address, navigation, the 6 services and their page content, 8 industries, the team of 4, 6 articles, 4 guides and 6 FAQs. Service pages are generated from it." },
      { path: "src/data/site.ts → contact", desc: "Replace the sample phone, email and address before launch. The address also drives the embedded Google Map on the contact page." },
      { path: "src/data/site.ts → team", desc: "Team photos load from Unsplash URLs. Add your own photos to public/ and point the entries at them." },
      { path: "index.html", desc: "The page title, description and favicon." },
    ],
    theme: { path: "src/index.css", desc: "Colors are CSS variables in :root (the navy brand is --primary: #0b3a86), mapped into Tailwind v4 with @theme inline. Fonts are Plus Jakarta Sans and Geist, installed with Fontsource." },
    routing: "React Router 8: routes are declared in src/App.tsx inside a shared layout (header and footer). /services/:slug renders from the services in src/data/site.ts, so adding a service adds its page.",
    screens: [
      { src: "/images/fincore/hero.webp", label: "Home" },
      { src: "/images/fincore/services.webp", label: "Services" },
      { src: "/images/fincore/service-detail.webp", label: "Service page" },
      { src: "/images/fincore/industries.webp", label: "Industries" },
      { src: "/images/fincore/resources.webp", label: "Resources" },
      { src: "/images/fincore/contact.webp", label: "Contact" },
    ],
    deploy: {
      steps: [
        ...ACTIONS_PAGES.slice(0, 2),
        "The site is served from a custom domain, so vite.config.ts uses base '/'. To host it at github.io/<repo>/ instead, set base to '/<repo>/'.",
      ],
      fallback: "The deploy workflow copies index.html to 404.html, so deep links like /services/bookkeeping keep working on GitHub Pages.",
    },
    notes: [
      "The contact form shows a confirmation but doesn't send anything. Connect it to a form service, email API or CRM in src/pages/contact.tsx.",
      "Every page shares the title set in index.html. For better SEO, give each page its own title and description.",
    ],
  },
  {
    slug: "carewell-clinic",
    id: "carewell-clinic",
    repo: "https://github.com/codespanda/carewell-clinic",
    branch: "main",
    framework: "Vite",
    language: "JavaScript",
    devPort: 5173,
    outDir: "dist",
    scripts: [VITE_SCRIPTS.dev, VITE_SCRIPTS.buildJs, VITE_SCRIPTS.preview],
    structure: `src/
  pages/               Home, About, Services, ServiceDetail, DoctorsPage, Packages,
                       Reports, Faq, Gallery, Careers, Blog, BlogPost, Contact,
                       Appointment, Legal (privacy & terms), NotFound
  components/
    layout/            Layout, Navbar and Footer around every page
    sections/          Hero, InfoBar, ServicesGrid, WhyChoose, Doctors,
                       Testimonials, CtaBanner
    ui/                shadcn/ui primitives: button, card, accordion, input…
    shared.jsx         Small shared pieces
  data/
    site.js            Contact details, hours, navigation, services, doctors,
                       testimonials, blog posts and stats
    extra.js           Health packages, sample lab reports, gallery, jobs, FAQs
  App.jsx              Routes
  index.css            Theme colors and Tailwind v4 setup
public/CNAME           Custom domain for GitHub Pages`,
    content: [
      { path: "src/data/site.js", desc: "Contact details and opening hours, navigation, the 8 services, 8 doctors, 9 testimonials, 6 blog posts, stats and \"why choose us\" points. Service and blog pages are generated from it." },
      { path: "src/data/extra.js", desc: "The 6 health check-up packages and their prices, the sample lab reports, 8 gallery photos, 5 job openings and perks, and the 13 FAQs in 4 groups." },
      { path: "src/data/site.js → images", desc: "Photos are loaded from Unsplash URLs. Put your own photos in public/ and point these entries at them before launch." },
      { path: "src/pages/Appointment.jsx", desc: "The booking form's fields, services and time slots." },
      { path: "src/pages/Reports.jsx", desc: "The report lookup. It searches the sample reports in extra.js; point findReports at your lab system's API before launch." },
      { path: "index.html", desc: "The page title, description and favicon." },
    ],
    theme: { path: "src/index.css", desc: "Colors are CSS variables in :root (the teal brand is --primary: #14968f), mapped into Tailwind v4 with @theme inline. The shadcn/ui components in src/components/ui pick them up automatically." },
    routing: "React Router 6: routes are declared in src/App.jsx inside a shared Layout (navbar and footer). /services/:slug and /blog/:slug render from the entries in src/data/site.js, so adding a service or post adds its page.",
    screens: [
      { src: "/images/carewell/hero.webp", label: "Home" },
      { src: "/images/carewell/services.webp", label: "Services" },
      { src: "/images/carewell/doctors.webp", label: "Doctors" },
      { src: "/images/carewell/packages.webp", label: "Health packages" },
      { src: "/images/carewell/reports.webp", label: "Lab reports" },
      { src: "/images/carewell/appointment.webp", label: "Appointment booking" },
    ],
    deploy: {
      steps: [
        ...ACTIONS_PAGES.slice(0, 2),
        "public/CNAME holds the custom domain (carewellclinic.codespanda.com). Replace it with your own domain, or delete it to use the default github.io address.",
      ],
      fallback: "The deploy workflow copies index.html to 404.html, so deep links like /doctors keep working on GitHub Pages.",
    },
    notes: [
      "The appointment and contact forms validate and show a confirmation but don't send anything. Connect them to a form service, email API or booking system in src/pages/Appointment.jsx and src/pages/Contact.jsx.",
      "The lab report lookup uses sample data (try report ID CW-24101). Replace findReports in src/pages/Reports.jsx with a call to your lab system before going live.",
      "Every page shares the title set in index.html. For better SEO, give each page its own title and description, for example with react-helmet-async.",
    ],
  },
  {
    slug: "kundeep-kitchen",
    id: "kundeep-kitchen",
    repo: "https://github.com/codespanda/kundeep-kitchen",
    branch: "main",
    framework: "Next.js",
    language: "TypeScript",
    devPort: 3000,
    outDir: "out",
    scripts: [
      { cmd: "npm run dev", desc: "Start the Next.js dev server" },
      { cmd: "npm run build", desc: "Export the static site into out/ (a post-build step fixes prefetch files for static hosts)" },
      { cmd: "npm run lint", desc: "Lint the code with ESLint" },
    ],
    structure: `src/
  app/                 layout.tsx, page.tsx (home), menu/page.tsx, globals.css
  components/          Header, Hero, Specialties, About, Gallery, Reviews, CtaBanner, Footer
    menu/              MenuBrowser (tabs, search, filters)
    reservation/       Booking dialog, provider and Reserve button
  data/
    site.ts            Contact details, nav, dishes, gallery, reviews
    menu.ts            Menu categories, dishes, prices and tags
  lib/image-loader.ts  Adds the base path to images in the static export
public/images/         Dish, gallery and guest photos
scripts/               Post-build fix for static hosting`,
    content: [
      { path: "src/data/site.ts", desc: "Phone, email, address and hours (the phone also receives WhatsApp bookings), nav links, signature dishes, about points, gallery and reviews." },
      { path: "src/data/menu.ts", desc: "Menu categories and dishes with prices, an optional price note and tags (bestseller, chef, spicy, new). Search and filters update automatically. The included dishes and prices are sample content." },
      { path: "public/images/", desc: "Replace the photos, keeping the same file names, or update the paths in site.ts." },
      { path: "src/app/layout.tsx", desc: "Page title and description (metadata)." },
    ],
    theme: { path: "src/app/globals.css", desc: "Colors live in the Tailwind v4 @theme block (cream, sand, forest, clay, gold…). Fonts are DM Serif Display and Poppins, loaded with next/font in layout.tsx." },
    routing: "Next.js App Router: src/app/page.tsx is the home page and src/app/menu/page.tsx is /menu. Add a folder with a page.tsx to add a page.",
    screens: [
      { src: "/images/kundeep-kitchen/hero.webp", label: "Home" },
      { src: "/images/kundeep-kitchen/menu.webp", label: "Menu" },
      { src: "/images/kundeep-kitchen/about.webp", label: "About & gallery" },
    ],
    deploy: {
      steps: [
        "In the repository, open Settings → Pages and set Source to GitHub Actions.",
        "Push to main. The workflow builds the static export and sets PAGES_BASE_PATH for you (the repo name for a project site, empty for a custom domain).",
        "To use your own domain, add it under Settings → Pages → Custom domain.",
      ],
      fallback: "The site is a static export with trailing slashes, so /menu/ is a real file and needs no rewrite rules.",
    },
    notes: ["The footer newsletter form only shows a thank-you message. Connect it to a provider such as Mailchimp in src/components/NewsletterForm.tsx."],
  },
  {
    slug: "shopperscrown",
    id: "shopperscrown",
    repo: "https://github.com/codespanda/Shoppers-Crown",
    branch: "master",
    framework: "Vite",
    language: "TypeScript",
    devPort: 5173,
    outDir: "dist",
    scripts: [VITE_SCRIPTS.dev, VITE_SCRIPTS.build, VITE_SCRIPTS.preview, VITE_SCRIPTS.oxlint, { cmd: "npm run deploy", desc: "Publish dist/ to the gh-pages branch (run npm run build first)" }],
    structure: `src/
  pages/               18 routed pages: Landing, Shop, ProductDetail, Cart, Checkout,
                       ShippingCalculator, Tracking, Dashboard, Pricing, Login, Signup…
  components/
    layout/            Header, footer and page shells
    sections/          Homepage and page sections
    ui/                Buttons, inputs, cards and other primitives
  context/             AuthContext, CartContext and ThemeContext
  data/mockData.ts     Products, brands, countries and other sample data
  lib/                 Helpers
  types/               Shared TypeScript types
  App.tsx              Routes
  index.css            Tailwind v4 theme`,
    content: [
      { path: "src/data/mockData.ts", desc: "All sample products, brands, countries and pricing used across the pages. Swap it for your own data or an API call." },
      { path: "src/pages/", desc: "One file per page. Each page composes sections from src/components/sections/." },
      { path: "src/context/", desc: "Sign-in state, the cart and the light/dark theme." },
    ],
    theme: { path: "src/index.css", desc: "Brand colors and fonts are defined in the Tailwind v4 @theme block. Change a value there to restyle every page." },
    routing: "React Router: routes are declared in src/App.tsx, one route per file in src/pages/. Forms use React Hook Form with Zod validation; data fetching uses TanStack Query.",
    screens: [
      { src: "/images/shopperscrown/hero.webp", label: "Home" },
      { src: "/images/shopperscrown/shop.webp", label: "Shop" },
      { src: "/images/shopperscrown/calculator.webp", label: "Shipping calculator" },
      { src: "/images/shopperscrown/pricing.webp", label: "Pricing" },
    ],
    deploy: {
      steps: [
        "Run npm run build, then npm run deploy to push dist/ to the gh-pages branch.",
        "In the repository, open Settings → Pages and set Source to Deploy from a branch → gh-pages.",
        "netlify.toml and vercel.json are included too, so you can import the repo on Netlify or Vercel instead.",
      ],
      fallback: "On Netlify and Vercel, public/_redirects and vercel.json send every route to index.html, so deep links like /shop work. GitHub Pages ignores those files: to host there, copy index.html to 404.html in dist/ after building, or deep links will show a 404.",
    },
  },
  {
    slug: "interio",
    id: "interio",
    repo: "https://github.com/codespanda/interio",
    branch: "main",
    framework: "Vite",
    language: "TypeScript",
    devPort: 5173,
    outDir: "dist",
    scripts: [VITE_SCRIPTS.dev, VITE_SCRIPTS.build, VITE_SCRIPTS.preview, VITE_SCRIPTS.oxlint],
    structure: `src/
  components/
    site/              Header, Hero, Services, Portfolio, Process, About,
                       Testimonials, BlogCta, Footer
    ui/                shadcn/ui primitives
  lib/                 Helpers
  App.tsx              Assembles the sections in order
  index.css            Tailwind v4 theme and CSS variables
public/                Images and favicon`,
    content: [
      { path: "src/components/site/", desc: "Each section keeps its content in a constant at the top of its file (for example SERVICES in Services.tsx). Edit it there." },
      { path: "src/App.tsx", desc: "Reorder, add or remove sections." },
      { path: "public/", desc: "Replace the project photos and favicon." },
    ],
    theme: { path: "src/index.css", desc: "The cream-and-terracotta palette is set with CSS variables and the Tailwind v4 @theme block. Change them to rebrand the whole site." },
    routing: "A single-page site with anchor links between sections; there is no router to configure.",
    screens: [
      { src: "/images/interio/hero.webp", label: "Home" },
      { src: "/images/interio/portfolio.webp", label: "Portfolio" },
      { src: "/images/interio/process.webp", label: "Process & about" },
      { src: "/images/interio/testimonials.webp", label: "Testimonials & blog" },
    ],
    deploy: { steps: ACTIONS_PAGES },
  },
  {
    slug: "school",
    id: "school",
    repo: "https://github.com/codespanda/gouri-international-school",
    branch: "main",
    framework: "Vite",
    language: "JavaScript",
    devPort: 5173,
    outDir: "dist",
    scripts: [VITE_SCRIPTS.dev, VITE_SCRIPTS.buildJs, VITE_SCRIPTS.preview, VITE_SCRIPTS.oxlint, VITE_SCRIPTS.ghPages],
    structure: `src/
  components/
    Header.jsx  Hero.jsx  AboutSection.jsx  AcademicsSection.jsx
    CampusSection.jsx  WhyChooseSection.jsx  NewsSection.jsx
    CTASection.jsx  Footer.jsx
    ui/                Reusable primitives
  lib/                 Helpers
  App.jsx              Assembles the sections in order
  index.css            Tailwind v4 theme and CSS variables
public/                Images and favicon`,
    content: [
      { path: "src/components/", desc: "Each section keeps its content in a constant at the top of its file (for example PROGRAMS in AcademicsSection.jsx). Edit it there." },
      { path: "src/App.jsx", desc: "Reorder, add or remove sections." },
      { path: "public/", desc: "Replace the campus photos, logo and favicon." },
    ],
    theme: { path: "src/index.css", desc: "The navy-and-gold palette is set with CSS variables and the Tailwind v4 @theme block." },
    routing: "A single-page site with anchor links between sections. Written in JavaScript (JSX), so there are no types to update.",
    screens: [
      { src: "/images/school/hero.webp", label: "Home" },
      { src: "/images/school/about.webp", label: "About & academics" },
      { src: "/images/school/campus.webp", label: "Campus & facilities" },
      { src: "/images/school/news.webp", label: "News & admissions" },
    ],
    deploy: { steps: GH_PAGES_SCRIPT },
  },
  {
    slug: "ca-firm",
    id: "ca-firm",
    repo: "https://github.com/codespanda/CA-Firm",
    branch: "master",
    framework: "Vite",
    language: "TypeScript",
    devPort: 5173,
    outDir: "dist",
    scripts: [VITE_SCRIPTS.dev, VITE_SCRIPTS.build, VITE_SCRIPTS.preview, VITE_SCRIPTS.oxlint, VITE_SCRIPTS.ghPages],
    structure: `src/
  pages/               Home.tsx, Careers.tsx, Contact.tsx
  components/
    sections/          Home page sections: services, industries, engagement models…
    ui/                Reusable primitives
    Header.tsx  Footer.tsx  Logo.tsx  PageHero.tsx  IconBadge.tsx
  lib/                 Helpers
  App.tsx              Routes
  index.css            Tailwind v4 theme and CSS variables
public/404.html        Deep-link fallback for GitHub Pages`,
    content: [
      { path: "src/components/sections/", desc: "Services, industries, engagement models and testimonials, each with its content at the top of the file." },
      { path: "src/pages/", desc: "The Home, Careers and Contact pages." },
      { path: "src/components/Logo.tsx", desc: "Swap in your firm's name and logo." },
    ],
    theme: { path: "src/index.css", desc: "Colors and fonts are set with CSS variables and the Tailwind v4 @theme block." },
    routing: "React Router: the three routes are declared in src/App.tsx. Add a page in src/pages/ and a route for it.",
    screens: [
      { src: "/images/ca-firm/hero.webp", label: "Home" },
      { src: "/images/ca-firm/services.webp", label: "Services & industries" },
      { src: "/images/ca-firm/careers.webp", label: "Careers" },
      { src: "/images/ca-firm/contact.webp", label: "Contact" },
    ],
    deploy: { steps: GH_PAGES_SCRIPT, fallback: PUBLIC_404 },
  },
  {
    slug: "finovo",
    id: "finovo",
    repo: "https://github.com/codespanda/finovo",
    branch: "main",
    framework: "Vite",
    language: "TypeScript",
    devPort: 5173,
    outDir: "dist",
    scripts: [VITE_SCRIPTS.dev, VITE_SCRIPTS.build, VITE_SCRIPTS.preview, VITE_SCRIPTS.oxlint],
    structure: `src/
  pages/               100+ screens grouped by module: accounting/, banking/, contacts/,
                       expenses/, inventory/, payroll/, projects/, purchases/,
                       reports/, sales/, settings/, tax/
  components/
    layout/            Sidebar, top bar and page shell
    shared/            Tables, stat cards, charts and filters used across modules
    ui/                shadcn/ui primitives (Radix)
  lib/                 Helpers and formatters
  App.tsx              Routes for every module
  index.css            Tailwind v4 theme, light and dark tokens`,
    content: [
      { path: "src/pages/<module>/", desc: "Each screen keeps its sample rows next to the component. Replace them with API calls when you connect a backend." },
      { path: "src/components/layout/", desc: "Sidebar navigation, company switcher and top bar." },
      { path: "src/components/shared/", desc: "Reusable tables, charts (Recharts) and stat cards." },
    ],
    theme: { path: "src/index.css", desc: "Light and dark color tokens are CSS variables mapped into the Tailwind v4 @theme block. Change the brand color once and every module follows." },
    routing: "React Router: every module's routes are declared in src/App.tsx. Add a screen in src/pages/<module>/, then add its route and sidebar link.",
    screens: [
      { src: "/images/finovo/dashboard.webp", label: "Dashboard" },
      { src: "/images/finovo/sales.webp", label: "Sales" },
      { src: "/images/finovo/banking.webp", label: "Banking" },
      { src: "/images/finovo/inventory.webp", label: "Inventory" },
      { src: "/images/finovo/payroll.webp", label: "Payroll" },
      { src: "/images/finovo/reports.webp", label: "Reports" },
    ],
    deploy: { steps: ACTIONS_PAGES, fallback: PUBLIC_404 },
    inAppDocs: "https://finovo.codespanda.com/docs",
  },
  {
    slug: "hamara-bharat",
    id: "hamara-bharat",
    repo: "https://github.com/codespanda/hamara-bharat",
    branch: "main",
    framework: "Vite",
    language: "TypeScript",
    devPort: 5173,
    outDir: "dist",
    scripts: [VITE_SCRIPTS.dev, VITE_SCRIPTS.build, VITE_SCRIPTS.preview, VITE_SCRIPTS.oxlint],
    structure: `src/
  components/
    sections/          Hero, IndiaMap, Experiences, Festivals, FoodTrails, Unesco,
                       Hotels, Gallery, TripPlanner, ItineraryBuilder, VisaInfo…
    icons/             Custom icons
    ui/                Reusable primitives
    Navbar.tsx  Footer.tsx
  data/
    destinations.ts    Destinations, images and descriptions
    indiaStates.ts     State data for the interactive map
  lib/                 Helpers
  App.tsx              Assembles the sections
  index.css            Tailwind v4 theme and CSS variables`,
    content: [
      { path: "src/data/destinations.ts", desc: "The destinations, descriptions and images shown across the site." },
      { path: "src/data/indiaStates.ts", desc: "State names and details used by the map section." },
      { path: "src/components/sections/", desc: "Section headings, copy and calls to action." },
    ],
    theme: { path: "src/index.css", desc: "Colors are set with CSS variables and the Tailwind v4 @theme block. Animations use Framer Motion." },
    routing: "A single-page site with anchor links between sections; there is no router to configure.",
    screens: [
      { src: "/images/hamarabharat/hero.webp", label: "Hero" },
      { src: "/images/hamarabharat/india-map.webp", label: "Interactive India map" },
      { src: "/images/hamarabharat/trip-planner.webp", label: "Trip planner" },
      { src: "/images/hamarabharat/experiences.webp", label: "Experiences" },
      { src: "/images/hamarabharat/unesco.webp", label: "UNESCO heritage sites" },
      { src: "/images/hamarabharat/itinerary-builder.webp", label: "Itinerary builder" },
    ],
    deploy: { steps: ACTIONS_PAGES },
  },
  {
    slug: "eva-autocare",
    id: "eva-autocare",
    repo: "https://github.com/codespanda/eva-autocare",
    branch: "main",
    framework: "Vite",
    language: "TypeScript",
    devPort: 5173,
    outDir: "dist",
    scripts: [VITE_SCRIPTS.dev, VITE_SCRIPTS.build, VITE_SCRIPTS.preview, VITE_SCRIPTS.eslint],
    structure: `src/
  pages/               Dashboard, Appointments, WorkOrders, ServiceRequests, Customers,
                       Vehicles, Technicians, Inventory, Invoices, Reports, Reviews,
                       Settings, SignIn, SignUp, Docs
  components/
    layout/            Sidebar and top bar
    forms/  auth/  settings/
    ui/                shadcn/ui primitives
    *DetailPanel.tsx   Slide-over detail panels for each record type
  lib/                 Helpers
  App.tsx              Routes
  index.css            CSS variables for light and dark mode
tailwind.config.ts     Tailwind v3 theme`,
    content: [
      { path: "src/pages/", desc: "Each screen keeps its sample records next to the component; replace them with API calls." },
      { path: "src/components/*DetailPanel.tsx", desc: "The detail panels for customers, vehicles, work orders, invoices and technicians." },
    ],
    theme: { path: "src/index.css + tailwind.config.ts", desc: "Colors are CSS variables in index.css (light and dark), mapped to Tailwind v3 in tailwind.config.ts." },
    routing: "React Router: routes are declared in src/App.tsx. Add a page in src/pages/, then its route and sidebar link.",
    screens: [
      { src: "/images/eva-autocare/dashboard.webp", label: "Dashboard" },
      { src: "/images/eva-autocare/appointments.webp", label: "Appointments" },
      { src: "/images/eva-autocare/work-orders.webp", label: "Work orders" },
      { src: "/images/eva-autocare/customers.webp", label: "Customers" },
      { src: "/images/eva-autocare/invoices.webp", label: "Invoices & billing" },
      { src: "/images/eva-autocare/inventory.webp", label: "Inventory" },
    ],
    deploy: {
      steps: [
        "In the repository, open Settings → Pages and set Source to Deploy from a branch → gh-pages.",
        "Push to main. The workflow in .github/workflows/ builds the site and publishes it to the gh-pages branch.",
        "To use your own domain, add it under Settings → Pages → Custom domain.",
      ],
      fallback: PUBLIC_404,
    },
    inAppDocs: "https://eva-autocare.codespanda.com/docs",
  },
  {
    slug: "deepcity-care",
    id: "deepcity-care-hospital",
    repo: "https://github.com/codespanda/deepcity-care-hospital",
    branch: "master",
    framework: "Vite",
    language: "TypeScript",
    devPort: 5173,
    outDir: "dist",
    scripts: [VITE_SCRIPTS.dev, VITE_SCRIPTS.build, VITE_SCRIPTS.preview, VITE_SCRIPTS.oxlint, VITE_SCRIPTS.ghPages],
    structure: `src/
  pages/               30+ screens: dashboard, patients, doctors, appointments,
                       beds & rooms, pharmacy, lab reports, billing, insurance,
                       inventory, messages and 12 settings tabs
  components/          Layout, tables, charts and shadcn/ui primitives
  data/                appointments.ts, beds.ts, departments.ts, doctors.ts, insurance.ts,
                       inventory.ts, invoices.ts, labReports.ts, medicines.ts, patients.ts
  lib/                 Helpers
  App.tsx              Routes
  index.css            Tailwind v4 theme and CSS variables
public/404.html        Deep-link fallback for GitHub Pages`,
    content: [
      { path: "src/data/", desc: "One file per record type (patients, doctors, beds, invoices…). Swap these for API calls when you add a backend." },
      { path: "src/pages/", desc: "Each screen reads from the matching data file." },
    ],
    theme: { path: "src/index.css", desc: "Colors are CSS variables mapped into the Tailwind v4 @theme block, with light and dark modes." },
    routing: "React Router: routes are declared in src/App.tsx. Add a page in src/pages/, then its route and sidebar link.",
    screens: [
      { src: "/images/deepcity-care/dashboard.webp", label: "Dashboard" },
      { src: "/images/deepcity-care/appointments.webp", label: "Appointments" },
      { src: "/images/deepcity-care/patients.webp", label: "Patients" },
      { src: "/images/deepcity-care/billing.webp", label: "Billing & invoices" },
      { src: "/images/deepcity-care/beds-rooms.webp", label: "Beds & rooms" },
      { src: "/images/deepcity-care/settings.webp", label: "Settings" },
    ],
    deploy: { steps: GH_PAGES_SCRIPT, fallback: PUBLIC_404 },
    inAppDocs: "https://deepcity-care.codespanda.com/docs",
  },
  {
    slug: "flowers",
    id: "flowers-pos",
    repo: "https://github.com/codespanda/flowers-pos",
    branch: "main",
    framework: "Vite",
    language: "TypeScript",
    devPort: 5173,
    outDir: "dist",
    scripts: [VITE_SCRIPTS.dev, VITE_SCRIPTS.build, VITE_SCRIPTS.preview, VITE_SCRIPTS.oxlint],
    structure: `src/
  pages/               POS counter, orders, customers, coupons, reports,
                       notifications, settings, sign-in and sign-up
  components/          POS, layout and shadcn/ui components
  config/
    app.ts             Store name, currency, locale and tax rate
    categories.ts      Product categories
    nav.ts  routes.ts  Navigation and routes
    strings.ts         UI text in one place
  data/                products.ts, customers.ts, orders.ts, coupons.ts, notifications.ts
  context/  hooks/     Cart and app state
  index.css            Tailwind v4 theme and CSS variables
public/404.html        Deep-link fallback for GitHub Pages`,
    content: [
      { path: "src/config/app.ts", desc: "Store name and tagline, currency, locale and tax rate." },
      { path: "src/config/strings.ts", desc: "Every piece of UI text in one place, ready to rename or translate." },
      { path: "src/data/", desc: "Sample products, customers, orders and coupons." },
      { path: "src/config/categories.ts", desc: "The product categories shown at the counter." },
    ],
    theme: { path: "src/index.css", desc: "Colors are CSS variables mapped into the Tailwind v4 @theme block." },
    routing: "React Router: routes and sidebar items are defined in src/config/routes.ts and src/config/nav.ts.",
    screens: [
      { src: "/images/flowers/pos-counter.webp", label: "POS counter" },
      { src: "/images/flowers/orders-live.webp", label: "Orders" },
      { src: "/images/flowers/customers-live.webp", label: "Customers" },
      { src: "/images/flowers/coupons-live.webp", label: "Coupons" },
      { src: "/images/flowers/reports-live.webp", label: "Reports" },
      { src: "/images/flowers/settings-live.webp", label: "Settings" },
    ],
    deploy: { steps: ACTIONS_PAGES, fallback: PUBLIC_404 },
    inAppDocs: "https://flowers.codespanda.com/docs",
  },
  {
    slug: "alpine-admin-react",
    id: "alpine-admin-react",
    repo: "https://github.com/codespanda/Alpine-Admin-React",
    branch: "main",
    framework: "Vite",
    language: "TypeScript",
    devPort: 5173,
    outDir: "dist",
    scripts: [VITE_SCRIPTS.dev, VITE_SCRIPTS.build, VITE_SCRIPTS.preview, VITE_SCRIPTS.eslint],
    structure: `src/
  app/
    (admin)/           One folder per screen with a page.tsx: dashboard, employees,
                       departments, attendance, leaves, payroll, performance,
                       timesheet, shifts, training, reports, settings and more
    (auth)/            Login, register, password reset and email verification
    globals.css        Tailwind v4 theme and CSS variables
  features/            Shared module logic: dashboard, employees, departments,
                       attendance, leaves
  components/          Layout and shadcn/ui primitives
  constants/
    navigation.ts      Sidebar items
    mock-data.ts       Sample records
  stores/              Zustand stores
  services/            Data access layer, ready to point at an API
  providers/  hooks/  lib/  types/
  docs/                The in-app documentation pages`,
    content: [
      { path: "src/constants/mock-data.ts", desc: "Sample employees and records used by the features." },
      { path: "src/constants/navigation.ts", desc: "Sidebar sections and links." },
      { path: "src/services/", desc: "Replace the mock calls with your API." },
      { path: "src/app/(admin)/", desc: "One folder per screen (30 in total), with forms built on React Hook Form + Zod." },
    ],
    theme: { path: "src/app/globals.css", desc: "Colors are CSS variables mapped into the Tailwind v4 @theme block, with light and dark modes." },
    routing: "React Router: routes are declared in src/lib/router.tsx and point at the page.tsx files in src/app/(admin)/ and src/app/(auth)/. The sidebar reads src/constants/navigation.ts.",
    screens: [
      { src: "/images/alpine/dashboard.webp", label: "Dashboard" },
      { src: "/images/alpine/employees.webp", label: "Employee directory" },
      { src: "/images/alpine/attendance.webp", label: "Attendance" },
      { src: "/images/alpine/leave.webp", label: "Leave management" },
      { src: "/images/alpine/payroll.webp", label: "Payroll" },
      { src: "/images/alpine/performance.webp", label: "Performance reviews" },
    ],
    deploy: {
      steps: ACTIONS_PAGES,
      fallback: "The deploy workflow copies index.html to 404.html, so deep links keep working on GitHub Pages.",
    },
    inAppDocs: "https://alpine.codespanda.com/docs",
  },
  {
    slug: "brisk-admin",
    id: "brisk-admin",
    repo: "https://github.com/codespanda/brisk-admin",
    branch: "master",
    framework: "Vite",
    language: "TypeScript",
    devPort: 5173,
    outDir: "dist",
    scripts: [VITE_SCRIPTS.dev, { cmd: "npm run build", desc: "Build into dist/ and copy index.html to 404.html for GitHub Pages" }, VITE_SCRIPTS.preview, VITE_SCRIPTS.eslint],
    structure: `src/
  pages/               Dashboard, orders, products, inventory, warehouses, customers,
                       marketing, campaigns, discounts, analytics, users, settings…
  features/            Module logic: analytics, auth, customers, dashboard, discounts,
                       inventory, marketing, orders, products, settings
  layouts/             App shell, sidebar and top bar
  components/          shadcn/ui primitives and shared pieces
  constants/
    navigation.ts      Sidebar items
    status-maps.ts     Status labels and colors
  stores/              Zustand stores
  services/            Data access layer, ready to point at an API
  docs/                The in-app documentation pages
  globals.css          Tailwind v4 theme and CSS variables`,
    content: [
      { path: "src/constants/navigation.ts", desc: "Sidebar sections and links." },
      { path: "src/constants/status-maps.ts", desc: "Order and payment status labels and badge colors." },
      { path: "src/services/", desc: "Replace the mock data with your API." },
    ],
    theme: { path: "src/globals.css", desc: "Colors are CSS variables mapped into the Tailwind v4 @theme block, with light and dark modes." },
    routing: "React Router: pages live in src/pages/ and the sidebar reads src/constants/navigation.ts.",
    screens: [
      { src: "/images/brisk/dashboard.webp", label: "Dashboard" },
      { src: "/images/brisk/products.webp", label: "Products" },
      { src: "/images/brisk/orders.webp", label: "Orders" },
      { src: "/images/brisk/customers.webp", label: "Customers" },
      { src: "/images/brisk/analytics.webp", label: "Analytics" },
      { src: "/images/brisk/settings.webp", label: "Settings" },
    ],
    deploy: {
      steps: ACTIONS_PAGES,
      fallback: "npm run build copies index.html to 404.html, so deep links keep working on GitHub Pages.",
    },
    inAppDocs: "https://brisk.codespanda.com/docs",
    notes: ["To ship without the bundled documentation, delete src/docs/ and its route. The repo README explains the steps."],
  },
  {
    slug: "cornerstone",
    id: "cornerstone",
    repo: "https://github.com/codespanda/cornerstone",
    branch: "main",
    framework: "Vite",
    language: "TypeScript",
    devPort: 5173,
    outDir: "dist",
    scripts: [VITE_SCRIPTS.dev, { cmd: "npm run build", desc: "Type-check, build into dist/ and copy index.html to 404.html" }, VITE_SCRIPTS.preview, VITE_SCRIPTS.oxlint],
    structure: `src/
  pages/               dashboard, properties, property-detail, units, tenants, leases,
                       payments, invoices, maintenance, documents, messages,
                       announcements, analytics, reports, settings, sign-in, sign-up
  components/          One folder per module plus layout/, shared/ and ui/
  data/mock-data.ts    Properties, units, tenants, leases and payments
  types/               Shared TypeScript types
  lib/                 Helpers
  App.tsx              Routes
  index.css            Tailwind v4 theme and CSS variables`,
    content: [
      { path: "src/data/mock-data.ts", desc: "All sample properties, units, tenants, leases and payments in one file." },
      { path: "src/components/<module>/", desc: "Each module's tables, forms and detail views." },
    ],
    theme: { path: "src/index.css", desc: "Colors are CSS variables mapped into the Tailwind v4 @theme block, with light and dark modes." },
    routing: "React Router: routes are declared in src/App.tsx, one page per file in src/pages/.",
    screens: [
      { src: "/images/cornerstone-dashboard-2.webp", label: "Dashboard" },
      { src: "/images/cornerstone-properties.webp", label: "Properties" },
      { src: "/images/cornerstone-tenants.webp", label: "Tenants" },
      { src: "/images/cornerstone-payments.webp", label: "Payments" },
      { src: "/images/cornerstone-maintenance.webp", label: "Maintenance" },
      { src: "/images/cornerstone-analytics.webp", label: "Analytics" },
    ],
    deploy: {
      steps: ACTIONS_PAGES,
      fallback: "npm run build copies index.html to 404.html, so deep links keep working on GitHub Pages.",
    },
    inAppDocs: "https://cornerstone.codespanda.com/docs/",
  },
  {
    slug: "portfolio-template",
    id: "portfolio",
    repo: "https://github.com/codespanda/portfolio",
    branch: "main",
    framework: "Vite",
    language: "TypeScript",
    devPort: 5173,
    outDir: "dist",
    scripts: [
      VITE_SCRIPTS.dev,
      VITE_SCRIPTS.build,
      VITE_SCRIPTS.preview,
      VITE_SCRIPTS.eslint,
      { cmd: "npm run format", desc: "Format the source with Prettier" },
      { cmd: "npm run typecheck", desc: "Run the TypeScript compiler without building" },
    ],
    structure: `src/
  data/portfolio.ts    Your name, bio, skills, projects, experience and links
  components/
    sections/          Hero, About, Skills, Projects, Experience, Certifications,
                       Testimonials, Contact
    layout/  common/   Header, footer and shared pieces
    ui/                Reusable primitives
  pages/               Home.tsx, NotFound.tsx
  hooks/  lib/  types/
  index.css            CSS variables for light and dark mode
tailwind.config.ts     Tailwind v3 theme`,
    content: [
      { path: "src/data/portfolio.ts", desc: "Everything personal in one exported portfolio object: name, role, bio, skills, projects, experience, certifications, testimonials and social links." },
      { path: "public/", desc: "Your photo, project screenshots, resume and favicon." },
    ],
    theme: { path: "src/index.css + tailwind.config.ts", desc: "Colors are CSS variables in index.css (light and dark), mapped to Tailwind v3 in tailwind.config.ts. The contact form uses React Hook Form with Zod." },
    routing: "React Router with a home page and a 404 page; the home page scrolls between sections.",
    screens: [
      { src: "/images/portfolio/portfolio.webp", label: "Hero" },
      { src: "/images/portfolio/about.webp", label: "About" },
      { src: "/images/portfolio/projects.webp", label: "Projects" },
      { src: "/images/portfolio/skills.webp", label: "Skills" },
      { src: "/images/portfolio/contact.webp", label: "Contact form" },
      { src: "/images/portfolio/footer.webp", label: "Footer" },
    ],
    deploy: {
      steps: [...ACTIONS_PAGES.slice(0, 2), "vercel.json is included, so you can also import the repo on Vercel with no extra setup."],
    },
  },
];

export function getTemplateDocs(slug: string) {
  return TEMPLATE_DOCS.find((d) => d.slug === slug.toLowerCase());
}

export function docsPathFor(id: string) {
  const docs = TEMPLATE_DOCS.find((d) => d.id === id);
  return docs ? `/templates/${docs.slug}/docs` : undefined;
}
