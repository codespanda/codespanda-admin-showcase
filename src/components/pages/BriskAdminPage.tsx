import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Reveal, StaggerItem, Stagger } from "@/components/shared/Reveal";
import {
  ExternalLink, ArrowLeft, Star, Github, BookOpen, Monitor,
  CheckCircle2, Tag, Clock,
  LayoutDashboard, ShoppingCart, Users, BarChart3,
  FileText, Settings, Bell, Shield,
  Zap, Code2, Palette, Smartphone, Layers, Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/sections/Navbar";

const Footer = lazy(() =>
  import("@/components/sections/Footer").then((m) => ({ default: m.Footer }))
);

const LIVE = "https://brisk.codespanda.com";

const GALLERY = [
  { src: "/images/brisk/dashboard.png",   label: "Dashboard Overview" },
  { src: "/images/brisk/products.png",    label: "Products" },
  { src: "/images/brisk/orders.png",      label: "Orders" },
  { src: "/images/brisk/customers.png",   label: "Customers" },
  { src: "/images/brisk/analytics.png",   label: "Analytics" },
  { src: "/images/brisk/settings.png",    label: "Settings" },
];

const MODULES = [
  { icon: LayoutDashboard, label: "Dashboard",    desc: "Revenue, orders, and KPI cards at a glance.",           status: "Live" },
  { icon: ShoppingCart,    label: "Orders",       desc: "Order list, status tracking & detail view.",             status: "Live" },
  { icon: Users,           label: "Customers",    desc: "Customer directory with profiles and order history.",    status: "Live" },
  { icon: FileText,        label: "Products",     desc: "Product catalogue with pricing & inventory.",            status: "Live" },
  { icon: BarChart3,       label: "Analytics",    desc: "Revenue charts, sales trends & conversion metrics.",    status: "Live" },
  { icon: Bell,            label: "Notifications",desc: "System alerts, activity feed & notification centre.",   status: "Live" },
  { icon: Shield,          label: "Auth Pages",   desc: "Login, register & forgot password screens.",            status: "Live" },
  { icon: Settings,        label: "Settings",     desc: "Profile, preferences & account management.",            status: "Live" },
];

const FEATURES = [
  { icon: Code2,      title: "Clean React Code",       desc: "Well-structured components with consistent patterns — easy to extend without touching unrelated files." },
  { icon: Palette,    title: "Enterprise UI Polish",   desc: "Crisp typography, balanced whitespace, and a neutral palette that works in professional business contexts." },
  { icon: Smartphone, title: "Fully Responsive",       desc: "Fluid layouts across 4K, laptop, tablet, and mobile — every page adapts without layout shifts." },
  { icon: Zap,        title: "Fast & Lightweight",     desc: "No heavy UI framework dependencies. Lean bundle size for fast first-load even on slow connections." },
  { icon: Layers,     title: "Modular Structure",      desc: "Feature folders with clear boundaries. Add new pages or sections without touching existing code." },
  { icon: Globe,      title: "Production Ready",       desc: "Real-world page layouts wired with mock data — ready to connect your API and ship." },
];

const STATUS_STYLES: Record<string, string> = {
  Live: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  New:  "bg-indigo-500/10  text-indigo-600  dark:text-indigo-400  border-indigo-500/20",
  Soon: "bg-amber-500/10   text-amber-600   dark:text-amber-400   border-amber-500/20",
};

const TECH = [
  { name: "React 18",     color: "bg-cyan-500/10    text-cyan-600    dark:text-cyan-400"    },
  { name: "Vite",         color: "bg-violet-500/10  text-violet-600  dark:text-violet-400"  },
  { name: "shadcn/ui",    color: "bg-slate-500/10   text-slate-600   dark:text-slate-300"   },
  { name: "Tailwind CSS", color: "bg-sky-500/10     text-sky-600     dark:text-sky-400"     },
  { name: "JavaScript",   color: "bg-yellow-500/10  text-yellow-600  dark:text-yellow-400"  },
  { name: "React Router", color: "bg-red-500/10     text-red-600     dark:text-red-400"     },
  { name: "Recharts",     color: "bg-orange-500/10  text-orange-600  dark:text-orange-400"  },
  { name: "Lucide Icons", color: "bg-rose-500/10    text-rose-600    dark:text-rose-400"    },
];

const BRISK_FAQ = [
  {
    q: "Is Brisk Admin free to use commercially?",
    a: "Yes. Brisk Admin is released under the MIT License. Use it in client work, commercial SaaS products, or any internal tool — no attribution needed.",
  },
  {
    q: "Does Brisk Admin use TypeScript?",
    a: "No. Brisk Admin is built with plain JavaScript and CSS Modules. This keeps the setup light and the learning curve low — no tsconfig, no type errors to chase before you can start building.",
  },
  {
    q: "How is Brisk Admin different from Alpine Admin React?",
    a: "Alpine Admin is an HR-focused template with 30+ pages and TypeScript. Brisk Admin is a CRM/e-commerce template with 8 focused pages and plain JavaScript. Choose Alpine for deep HR data; choose Brisk for faster iteration on business UIs.",
  },
  {
    q: "Can I add TypeScript to Brisk Admin?",
    a: "Yes. Run `npm install -D typescript @types/react @types/react-dom`, add a tsconfig.json, and rename .jsx to .tsx. You can migrate incrementally — TypeScript is fully compatible with the existing Vite setup.",
  },
];

const STEPS = [
  { step: "01", title: "Download or Clone", code: "git clone https://github.com/codespanda/brisk-admin.git" },
  { step: "02", title: "Install dependencies", code: "npm install" },
  { step: "03", title: "Start the dev server", code: "npm run dev" },
  { step: "04", title: "Open in browser", code: "http://localhost:5173/dashboard" },
];

function GalleryImage({ src, label }: { src: string; label: string }) {
  return (
    <Reveal className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-md hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300">
      <div className="relative overflow-hidden" style={{ paddingBottom: "62.5%" }}>
        <img
          src={src}
          alt={`Brisk Admin — ${label}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/images/brisk/dashboard.png";
          }}
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

export function BriskAdminPage() {
  useEffect(() => {
    document.documentElement.dataset.template = "brisk";
    return () => { delete document.documentElement.dataset.template; };
  }, []);
  return (
    <>
      <Helmet>
        <title>Brisk Admin — Free shadcn/ui React Dashboard | CodeSpanda</title>
        <meta name="description" content="Brisk Admin is a free shadcn/ui React dashboard template for CRMs and business management apps. Clean layouts, enterprise UI polish, fully responsive." />
        <meta name="keywords" content="shadcn ui dashboard template, free react admin template, react crm dashboard, shadcn admin panel, react dashboard template, vite admin template" />
        <link rel="canonical" href="https://codespanda.com/templates/brisk-admin" />
        <meta property="og:title" content="Brisk Admin — Free shadcn/ui React Dashboard Template | CodeSpanda" />
        <meta property="og:description" content="Brisk Admin is a free shadcn/ui React dashboard template for CRMs and business management apps. Clean layouts, enterprise UI polish, fully responsive." />
        <meta property="og:url" content="https://codespanda.com/templates/brisk-admin" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/brisk/dashboard.png" />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="900" />
        <meta property="og:image:alt" content="Brisk Admin dashboard — free shadcn/ui React CRM template" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Brisk Admin — Free shadcn/ui React Dashboard Template | CodeSpanda" />
        <meta name="twitter:description" content="Brisk Admin is a free shadcn/ui React dashboard template for CRMs and business management apps. Clean layouts, enterprise UI polish, fully responsive." />
        <meta name="twitter:image" content="https://codespanda.com/images/brisk/dashboard.png" />
        <meta name="twitter:image:alt" content="Brisk Admin dashboard — free shadcn/ui React CRM template" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Brisk Admin",
          "description": "Brisk Admin is a free shadcn/ui React dashboard template for CRMs and business management apps. Clean layouts, enterprise UI polish, fully responsive.",
          "url": "https://codespanda.com/templates/Brisk-Admin",
          "image": "https://codespanda.com/images/brisk/dashboard.png",
          "brand": { "@type": "Brand", "name": "CodeSpanda" },
          "category": "Software > Templates > Admin Dashboard",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://codespanda.com/templates/brisk-admin"
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": BRISK_FAQ.map((item) => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a },
          })),
        })}</script>
      </Helmet>

      <Navbar />

      <main className="pt-24">
        {/* ── Breadcrumb ── */}
        <div className="mx-auto max-w-6xl px-4 pb-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to templates
          </Link>
        </div>

        {/* ── Hero ── */}
        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            {/* Copy */}
            <div className="flex-1">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 text-xs font-semibold text-white shadow">
                  Popular
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  Admin Dashboard
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> Free
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Brisk{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Admin
                </span>
                <span className="block text-base font-medium text-muted-foreground mt-1.5">Free shadcn/ui React Dashboard Template</span>
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                A free <strong className="font-semibold text-foreground">shadcn/ui React dashboard template</strong> for CRMs and business management apps — enterprise UI polish, fully responsive, and easy to retheme with Tailwind CSS.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="ml-1 font-medium">5.0</span>
                </div>
                <span className="text-muted-foreground">·</span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Tag className="h-3.5 w-3.5" /> MIT License
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> Updated July 2025
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/20"
                  asChild
                >
                  <a href={`${LIVE}/dashboard`} target="_blank" rel="noreferrer noopener">
                    <ExternalLink className="h-4 w-4" /> Live Preview
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://github.com/codespanda/brisk-admin" target="_blank" rel="noreferrer noopener">
                    <Github className="h-4 w-4" /> View on GitHub
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={LIVE} target="_blank" rel="noreferrer noopener">
                    <BookOpen className="h-4 w-4" /> Documentation
                  </a>
                </Button>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative flex-1 lg:max-w-xl">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl shadow-emerald-500/10">
                <img
                  src="/images/brisk/dashboard.png"
                  alt="Brisk Admin dashboard preview"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Overview ── */}
        <section className="border-y border-border bg-secondary/20 px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-2xl font-bold">What is Brisk Admin?</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Brisk Admin is a free, open-source <strong className="font-medium text-foreground">shadcn/ui React dashboard template</strong> built for CRM portals and business management apps. It's built on the same component primitives as shadcn/ui — every UI element is composable, unstyled-first, and easy to retheme with Tailwind CSS utility classes.
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Unlike bloated commercial dashboards, Brisk ships only what you need: a solid layout system, realistic page structures, and well-organised shadcn/ui components. No unnecessary abstractions — just clean React code you can build on immediately.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Who is it for?</h2>
                <ul className="mt-4 space-y-3">
                  {[
                    "Developers building e-commerce or CRM admin panels",
                    "Startups that need a polished internal tool quickly",
                    "Freelancers looking for a premium-quality free base",
                    "Teams prototyping a business management system",
                    "Developers who prefer a lightweight, no-TypeScript setup",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Gallery ── */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-500">Gallery</p>
              <h2 className="text-3xl font-bold">See it in action</h2>
              <p className="mt-3 text-muted-foreground">
                A tour of the key pages — every screen is production-ready and fully responsive.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {GALLERY.map((img) => (
                <GalleryImage key={img.src} src={img.src} label={img.label} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" asChild>
                <a href={`${LIVE}/dashboard`} target="_blank" rel="noreferrer noopener">
                  <Monitor className="h-4 w-4" /> Explore all pages
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="border-y border-border bg-secondary/20 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-500">Why Brisk Admin</p>
              <h2 className="text-3xl font-bold">Built for real business tools</h2>
            </div>
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <StaggerItem
                  key={f.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                    <f.icon className="h-5 w-5 text-emerald-500" />
                  </div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ── Modules ── */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-500">What's included</p>
              <h2 className="text-3xl font-bold">8 fully built pages</h2>
              <p className="mt-3 text-muted-foreground">
                Every page ships with working layouts, realistic sample data, and full mobile responsiveness.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MODULES.map((mod) => (
                <div
                  key={mod.label}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary">
                    <mod.icon className="text-foreground" style={{ height: 18, width: 18 }} />
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

        {/* ── Tech stack ── */}
        <section className="border-y border-border bg-secondary/20 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-500">Tech Stack</p>
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

        {/* ── Comparison: Alpine vs Brisk ── */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-500">Choosing a template</p>
              <h2 className="text-3xl font-bold">Alpine Admin React vs Brisk Admin</h2>
              <p className="mt-3 mx-auto max-w-xl text-muted-foreground">
                Both are free React dashboard templates from CodeSpanda — here's how they differ so you can pick the right one for your project.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                    <LayoutDashboard className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div>
                    <p className="font-bold">Alpine Admin React</p>
                    <p className="text-xs text-muted-foreground">HR &amp; people ops focus</p>
                  </div>
                </div>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  {[
                    "30+ pages across 12 HR modules",
                    "TypeScript — fully typed components",
                    "Recharts for HR analytics and reporting",
                    "Complex HR data: employees, payroll, leave flows",
                    "Best for: internal HR portals and HRMS products",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link
                    to="/templates/Alpine-Admin-React"
                    className="text-sm font-semibold text-indigo-500 hover:underline underline-offset-2"
                  >
                    View Alpine Admin React →
                  </Link>
                </div>
              </div>

              <div className="relative rounded-2xl border-2 border-emerald-500/40 bg-card p-7 shadow-sm">
                <div className="absolute -top-3 left-6">
                  <span className="rounded-full bg-emerald-500 px-3 py-0.5 text-xs font-semibold text-white">You are here</span>
                </div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <LayoutDashboard className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-bold">Brisk Admin</p>
                    <p className="text-xs text-muted-foreground">CRM &amp; e-commerce focus</p>
                  </div>
                </div>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  {[
                    "8 clean, focused pages",
                    "JavaScript — no TypeScript setup required",
                    "Lighter bundle, faster to prototype",
                    "Business data: orders, customers, products",
                    "Best for: CRM portals and e-commerce backends",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Getting Started ── */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-500">Documentation</p>
              <h2 className="text-3xl font-bold">Get running in 2 minutes</h2>
              <p className="mt-3 text-muted-foreground">
                Node.js 18+ required. No paid tools, no account sign-ups.
              </p>
            </div>

            <Stagger className="space-y-4">
              {STEPS.map((s) => (
                <StaggerItem
                  key={s.step}
                  className="flex items-start gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <span className="shrink-0 text-3xl font-black text-emerald-500/20 leading-none">{s.step}</span>
                  <div className="flex-1 min-w-0">
                    <p className="mb-2 font-semibold">{s.title}</p>
                    <code className="block overflow-x-auto rounded-lg bg-secondary px-4 py-2.5 font-mono text-sm text-foreground">
                      {s.code}
                    </code>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <h3 className="mb-3 font-bold">Project structure</h3>
              <pre className="overflow-x-auto font-mono text-sm leading-relaxed text-muted-foreground">{`src/
├── components/
│   ├── common/      # Shared UI: Sidebar, Header, Cards
│   ├── charts/      # Recharts wrappers
│   └── ui/          # Buttons, badges, inputs
├── pages/           # One file per route
│   ├── Dashboard.jsx
│   ├── Orders.jsx
│   ├── Customers.jsx
│   ├── Products.jsx
│   ├── Analytics.jsx
│   └── Settings.jsx
├── data/            # Mock data & constants
└── styles/          # Global CSS & CSS modules`}</pre>
            </div>

            <div className="mt-8 text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
                asChild
              >
                <a href={LIVE} target="_blank" rel="noreferrer noopener">
                  <BookOpen className="h-4 w-4" /> View Documentation
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-y border-border bg-secondary/20 px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-500">FAQ</p>
              <h2 className="text-3xl font-bold">Common questions</h2>
            </div>
            <div className="divide-y divide-border">
              {BRISK_FAQ.map((item) => (
                <div key={item.q} className="py-6">
                  <h3 className="font-semibold text-foreground">{item.q}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-4 pb-24">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-12 text-center text-white shadow-2xl shadow-emerald-500/30">
            <h2 className="text-3xl font-extrabold">Ready to build?</h2>
            <p className="mt-3 text-emerald-100">
              Brisk Admin is completely free and open-source. Clone it, customise it, and ship it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50" asChild>
                <a href={`${LIVE}/dashboard`} target="_blank" rel="noreferrer noopener">
                  <ExternalLink className="h-4 w-4" /> Live Preview
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <a href="https://github.com/codespanda/brisk-admin" target="_blank" rel="noreferrer noopener">
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
