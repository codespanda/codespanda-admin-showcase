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

## 🎨 Design Tokens

Colors are defined as HSL CSS variables in `src/index.css` (`:root` and `.dark`)
and surfaced through Tailwind in `tailwind.config.js`. Primary is indigo/blue
(`#4F46E5`) with purple→cyan accent gradients.

## ♿ Accessibility & SEO

- Semantic landmarks, skip-to-content link, focus-visible rings
- `aria-label`s on icon-only controls
- Open Graph / Twitter meta tags and descriptive `<title>` in `index.html`

> All dashboard visuals are rendered with CSS + inline SVG — no image assets required.
