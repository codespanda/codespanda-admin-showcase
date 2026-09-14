import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Reveal, StaggerItem, Stagger } from "@/components/shared/Reveal";
import { useViewCount } from "@/hooks/use-view-count";
import {
  Eye,
  ExternalLink, ArrowLeft, Star, Github, Monitor,
  CheckCircle2, Menu, LayoutTemplate, PackageSearch, Store,
  ListChecks, Calculator, Sparkles, Quote,
  HelpCircle, UserCog, LayoutDashboard, Moon,
  Tag, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/sections/Navbar";

const Footer = lazy(() =>
  import("@/components/sections/Footer").then((m) => ({ default: m.Footer }))
);

const GITHUB_URL  = "https://github.com/codespanda/Shoppers-Crown";
const PREVIEW_URL = "https://shopperscrown.codespanda.com/";

const SECTIONS = [
  { icon: Menu,           label: "Header & Navigation", desc: "Sticky nav with dropdown menus, live cart badge, notifications, and search.",         status: "Live" },
  { icon: LayoutTemplate, label: "Hero",                 desc: "Animated shipping-route illustration paired with a dual CTA and trust badges.",       status: "Live" },
  { icon: Store,          label: "Brands & Stats",       desc: "Scrolling US-store marquee plus an animated stat-counter row.",                       status: "Live" },
  { icon: PackageSearch,  label: "Featured Products",    desc: "Product grid with pricing, ratings, shipping estimates, and add-to-cart.",             status: "Live" },
  { icon: ListChecks,     label: "How It Works",         desc: "Five-step numbered process from signup to doorstep delivery.",                        status: "Live" },
  { icon: Calculator,     label: "Shipping Calculator",  desc: "Real interactive rate estimator — country, weight, speed, and insurance.",             status: "Live" },
  { icon: Sparkles,       label: "Why Choose Us",        desc: "Eight-feature grid covering consolidation, tax-free shopping, and insurance.",         status: "Live" },
  { icon: Quote,          label: "Testimonials",         desc: "Rated customer review cards with country and date.",                                  status: "Live" },
  { icon: HelpCircle,     label: "FAQ",                  desc: "Accordion covering shipping, consolidation, tracking, and insurance questions.",       status: "Live" },
  { icon: UserCog,        label: "Auth Pages",           desc: "Login and signup screens with real React Hook Form + Zod validation.",                 status: "Live" },
  { icon: LayoutDashboard, label: "Shop, Cart & Dashboard", desc: "Product detail, cart, checkout, order success, tracking, and account dashboard.",    status: "Live" },
  { icon: LayoutTemplate, label: "Footer",               desc: "Sitemap columns, contact details, and social links.",                                  status: "Live" },
];

const FEATURES = [
  { icon: LayoutTemplate, title: "17 Real Routed Pages", desc: "Shop, product detail, cart, checkout, dashboard, tracking, brands, pricing, support and more — genuine React Router routes, not mockups." },
  { icon: UserCog,        title: "Real Form Validation", desc: "Login, signup, and checkout are wired with React Hook Form + Zod, not just styled inputs." },
  { icon: PackageSearch,  title: "Data-Fetching Ready",  desc: "TanStack Query is already wired in, so swapping mock data for a real API is a config change, not a rewrite." },
  { icon: Sparkles,       title: "Framer Motion",        desc: "Smooth, purposeful animations on the hero, stats, and interactive calculator." },
  { icon: Moon,           title: "Real Dark Mode",       desc: "A working ThemeContext toggles a genuine dark theme across every page, not just the marketing site." },
  { icon: Monitor,        title: "Mobile-First",         desc: "Every page reflows cleanly from a 375px phone up to a 4K desktop." },
];

const STATUS_STYLES: Record<string, string> = {
  Live: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

const TECH = [
  { name: "React 19",         color: "bg-cyan-500/10    text-cyan-600    dark:text-cyan-400"    },
  { name: "TypeScript",       color: "bg-blue-500/10    text-blue-600    dark:text-blue-400"    },
  { name: "Vite",             color: "bg-violet-500/10  text-violet-600  dark:text-violet-400"  },
  { name: "Tailwind CSS v4",  color: "bg-sky-500/10     text-sky-600     dark:text-sky-400"     },
  { name: "React Router",     color: "bg-red-500/10     text-red-600     dark:text-red-400"     },
  { name: "TanStack Query",   color: "bg-orange-500/10  text-orange-600  dark:text-orange-400"  },
  { name: "React Hook Form",  color: "bg-pink-500/10    text-pink-600    dark:text-pink-400"    },
  { name: "Framer Motion",    color: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400" },
];

const FAQ = [
  {
    q: "Can I use this for a commercial website?",
    a: "Yes — it's MIT licensed. Use it for client work, your own shipping/e-commerce product, or any commercial project, no attribution required.",
  },
  {
    q: "Is there a real shipping or payments backend?",
    a: "No — it ships with realistic mock data (products, brands, rates) wired through TanStack Query. The data-fetching layer is already in place, so pointing it at a real API is a matter of swapping the query functions, not restructuring the app.",
  },
  {
    q: "Does authentication actually work?",
    a: "The login and signup forms have real client-side validation (React Hook Form + Zod) and an AuthContext that manages session state — but there's no real backend behind it out of the box. You'll connect it to your own auth provider.",
  },
  {
    q: "Why Tailwind CSS v4?",
    a: "The template is built on Tailwind v4's CSS-first configuration and Vite. For v3, a find-and-replace on the CSS-variable tokens in index.css will get you most of the way there.",
  },
];

const STEPS = [
  { step: "01", title: "Clone the repo",       code: "git clone https://github.com/codespanda/Shoppers-Crown.git" },
  { step: "02", title: "Install dependencies", code: "npm install" },
  { step: "03", title: "Start the dev server", code: "npm run dev" },
  { step: "04", title: "Open in browser",      code: "http://localhost:5173/" },
];

export function ShoppersCrownPage() {
  const views = useViewCount("tpl-shopperscrown", 0);
  useEffect(() => {
    document.documentElement.dataset.template = "shopperscrown";
    return () => { delete document.documentElement.dataset.template; };
  }, []);

  return (
    <>
      <Helmet>
        <title>Shoppers Crown — Free International Shopping &amp; Package-Forwarding Template | CodesPanda</title>
        <meta name="description" content="A free React template for international shopping and package-forwarding platforms — shop, cart, checkout, shipping calculator, tracking, and a dashboard, with 17 real routed pages." />
        <meta name="keywords" content="react ecommerce template, package forwarding website template, shipping calculator react, react shopping cart template, tailwind css v4 template, react router ecommerce" />
        <link rel="canonical" href="https://codespanda.com/templates/shopperscrown" />
        <meta property="og:title" content="Shoppers Crown — Free International Shopping & Package-Forwarding Template | CodesPanda" />
        <meta property="og:description" content="A free React template for international shopping and package-forwarding platforms — shop, cart, checkout, shipping calculator, tracking, and a dashboard." />
        <meta property="og:url" content="https://codespanda.com/templates/shopperscrown" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shoppers Crown — Free International Shopping & Package-Forwarding Template | CodesPanda" />
        <meta name="twitter:description" content="A free React template for international shopping and package-forwarding platforms — 17 real routed pages." />
        <meta name="twitter:image" content="https://codespanda.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Shoppers Crown",
          "description": "A free React template for international shopping and package-forwarding platforms — shop, cart, checkout, shipping calculator, tracking, and a dashboard.",
          "url": "https://codespanda.com/templates/shopperscrown",
          "image": "https://codespanda.com/og-image.png",
          "brand": { "@type": "Brand", "name": "CodesPanda" },
          "category": "Software > Templates > E-commerce",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQ.map((item) => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a },
          })),
        })}</script>
      </Helmet>

      <Navbar />

      <main className="pt-24">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-6xl px-4 pb-2">
          <Link to="/templates" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to templates
          </Link>
        </div>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex-1">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow">
                  New
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  E-commerce / Package-Forwarding Platform
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> Free
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  <Eye className="h-3.5 w-3.5" /> {views.toLocaleString()} views
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Shoppers{" "}
                <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  Crown
                </span>
                <span className="block text-base font-medium text-muted-foreground mt-1.5">Free React Template for Shopping &amp; Package-Forwarding Platforms</span>
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                A complete <strong className="font-semibold text-foreground">international shopping and package-forwarding application</strong> — a marketing homepage, a real shop and cart flow, an interactive shipping calculator, tracking, and an account dashboard, across <strong className="font-semibold text-foreground">17 genuinely routed pages</strong>.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 font-medium">5.0</span>
                </div>
                <span className="text-muted-foreground">·</span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Tag className="h-3.5 w-3.5" /> MIT License
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> Updated September 2026
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="gradient" size="lg" asChild>
                  <a href={PREVIEW_URL} target="_blank" rel="noreferrer noopener">
                    <ExternalLink className="h-4 w-4" /> Live Preview
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener">
                    <Github className="h-4 w-4" /> View on GitHub
                  </a>
                </Button>
              </div>
            </div>

            {/* Hero image */}
            <Reveal className="relative flex-1 lg:max-w-xl">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/20 to-indigo-600/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl shadow-blue-500/10 ring-1 ring-blue-500/10">
                <img
                  src="/images/shopperscrown/hero.webp"
                  alt="Shoppers Crown — hero preview"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full object-cover object-top"
                />
                <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 bg-black/40 px-3 py-2 backdrop-blur-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-3 flex-1 rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/60">
                    shopperscrown.codespanda.com
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Overview */}
        <section className="border-y border-border bg-secondary/20 px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-2xl font-bold">What is Shoppers Crown?</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Shoppers Crown is a free, open-source <strong className="font-medium text-foreground">React template built for international shopping and package-forwarding platforms</strong> — the kind of product that gives shoppers a free US address, lets them buy from any store, and forwards their packages worldwide. It ships a full application: a marketing homepage plus 17 real routed pages covering shop, cart, checkout, tracking, and account management.
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Built with React 19, TypeScript, Vite, Tailwind CSS v4, React Router, TanStack Query and React Hook Form + Zod, it's wired for real data-fetching and real form validation — not just static mockups.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Who is it for?</h2>
                <ul className="mt-4 space-y-3">
                  {[
                    "Developers building a shopping, marketplace, or logistics product",
                    "Agencies delivering e-commerce sites with a real cart and checkout flow",
                    "Founders who want a working shop + dashboard starter instead of a blank canvas",
                    "Anyone wanting a reference for React Router + TanStack Query + React Hook Form",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Sections / Modules */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-500">What's included</p>
              <h2 className="text-3xl font-bold">{SECTIONS.length} fully built sections &amp; page groups</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Every section ships with working layout, real copy, and working interactivity — nothing is a placeholder.
              </p>
            </div>
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SECTIONS.map((s) => (
                <StaggerItem key={s.label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                    <s.icon className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{s.label}</span>
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[s.status]}`}>
                        {s.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Features */}
        <section className="border-y border-border bg-secondary/20 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-500">Why This Template</p>
              <h2 className="text-3xl font-bold">Built to be extended, not fought</h2>
            </div>
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <StaggerItem key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                    <f.icon className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-500">Tech Stack</p>
            <h2 className="text-3xl font-bold">Built with modern tools</h2>
            <Stagger className="mt-10 flex flex-wrap justify-center gap-3">
              {TECH.map((t) => (
                <StaggerItem key={t.name}>
                  <span className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold ${t.color}`}>
                    {t.name}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Quick Start */}
        <section className="border-y border-border bg-secondary/20 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-500">Get Started</p>
              <h2 className="text-3xl font-bold">Running in 2 minutes</h2>
              <p className="mt-3 text-muted-foreground">Node.js 18+ required. No paid tools, no account sign-ups.</p>
            </div>
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s) => (
                <StaggerItem key={s.step} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <span className="text-sm font-bold text-blue-500">{s.step}</span>
                  <p className="mt-2 font-semibold">{s.title}</p>
                  <code className="mt-3 block overflow-x-auto rounded-lg bg-secondary px-3 py-2 text-xs text-muted-foreground">
                    {s.code}
                  </code>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-500">FAQ</p>
              <h2 className="text-3xl font-bold">Common questions</h2>
            </div>
            <div className="divide-y divide-border">
              {FAQ.map((item) => (
                <div key={item.q} className="py-6">
                  <h3 className="font-semibold text-foreground">{item.q}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-24">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f1d3d] to-[#0a1428] p-12 text-center text-white shadow-2xl shadow-blue-500/10">
            <h2 className="text-3xl font-extrabold">Ready to build your shopping platform?</h2>
            <p className="mt-3 text-white/70">
              Shoppers Crown is completely free and open-source. Clone it, make it yours, and ship it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-500 text-white hover:bg-blue-400" asChild>
                <a href={PREVIEW_URL} target="_blank" rel="noreferrer noopener">
                  <ExternalLink className="h-4 w-4" /> Live Preview
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener">
                  <Github className="h-4 w-4" /> Star on GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Suspense fallback={<div className="h-72 animate-pulse bg-secondary/30" />}>
        <Footer />
      </Suspense>
    </>
  );
}
