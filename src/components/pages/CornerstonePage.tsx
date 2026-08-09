import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Reveal, StaggerItem, Stagger } from "@/components/shared/Reveal";
import { useViewCount } from "@/hooks/use-view-count";
import {
  Eye,
  ExternalLink, ArrowLeft, Star, Github, BookOpen, Monitor,
  CheckCircle2, LayoutDashboard, Users, ShoppingCart, BarChart3,
  Bell, Settings, FileText, CreditCard, TrendingUp, Package,
  MessageSquare, Shield, Clock, Tag, Layers, Zap, Code2,
  Palette, Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/sections/Navbar";

const Footer = lazy(() =>
  import("@/components/sections/Footer").then((m) => ({ default: m.Footer }))
);

const GITHUB_URL = "https://github.com/codespanda/cornerstone";
const DOCS_URL = "https://cornerstone.codespanda.com/docs/";
const PREVIEW_URL = "https://cornerstone.codespanda.com/";

const GALLERY = [
  { src: "/images/cornerstone-dashboard-2.webp",   label: "Main Dashboard" },
  { src: "/images/cornerstone-properties.webp",    label: "Properties"     },
  { src: "/images/cornerstone-tenants.webp",       label: "Tenants"        },
  { src: "/images/cornerstone-payments.webp",      label: "Payments"       },
  { src: "/images/cornerstone-maintenance.webp",   label: "Maintenance"    },
  { src: "/images/cornerstone-analytics.webp",     label: "Analytics"      },
];

const MODULES = [
  { icon: LayoutDashboard, label: "Dashboard",      desc: "Revenue, occupancy, payments and maintenance at a glance.", status: "Live" },
  { icon: Package,         label: "Properties",     desc: "Full property directory with units, occupancy and value.",  status: "Live" },
  { icon: Users,           label: "Tenants",        desc: "Tenant profiles, lease status and contact details.",        status: "Live" },
  { icon: FileText,        label: "Leases",         desc: "Lease agreements, renewals and expiry tracking.",           status: "Live" },
  { icon: CreditCard,      label: "Payments",       desc: "Rent collection, receipts, overdue and refund tracking.",   status: "Live" },
  { icon: Shield,          label: "Maintenance",    desc: "Maintenance requests, priority queue and status workflow.",  status: "Live" },
  { icon: ShoppingCart,    label: "Invoices",       desc: "Invoice generation, due dates and payment reconciliation.", status: "Live" },
  { icon: BarChart3,       label: "Analytics",      desc: "Revenue trends, occupancy charts and property insights.",   status: "Live" },
  { icon: TrendingUp,      label: "Reports",        desc: "Exportable income, occupancy and maintenance reports.",     status: "Live" },
  { icon: MessageSquare,   label: "Messages",       desc: "In-app messaging between landlord and tenants.",            status: "Live" },
  { icon: Bell,            label: "Announcements",  desc: "Broadcast notices to all or selected tenants.",             status: "Live" },
  { icon: Settings,        label: "Settings",       desc: "Company profile, user roles and app preferences.",          status: "Live" },
];

const FEATURES = [
  { icon: Code2,      title: "TypeScript-First",       desc: "Every component, hook, and util is fully typed. Rename to .jsx if you prefer plain JavaScript." },
  { icon: Palette,    title: "shadcn/ui Components",    desc: "Built on shadcn/ui primitives — swap the theme by editing a single CSS variables file." },
  { icon: Smartphone, title: "Fully Responsive",        desc: "Fluid layouts across 4K monitors, laptops, tablets, and mobile — no separate mobile build." },
  { icon: Zap,        title: "Vite-Powered Builds",     desc: "Sub-second HMR in dev, optimised production bundle under 450 KB gzipped." },
  { icon: BarChart3,  title: "Rich Data Visualisation", desc: "Recharts line, area, bar, pie, and radial charts — all wired to realistic mock data." },
  { icon: Layers,     title: "Feature-Folder Structure",desc: "Each domain (Customers, Orders, Billing…) is self-contained. Add or remove without side-effects." },
];

const STATUS_STYLES: Record<string, string> = {
  Live: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  New:  "bg-indigo-500/10  text-indigo-600  dark:text-indigo-400  border-indigo-500/20",
  Soon: "bg-amber-500/10   text-amber-600   dark:text-amber-400   border-amber-500/20",
};

const TECH = [
  { name: "React 18",      color: "bg-cyan-500/10    text-cyan-600    dark:text-cyan-400"    },
  { name: "Vite",          color: "bg-violet-500/10  text-violet-600  dark:text-violet-400"  },
  { name: "TypeScript",    color: "bg-blue-500/10    text-blue-600    dark:text-blue-400"    },
  { name: "Tailwind CSS",  color: "bg-sky-500/10     text-sky-600     dark:text-sky-400"     },
  { name: "shadcn/ui",     color: "bg-slate-500/10   text-slate-600   dark:text-slate-300"   },
  { name: "Recharts",      color: "bg-orange-500/10  text-orange-600  dark:text-orange-400"  },
  { name: "React Router",  color: "bg-red-500/10     text-red-600     dark:text-red-400"     },
  { name: "Lucide Icons",  color: "bg-rose-500/10    text-rose-600    dark:text-rose-400"    },
];

const CORNERSTONE_FAQ = [
  {
    q: "Can I use Cornerstone in commercial projects?",
    a: "Yes. Cornerstone is released under the MIT License. Use it in client work, SaaS products, white-label builds, and commercial applications with no attribution required.",
  },
  {
    q: "Does it include authentication?",
    a: "Cornerstone ships with fully designed login, signup, forgot-password, and onboarding screens. The UI is complete — wiring up a real auth provider (Supabase, Firebase, Clerk, Auth.js) takes minutes.",
  },
  {
    q: "Can I use it without TypeScript?",
    a: "The template is TypeScript-first. You can rename files to .jsx and strip type annotations, but you'll lose autocomplete and refactoring safety. Most teams find the types pay for themselves quickly.",
  },
  {
    q: "How is Cornerstone different from Alpine Admin React?",
    a: "Alpine Admin React is purpose-built for HR management (employees, payroll, attendance, leave). Cornerstone targets general SaaS and business products — customers, orders, billing, analytics, and support. Pick the one closest to your domain.",
  },
];

const STEPS = [
  { step: "01", title: "Clone the repo",        code: "git clone https://github.com/codespanda/cornerstone.git" },
  { step: "02", title: "Install dependencies",  code: "npm install" },
  { step: "03", title: "Start the dev server",  code: "npm run dev" },
  { step: "04", title: "Open in browser",       code: "http://localhost:5173/dashboard" },
];

function GalleryImage({ src, label }: { src: string; label: string }) {
  return (
    <Reveal className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-md hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300">
      <div className="relative overflow-hidden" style={{ paddingBottom: "62.5%" }}>
        <img
          src={src}
          alt={`Cornerstone — ${label}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
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

export function CornerstonePage() {
  const views = useViewCount("tpl-cornerstone", 0);
  useEffect(() => {
    document.documentElement.dataset.template = "cornerstone";
    return () => { delete document.documentElement.dataset.template; };
  }, []);
  return (
    <>
      <Helmet>
        <title>Cornerstone — SaaS Admin Dashboard Template | CodeSpanda</title>
        <meta name="description" content="Cornerstone is a free SaaS admin dashboard template — 30+ pages for customers, orders, billing &amp; analytics. Built with React, Vite, Tailwind CSS &amp; TypeScript." />
        <meta name="keywords" content="react saas dashboard template, free react admin template, saas admin dashboard, tailwind saas template, shadcn ui dashboard, vite react dashboard" />
        <link rel="canonical" href="https://codespanda.com/templates/cornerstone" />
        <meta property="og:title" content="Cornerstone — SaaS Admin Dashboard Template | CodeSpanda" />
        <meta property="og:description" content="Free React SaaS dashboard with 30+ pages for customers, orders, billing, analytics and support. Vite, Tailwind CSS, shadcn/ui, TypeScript." />
        <meta property="og:url" content="https://codespanda.com/templates/cornerstone" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/cornerstone-dashboard-2.webp" />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="900" />
        <meta property="og:image:alt" content="Cornerstone SaaS dashboard — free React admin template" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cornerstone — SaaS Admin Dashboard Template | CodeSpanda" />
        <meta name="twitter:description" content="Cornerstone is a free React SaaS dashboard template with 30+ pages for customers, orders, billing, analytics and support." />
        <meta name="twitter:image" content="https://codespanda.com/images/cornerstone-dashboard-2.webp" />
        <meta name="twitter:image:alt" content="Cornerstone SaaS dashboard — free React admin template" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Cornerstone",
          "description": "Cornerstone is a free SaaS dashboard template with 30+ pages for customers, orders, billing, analytics and support. Built with React, Vite, Tailwind CSS, shadcn/ui and TypeScript.",
          "url": "https://codespanda.com/templates/cornerstone",
          "image": "https://codespanda.com/images/cornerstone-dashboard-2.webp",
          "brand": { "@type": "Brand", "name": "CodeSpanda" },
          "category": "Software > Templates > Admin Dashboard",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://codespanda.com/templates/cornerstone"
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": CORNERSTONE_FAQ.map((item) => ({
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
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-3 py-1 text-xs font-semibold text-white shadow">
                  New
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  SaaS Dashboard
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> Free
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  <Eye className="h-3.5 w-3.5" /> {views.toLocaleString()} views
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Cornerstone{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  Dashboard
                </span>
                <span className="block text-base font-medium text-muted-foreground mt-1.5">— SaaS Admin Dashboard Template</span>
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                A complete SaaS admin template covering <strong className="font-semibold text-foreground">customers, orders, billing, analytics, and support</strong> across 30+ production-ready pages — built with React, Vite, Tailwind CSS, shadcn/ui, and TypeScript.
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
                <Button variant="outline" size="lg" asChild>
                  <a href={DOCS_URL} target="_blank" rel="noreferrer noopener">
                    <BookOpen className="h-4 w-4" /> Documentation
                  </a>
                </Button>
              </div>
            </div>

            {/* Hero image */}
            <Reveal className="relative flex-1 lg:max-w-xl">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-600/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl shadow-emerald-500/10 ring-1 ring-emerald-500/10">
                <img
                  src="/images/cornerstone-dashboard-2.webp"
                  alt="Cornerstone — SaaS dashboard preview"
                  width={1313}
                  height={908}
                  loading="eager"
                  decoding="async"
                  className="w-full object-cover object-top"
                />
                {/* Browser chrome strip */}
                <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 bg-black/40 px-3 py-2 backdrop-blur-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-3 flex-1 rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/60">
                    cornerstone.codespanda.com
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
                <h2 className="text-2xl font-bold">What is Cornerstone?</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Cornerstone is a free, open-source <strong className="font-medium text-foreground">React SaaS dashboard template</strong> built for developers who ship fast. Instead of a pile of isolated UI components, you get a fully wired business application — real navigation, working page layouts, and realistic mock data across every module from day one.
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Built on shadcn/ui component primitives with a design system you can retheme by editing a single CSS file. Whether you're launching a SaaS product, building a client portal, or prototyping a business tool, Cornerstone gives you a production-ready foundation without the blank-canvas grind.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Who is it for?</h2>
                <ul className="mt-4 space-y-3">
                  {[
                    "Indie developers shipping a SaaS MVP without a design team",
                    "Agencies building business management portals for clients",
                    "Startups that need a polished admin UI on day one",
                    "Teams replacing legacy dashboards with a modern React stack",
                    "Freelancers looking for a solid, customisable free template base",
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

        {/* Gallery */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Gallery</p>
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
              <Button variant="outline" asChild>
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
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Why Cornerstone</p>
              <h2 className="text-3xl font-bold">Built for real projects</h2>
            </div>
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <StaggerItem
                  key={f.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <f.icon className="h-5 w-5 text-primary" />
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
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">What's included</p>
              <h2 className="text-3xl font-bold">12 fully built SaaS modules</h2>
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
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Tech Stack</p>
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
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Documentation</p>
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

            <div className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <h3 className="mb-3 font-bold">Project structure</h3>
              <pre className="overflow-x-auto font-mono text-sm leading-relaxed text-muted-foreground">{`src/
├── components/
│   ├── ui/           # shadcn/ui primitives
│   ├── layout/       # Sidebar, header, shell
│   └── charts/       # Recharts wrappers
├── pages/            # One file per route
│   ├── Dashboard.tsx
│   ├── Customers.tsx
│   ├── Orders.tsx
│   ├── Analytics.tsx
│   └── ...
├── lib/
│   └── data.ts       # Mock data & types
└── hooks/            # Custom React hooks`}</pre>
            </div>

            <div className="mt-8 text-center">
              <Button variant="gradient" size="lg" asChild>
                <a href={DOCS_URL} target="_blank" rel="noreferrer noopener">
                  <BookOpen className="h-4 w-4" /> Read the full docs
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-y border-border bg-secondary/20 px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">FAQ</p>
              <h2 className="text-3xl font-bold">Common questions</h2>
            </div>
            <div className="divide-y divide-border">
              {CORNERSTONE_FAQ.map((item) => (
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
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-12 text-center text-white shadow-2xl shadow-emerald-500/30">
            <h2 className="text-3xl font-extrabold">Ready to build?</h2>
            <p className="mt-3 text-emerald-100">
              Cornerstone is completely free and open-source. Clone it, customise it, and ship it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50" asChild>
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
