# Nexus — AI-Powered Admin Dashboard Showcase

A premium, single-page SaaS landing site showcasing an AI-powered admin dashboard.
Built to feel like Linear, Stripe, Vercel, Notion, and Framer — glassmorphism,
soft gradients, large spacing, rounded corners, and smooth scroll-reveal animations.

## ✨ Tech Stack

- **React 18** + **TypeScript**
- **Vite 6** for lightning-fast dev/build
- **Tailwind CSS 3** with CSS-variable theming
- **shadcn/ui**–style components (Radix primitives + Tailwind)
- **Lucide React** icons
- **Framer Motion** for subtle, performant animations
- Fully **responsive** (desktop / tablet / mobile)
- **Dark & Light** mode with persistence

## 🚀 Getting Started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## 📁 Project Structure

```
src/
├─ components/
│  ├─ ui/             # shadcn-style primitives (button, card, badge, accordion…)
│  ├─ shared/         # Reveal, Counter, Charts, DashboardMockup, GradientBlobs…
│  └─ sections/       # Navbar, Hero, Features, Pricing, FAQ, Footer, …
├─ hooks/
│  └─ use-theme.tsx   # light/dark theme provider
├─ lib/
│  ├─ constants.ts    # site config, nav links
│  ├─ data.ts         # typed dummy data for every section
│  └─ utils.ts        # cn() class merge helper
├─ App.tsx            # composition + lazy-loaded sections
├─ main.tsx           # entry + ThemeProvider
└─ index.css          # Tailwind layers + design tokens
```

## 🧩 Sections

Hero · Trusted-by logos · Features grid · Dashboard preview (tabbed) · Modules ·
Analytics showcase · AI Automation · Pricing · Testimonials · FAQ · CTA · Footer.

## 🖥️ Templates Showcased

This site is also the marketing showcase for CodesPanda's free React templates —
each has its own `/templates/<slug>` marketing page in this repo
(`src/components/pages/`) plus a separately-hosted live demo:

| Template | Live Demo | Category |
|---|---|---|
| [Your CA Firm](https://ca-firm.codespanda.com/) | `/templates/ca-firm` | Financial & Advisory Landing Page |
| [Finovo](https://finovo.codespanda.com/) | `/templates/finovo` | Finance / Accounting Admin |
| [Hamara Bharat](https://hamarabharat.codespanda.com/) | `/templates/hamara-bharat` | Travel / Tourism Landing Page |
| [Eva AutoCare](https://eva-autocare.codespanda.com/) | `/templates/eva-autocare` | Automotive / Service Center Admin |
| [DeepCity Care Hospital](https://deepcity-care.codespanda.com/) | `/templates/deepcity-care` | Healthcare Admin |
| [Flowers POS](https://flowers.codespanda.com/) | `/templates/flowers` | Retail POS |
| [Alpine Admin React](https://codespanda.github.io/Alpine-Admin-React/dashboard) | `/templates/alpine-admin-react` | HR Admin |
| [Brisk Admin](https://brisk.codespanda.com/dashboard) | `/templates/brisk-admin` | CRM Admin |
| [Cornerstone](https://cornerstone.codespanda.com/) | `/templates/cornerstone` | SaaS Admin |
| [Portfolio Template](https://codespanda.github.io/portfolio/) | `/templates/portfolio-template` | Developer Portfolio |

Adding a new template means: an entry in `src/lib/data.ts` (`TEMPLATES`), a
`<Name>Page.tsx` marketing page + route in `App.tsx`, an entry in
`FOOTER_NAV` (`src/lib/constants.ts`), the static `ItemList` schema in
`index.html`, and prerender/SEO metadata + sitemap entries in
`scripts/copy-spa-routes.js` and `scripts/generate-sitemap.js`.

## 🎨 Design Tokens

Colors are defined as HSL CSS variables in `src/index.css` (`:root` and `.dark`)
and surfaced through Tailwind in `tailwind.config.js`. Primary is indigo/blue
(`#4F46E5`) with purple→cyan accent gradients.

## ♿ Accessibility & SEO

- Semantic landmarks, skip-to-content link, focus-visible rings
- `aria-label`s on icon-only controls
- Open Graph / Twitter meta tags and descriptive `<title>` in `index.html`

> All dashboard visuals are rendered with CSS + inline SVG — no image assets required.
