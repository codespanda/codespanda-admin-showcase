import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

const RAW = "https://raw.githubusercontent.com/codespanda/brisk-admin/master/public";
const LIVE = "https://brisk.codespanda.com";

const GALLERY = [
  { src: `${RAW}/dashboard.png`,   label: "Dashboard Overview" },
  { src: `${RAW}/products.png`,    label: "Products" },
  { src: `${RAW}/orders.png`,      label: "Orders" },
  { src: `${RAW}/customers.png`,   label: "Customers" },
  { src: `${RAW}/analytics.png`,   label: "Analytics" },
  { src: `${RAW}/settings.png`,    label: "Settings" },
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
  { name: "React 18",     color: "bg-cyan-500/10    text-cyan-600    dark:text-cyan-400"   },
  { name: "Vite",         color: "bg-violet-500/10  text-violet-600  dark:text-violet-400" },
  { name: "JavaScript",   color: "bg-yellow-500/10  text-yellow-600  dark:text-yellow-400" },
  { name: "CSS Modules",  color: "bg-blue-500/10    text-blue-600    dark:text-blue-400"   },
  { name: "React Router", color: "bg-red-500/10     text-red-600     dark:text-red-400"    },
  { name: "Recharts",     color: "bg-orange-500/10  text-orange-600  dark:text-orange-400" },
  { name: "Lucide Icons", color: "bg-rose-500/10    text-rose-600    dark:text-rose-400"   },
];

const STEPS = [
  { step: "01", title: "Download or Clone", code: "git clone https://github.com/codespanda/brisk-admin.git" },
  { step: "02", title: "Install dependencies", code: "npm install" },
  { step: "03", title: "Start the dev server", code: "npm run dev" },
  { step: "04", title: "Open in browser", code: "http://localhost:5173/dashboard" },
];

function GalleryImage({ src, label }: { src: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-md hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
    >
      <div className="relative overflow-hidden" style={{ paddingBottom: "62.5%" }}>
        <img
          src={src}
          alt={label}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = `${RAW}/dashboard.png`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute bottom-3 left-3 text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {label}
        </span>
      </div>
      <p className="px-4 py-3 text-sm font-medium text-muted-foreground">{label}</p>
    </motion.div>
  );
}

export function BriskAdminPage() {
  return (
    <>
      <Helmet>
        <title>Brisk Admin — Free React Admin Dashboard Template | CodeSpanda</title>
        <meta name="description" content="Free, open-source enterprise React admin dashboard with clean layouts. Perfect for CRM, e-commerce backends, and business management systems. Built with React and Vite." />
        <link rel="canonical" href="https://codespanda.com/templates/Brisk-Admin" />
        <meta property="og:title" content="Brisk Admin — Free React Admin Dashboard Template | CodeSpanda" />
        <meta property="og:description" content="Free enterprise React admin dashboard with clean layouts. Perfect for CRM, e-commerce backends, and business management systems." />
        <meta property="og:url" content="https://codespanda.com/templates/Brisk-Admin" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Brisk Admin — Free React Admin Dashboard Template | CodeSpanda" />
        <meta name="twitter:description" content="Free enterprise React admin dashboard with clean layouts. Perfect for CRM, e-commerce backends, and business management systems." />
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
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                A sleek, <strong className="font-semibold text-foreground">enterprise-grade admin dashboard</strong> with clean layouts and a polished UI. Perfect for building business management systems, e-commerce backends, and CRM portals.
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
                  src={`${RAW}/dashboard.png`}
                  alt="Brisk Admin dashboard preview"
                  loading="eager"
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
                  Brisk Admin is a free, open-source admin dashboard template designed for teams who need a <strong className="font-medium text-foreground">clean, professional starting point</strong> for business management UIs. It focuses on usability and visual clarity over feature density — every screen is uncluttered and easy to navigate.
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Unlike bloated commercial dashboards, Brisk ships only what you need: a solid layout system, realistic page structures, and well-organised components. No unnecessary abstractions — just clean React code you can build on immediately.
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                    <f.icon className="h-5 w-5 text-emerald-500" />
                  </div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </motion.div>
              ))}
            </div>
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

            <div className="space-y-4">
              {STEPS.map((s) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <span className="shrink-0 text-3xl font-black text-emerald-500/20 leading-none">{s.step}</span>
                  <div className="flex-1 min-w-0">
                    <p className="mb-2 font-semibold">{s.title}</p>
                    <code className="block overflow-x-auto rounded-lg bg-secondary px-4 py-2.5 font-mono text-sm text-foreground">
                      {s.code}
                    </code>
                  </div>
                </motion.div>
              ))}
            </div>

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
