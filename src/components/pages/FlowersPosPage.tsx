import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Reveal, StaggerItem, Stagger } from "@/components/shared/Reveal";
import {
  ExternalLink, ArrowLeft, Star, Github, BookOpen, Monitor,
  CheckCircle2, LayoutGrid, ShoppingCart, Users, Tag,
  BarChart3, Settings, Bell, KeyRound, Clock,
  Layers, Zap, Code2, Palette, Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/sections/Navbar";

const Footer = lazy(() =>
  import("@/components/sections/Footer").then((m) => ({ default: m.Footer }))
);

const GITHUB_URL = "https://github.com/codespanda/flowers-pos";
const DOCS_URL   = "https://flowers.codespanda.com/docs";
const PREVIEW_URL = "https://flowers.codespanda.com/";

const GALLERY = [
  { src: "/images/flowers/pos-counter.png",   label: "POS Counter" },
  { src: "/images/flowers/orders-live.png",   label: "Orders"      },
  { src: "/images/flowers/customers-live.png",label: "Customers"   },
  { src: "/images/flowers/coupons-live.png",  label: "Coupons"     },
  { src: "/images/flowers/reports-live.png",  label: "Reports"     },
  { src: "/images/flowers/settings-live.png", label: "Settings"    },
];

const MODULES = [
  { icon: LayoutGrid,   label: "POS Counter",   desc: "Product grid, cart, coupons and multi-tender checkout.",          status: "Live" },
  { icon: ShoppingCart, label: "Orders",        desc: "Order history with status and payment filters.",                  status: "Live" },
  { icon: Users,        label: "Customers",     desc: "Customer directory with spend and order history.",                status: "Live" },
  { icon: Tag,          label: "Coupons",       desc: "Discount codes with usage caps and expiry tracking.",             status: "Live" },
  { icon: BarChart3,    label: "Reports",       desc: "Revenue trend, top products and category breakdowns.",            status: "Live" },
  { icon: Settings,     label: "Settings",      desc: "Store profile, tax rate, payment methods and team.",              status: "Live" },
  { icon: Bell,         label: "Notifications", desc: "Order, inventory and system alerts in one feed.",                 status: "Live" },
  { icon: KeyRound,     label: "Auth screens",  desc: "Sign in, sign up and forgot-password, fully designed.",           status: "Live" },
];

const FEATURES = [
  { icon: Code2,      title: "TypeScript-First",       desc: "Every component and hook is fully typed. Clean, predictable code that scales with your team." },
  { icon: Palette,    title: "Pixel-Perfect UI",        desc: "Tailwind CSS with a custom design system — light and dark themes ship out of the box." },
  { icon: Smartphone, title: "Fully Responsive",        desc: "Works on desktop counters, tablets, and mobile — no separate mobile build." },
  { icon: Zap,        title: "Vite-Powered Builds",     desc: "Sub-second HMR during development and a production bundle under 200 KB gzipped." },
  { icon: BarChart3,  title: "Zero-Dependency Charts",  desc: "Revenue and category breakdowns rendered with plain CSS — no chart library weight." },
  { icon: Layers,     title: "Feature-Folder Structure",desc: "Each domain — orders, coupons, customers — is self-contained. Add or remove freely." },
];

const STATUS_STYLES: Record<string, string> = {
  Live: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  New:  "bg-indigo-500/10  text-indigo-600  dark:text-indigo-400  border-indigo-500/20",
  Soon: "bg-amber-500/10   text-amber-600   dark:text-amber-400   border-amber-500/20",
};

const TECH = [
  { name: "React 19",     color: "bg-cyan-500/10    text-cyan-600    dark:text-cyan-400"   },
  { name: "Vite",         color: "bg-violet-500/10  text-violet-600  dark:text-violet-400" },
  { name: "TypeScript",   color: "bg-blue-500/10    text-blue-600    dark:text-blue-400"   },
  { name: "Tailwind CSS", color: "bg-sky-500/10     text-sky-600     dark:text-sky-400"    },
  { name: "shadcn/ui",    color: "bg-slate-500/10   text-slate-600   dark:text-slate-300"  },
  { name: "radix-ui",     color: "bg-orange-500/10  text-orange-600  dark:text-orange-400" },
  { name: "React Router", color: "bg-red-500/10     text-red-600     dark:text-red-400"    },
  { name: "Lucide Icons", color: "bg-rose-500/10    text-rose-600    dark:text-rose-400"   },
];

const FAQ = [
  {
    q: "Can I use Flowers POS in commercial projects?",
    a: "Yes. Flowers POS is released under the MIT License. Use it in client work, SaaS products, white-label builds, and commercial applications with no attribution required.",
  },
  {
    q: "Is it suitable for shops other than flower shops?",
    a: "Absolutely. While designed around a flower shop's workflow, the modules (POS counter, orders, customers, coupons, reports) apply to any retail or boutique business. Rename labels and swap categories to fit your domain.",
  },
  {
    q: "Does it include a real payment gateway?",
    a: "No — it's a UI-only demo. Cart totals, coupon discounts, and tax are calculated client-side against mock data, with card, cash, and gift-card tender options at checkout. Wiring Stripe or another processor into the checkout flow is on you.",
  },
  {
    q: "How is Flowers POS different from the other templates?",
    a: "Flowers POS is the only retail-focused template in the CodeSpanda library. It includes a counter checkout flow with coupon codes and multi-tender payment, plus order and customer history — features specific to a brick-and-mortar retail counter rather than a back-office admin panel.",
  },
];

const STEPS = [
  { step: "01", title: "Clone the repo",       code: "git clone https://github.com/codespanda/flowers-pos.git" },
  { step: "02", title: "Install dependencies", code: "npm install" },
  { step: "03", title: "Start the dev server", code: "npm run dev" },
  { step: "04", title: "Open in browser",      code: "http://localhost:5173/dashboard" },
];

function GalleryImage({ src, label }: { src: string; label: string }) {
  return (
    <Reveal className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-md hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300">
      <div className="relative overflow-hidden" style={{ paddingBottom: "62.5%" }}>
        <img
          src={src}
          alt={`Flowers POS — ${label}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute bottom-3 left-3 text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {label}
        </span>
      </div>
      <p className="px-4 py-3 text-sm font-medium text-muted-foreground">{label}</p>
    </Reveal>
  );
}

export function FlowersPosPage() {
  useEffect(() => {
    document.documentElement.dataset.template = "flowers";
    return () => { delete document.documentElement.dataset.template; };
  }, []);

  return (
    <>
      <Helmet>
        <title>Flowers POS — Free React Retail POS Template | CodeSpanda</title>
        <meta name="description" content="Flowers POS is a free React retail POS template — product grid, cart, coupons, orders, customers and reports. Built with Vite, Tailwind CSS and TypeScript." />
        <meta name="keywords" content="react pos template, free react retail template, point of sale dashboard, tailwind pos template, react shop admin, vite react pos" />
        <link rel="canonical" href="https://codespanda.com/templates/flowers" />
        <meta property="og:title" content="Flowers POS — Free React Retail POS Template | CodeSpanda" />
        <meta property="og:description" content="Flowers POS is a free React point-of-sale template for a florist counter covering product grid, cart, coupons, orders, customers, and reports." />
        <meta property="og:url" content="https://codespanda.com/templates/flowers" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/flowers/pos-counter.png" />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="900" />
        <meta property="og:image:alt" content="Flowers POS counter — React retail point-of-sale template" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Flowers POS — Free React Retail POS Template | CodeSpanda" />
        <meta name="twitter:description" content="Flowers POS is a free React point-of-sale template for a florist counter covering product grid, cart, coupons, orders, customers, and reports." />
        <meta name="twitter:image" content="https://codespanda.com/images/flowers/pos-counter.png" />
        <meta name="twitter:image:alt" content="Flowers POS counter — React retail point-of-sale template" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Flowers POS",
          "description": "A free React point-of-sale template for a florist counter with product grid, cart, coupons, orders, customers, and reports. Built with React, Vite, Tailwind CSS and TypeScript.",
          "url": "https://codespanda.com/templates/flowers",
          "image": "https://codespanda.com/images/flowers/pos-counter.png",
          "brand": { "@type": "Brand", "name": "CodeSpanda" },
          "category": "Software > Templates > POS System",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://codespanda.com/templates/flowers"
          }
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
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to templates
          </Link>
        </div>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex-1">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 px-3 py-1 text-xs font-semibold text-white shadow">
                  New
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  Retail / POS
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> Free
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Flowers{" "}
                <span className="bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
                  POS
                </span>
                <span className="block text-base font-medium text-muted-foreground mt-1.5">Free React Retail POS Template</span>
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                A beautiful point-of-sale system for flower shops and retail boutiques. Covers <strong className="font-semibold text-foreground">product grid, cart, coupons, orders, customers, and reports</strong> across production-ready pages — built with React, Vite, Tailwind CSS, and TypeScript.
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
                  <Clock className="h-3.5 w-3.5" /> Updated July 2026
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
                <Button size="lg" className="border border-pink-500/40 bg-pink-500/10 text-pink-600 hover:bg-pink-500/20 dark:text-pink-400" asChild>
                  <a href={DOCS_URL} target="_blank" rel="noreferrer noopener">
                    <BookOpen className="h-4 w-4" /> Documentation
                  </a>
                </Button>
              </div>
            </div>

            {/* Hero image */}
            <Reveal className="relative flex-1 lg:max-w-xl">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-pink-500/20 to-rose-600/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl shadow-pink-500/10 ring-1 ring-pink-500/10">
                <img
                  src="/images/flowers/pos-counter.png"
                  alt="Flowers POS counter preview"
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
                    flowers.codespanda.com
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
                <h2 className="text-2xl font-bold">What is Flowers POS?</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Flowers POS is a free, open-source <strong className="font-medium text-foreground">React point-of-sale template</strong> built for a florist counter — but the patterns underneath (product grid, cart, coupon codes, multi-tender checkout, order history) apply to any small retail counter. You get a fully wired application — real navigation, working page layouts, and realistic mock data across every module from day one.
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Built with Tailwind CSS and a clean design system you can retheme in minutes. Whether you're building a custom POS for a client, launching a SaaS retail tool, or prototyping a shop management app, Flowers POS gives you a production-ready foundation instantly.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Who is it for?</h2>
                <ul className="mt-4 space-y-3">
                  {[
                    "Developers building a custom POS for a retail client",
                    "Agencies creating shop management portals",
                    "Startups building a SaaS retail or inventory platform",
                    "Freelancers wanting a solid, customisable free starter",
                    "Teams replacing legacy cash-register software with a modern React UI",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-pink-500">Gallery</p>
              <h2 className="text-3xl font-bold">See it in action</h2>
              <p className="mt-3 text-muted-foreground">
                A tour of the key modules — every page is production-ready and fully responsive.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {GALLERY.map((img) => (
                <GalleryImage key={img.label} src={img.src} label={img.label} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button className="border border-pink-500/40 bg-pink-500/10 text-pink-600 hover:bg-pink-500/20 dark:text-pink-400" asChild>
                <a href={PREVIEW_URL} target="_blank" rel="noreferrer noopener">
                  <Monitor className="h-4 w-4" /> Explore all
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-y border-border bg-secondary/20 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-pink-500">Why Flowers POS</p>
              <h2 className="text-3xl font-bold">Built for real retail projects</h2>
            </div>
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <StaggerItem
                  key={f.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10">
                    <f.icon className="h-5 w-5 text-pink-500" />
                  </div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Modules */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-pink-500">What's included</p>
              <h2 className="text-3xl font-bold">8 fully built modules</h2>
              <p className="mt-3 text-muted-foreground">
                Every module ships with working layouts, realistic sample data, and full responsiveness.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MODULES.map((mod) => (
                <div
                  key={mod.label}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary">
                    <mod.icon style={{ height: 18, width: 18 }} className="text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{mod.label}</span>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[mod.status]}`}>
                        {mod.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{mod.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech stack */}
        <section className="border-y border-border bg-secondary/20 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-pink-500">Tech Stack</p>
              <h2 className="text-3xl font-bold">Built with modern tools</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {TECH.map((t) => (
                <span key={t.name} className={`rounded-xl border border-border px-4 py-2 text-sm font-semibold ${t.color}`}>
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-pink-500">Documentation</p>
              <h2 className="text-3xl font-bold">Get running in 2 minutes</h2>
              <p className="mt-3 text-muted-foreground">Node.js 18+ required. No paid tools, no account sign-ups.</p>
            </div>

            <Stagger className="space-y-4">
              {STEPS.map((s) => (
                <StaggerItem
                  key={s.step}
                  className="flex items-start gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <span className="shrink-0 text-3xl font-black text-primary/20 leading-none">{s.step}</span>
                  <div className="flex-1 min-w-0">
                    <p className="mb-2 font-semibold">{s.title}</p>
                    <code className="block overflow-x-auto rounded-lg bg-secondary px-4 py-2.5 font-mono text-sm text-foreground">
                      {s.code}
                    </code>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="mt-8 text-center">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:from-pink-600 hover:to-rose-700 shadow-md shadow-pink-500/20" asChild>
                <a href={DOCS_URL} target="_blank" rel="noreferrer noopener">
                  <BookOpen className="h-4 w-4" /> View Documentation
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-y border-border bg-secondary/20 px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-pink-500">FAQ</p>
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
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-pink-600 to-rose-700 p-12 text-center text-white shadow-2xl shadow-pink-500/30">
            <h2 className="text-3xl font-extrabold">Ready to build?</h2>
            <p className="mt-3 text-pink-100">
              Flowers POS is completely free and open-source. Clone it, customise it, and ship it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-pink-700 hover:bg-pink-50" asChild>
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
