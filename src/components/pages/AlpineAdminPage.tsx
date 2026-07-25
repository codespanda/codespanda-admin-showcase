import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Reveal, StaggerItem, Stagger } from "@/components/shared/Reveal";
import {
  ExternalLink, ArrowLeft, Star, Github, BookOpen, Monitor,
  CheckCircle2, LayoutDashboard, Users, Building2, Briefcase,
  CalendarCheck, CalendarDays, Wallet, TrendingUp, UserPlus,
  BarChart3, FileBarChart, Settings, Clock, Tag, Layers,
  Zap, Code2, Palette, Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/sections/Navbar";

const Footer = lazy(() =>
  import("@/components/sections/Footer").then((m) => ({ default: m.Footer }))
);

const GALLERY = [
  { src: "/images/alpine/dashboard.png",    label: "Main Dashboard" },
  { src: "/images/alpine/employees.png",    label: "Employee Directory" },
  { src: "/images/alpine/attendance.png",   label: "Attendance Tracker" },
  { src: "/images/alpine/leave.png",        label: "Leave Management" },
  { src: "/images/alpine/payroll.png",      label: "Payroll Module" },
  { src: "/images/alpine/performance.png",  label: "Performance Reviews" },
];

const MODULES = [
  { icon: LayoutDashboard, label: "Dashboard",        desc: "Headcount, attendance & hiring KPIs at a glance.",   status: "Live"  },
  { icon: Users,           label: "Employees",        desc: "Full directory with profiles, roles & status.",      status: "Live"  },
  { icon: Building2,       label: "Departments",      desc: "Teams, headcounts & department leads.",               status: "Live"  },
  { icon: Briefcase,       label: "Designations",     desc: "Job titles & role hierarchy management.",             status: "Live"  },
  { icon: CalendarCheck,   label: "Attendance",       desc: "Daily present / absent / late tracking.",             status: "Live"  },
  { icon: CalendarDays,    label: "Leave Management", desc: "Request submission & manager approval workflow.",     status: "Live"  },
  { icon: Wallet,          label: "Payroll",          desc: "Salary processing, payslips & payment status.",       status: "Live"  },
  { icon: TrendingUp,      label: "Performance",      desc: "Goal tracking, peer reviews & rating cycles.",        status: "Live"  },
  { icon: UserPlus,        label: "Onboarding",       desc: "New-hire checklists, tasks & welcome flows.",         status: "New"   },
  { icon: BarChart3,       label: "Charts",           desc: "Recharts line, bar, area, pie & composed charts.",   status: "Live"  },
  { icon: FileBarChart,    label: "Reports",          desc: "Exportable HR analytics & summary reports.",          status: "Soon"  },
  { icon: Settings,        label: "Settings",         desc: "Profile, role-based access & site preferences.",     status: "Live"  },
];

const FEATURES = [
  { icon: Code2,       title: "Clean, Typed Code",       desc: "Built with React 18 + TypeScript. Every component is typed and follows consistent naming conventions." },
  { icon: Palette,     title: "Pixel-Perfect UI",        desc: "Tailwind CSS utility classes with a custom design system — light & dark themes ship out of the box." },
  { icon: Smartphone,  title: "Fully Responsive",        desc: "Fluid grid layouts that look great on 4K monitors, laptops, tablets, and mobile devices." },
  { icon: Zap,         title: "Vite-Powered Builds",     desc: "Sub-second HMR during development and optimized production bundles under 400 KB." },
  { icon: BarChart3,   title: "Recharts Integration",    desc: "Line, area, bar, composed, and pie charts — all driven by realistic mock data you can swap in minutes." },
  { icon: Layers,      title: "Modular Architecture",    desc: "Feature-folder structure. Add, remove, or rearrange modules without touching unrelated code." },
];

const STATUS_STYLES: Record<string, string> = {
  Live: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  New:  "bg-indigo-500/10  text-indigo-600  dark:text-indigo-400  border-indigo-500/20",
  Soon: "bg-amber-500/10   text-amber-600   dark:text-amber-400   border-amber-500/20",
};

const TECH = [
  { name: "React 18",      color: "bg-cyan-500/10     text-cyan-600     dark:text-cyan-400"    },
  { name: "Vite",          color: "bg-violet-500/10   text-violet-600   dark:text-violet-400"  },
  { name: "TypeScript",    color: "bg-blue-500/10     text-blue-600     dark:text-blue-400"    },
  { name: "Tailwind CSS",  color: "bg-sky-500/10      text-sky-600      dark:text-sky-400"     },
  { name: "Recharts",      color: "bg-orange-500/10   text-orange-600   dark:text-orange-400"  },
  { name: "Lucide Icons",  color: "bg-rose-500/10     text-rose-600     dark:text-rose-400"    },
  { name: "React Router",  color: "bg-red-500/10      text-red-600      dark:text-red-400"     },
  { name: "React Hook Form","color": "bg-pink-500/10  text-pink-600     dark:text-pink-400"    },
];

const ALPINE_FAQ = [
  {
    q: "Can I use Alpine Admin in commercial projects?",
    a: "Yes. Alpine Admin React is released under the MIT License. You can use it in commercial products, client work, and white-labeled HRMS systems with no attribution required.",
  },
  {
    q: "Does it support dark mode?",
    a: "Yes. Light and dark themes ship out of the box, toggled via Tailwind's dark class strategy. Every component — including charts and data tables — adapts automatically.",
  },
  {
    q: "Is TypeScript required?",
    a: "The template is TypeScript-first. You can rename files to .jsx/.js and strip type annotations if you prefer plain JavaScript, but you'll give up autocomplete, inline type errors, and the refactoring safety net.",
  },
  {
    q: "Can I remove Recharts if I'm using a different chart library?",
    a: "Recharts is only used in the Charts module and Dashboard KPI widgets. Remove those pages and the npm package — every other module (Employees, Payroll, Attendance, etc.) is completely independent.",
  },
];

const STEPS = [
  { step: "01", title: "Download or Clone", code: "git clone https://github.com/codespanda/Alpine-Admin-React.git" },
  { step: "02", title: "Install dependencies", code: "npm install" },
  { step: "03", title: "Start the dev server", code: "npm run dev" },
  { step: "04", title: "Open in browser", code: "http://localhost:5173/dashboard" },
];

function GalleryImage({ src, label }: { src: string; label: string }) {
  return (
    <Reveal className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
      <div className="relative overflow-hidden" style={{ paddingBottom: "62.5%" }}>
        <img
          src={src}
          alt={`Alpine Admin React — ${label}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/images/alpine/dashboard.png";
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

export function AlpineAdminPage() {
  useEffect(() => {
    document.documentElement.dataset.template = "alpine";
    return () => { delete document.documentElement.dataset.template; };
  }, []);
  return (
    <>
      <Helmet>
        <title>Alpine Admin React — Free HR Dashboard Template | CodeSpanda</title>
        <meta name="description" content="Free React HR management dashboard — 30+ pages for employees, payroll, attendance and leave management. Built with Vite, Tailwind CSS and TypeScript." />
        <meta name="keywords" content="react hr management dashboard template, free react admin template, hr dashboard react, react admin dashboard, tailwind hr template, vite react dashboard" />
        <link rel="canonical" href="https://codespanda.com/templates/alpine-admin-react" />
        <meta property="og:title" content="Alpine Admin React — Free React HR Management Dashboard Template | CodeSpanda" />
        <meta property="og:description" content="Free React HR management dashboard — 30+ pages for employees, payroll, attendance and leave management. Built with Vite, Tailwind CSS and TypeScript." />
        <meta property="og:url" content="https://codespanda.com/templates/alpine-admin-react" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/alpine/dashboard.png" />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="900" />
        <meta property="og:image:alt" content="Alpine Admin React HR dashboard — free React HR management template" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Alpine Admin React — Free React HR Management Dashboard Template | CodeSpanda" />
        <meta name="twitter:description" content="Alpine Admin React is a free React HR management dashboard template with 30+ pages for employees, payroll, attendance and leave management. Built with Vite, Tailwind CSS and TypeScript." />
        <meta name="twitter:image" content="https://codespanda.com/images/alpine/dashboard.png" />
        <meta name="twitter:image:alt" content="Alpine Admin React HR dashboard — free React HR management template" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Alpine Admin React",
          "description": "Alpine Admin React is a free HR dashboard template with 30+ pages for employees, payroll, attendance and leave management. Built with React, Vite, Tailwind CSS and TypeScript.",
          "url": "https://codespanda.com/templates/Alpine-Admin-React",
          "image": "https://codespanda.com/images/alpine/dashboard.png",
          "brand": { "@type": "Brand", "name": "CodeSpanda" },
          "category": "Software > Templates > Admin Dashboard",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://codespanda.com/templates/alpine-admin-react"
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": ALPINE_FAQ.map((item) => ({
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
                <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white shadow [background:linear-gradient(to_right,hsl(var(--primary)),hsl(var(--primary-end,var(--primary)/0.72)))]">
                  New
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  React Admin Dashboard
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> Free
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Alpine Admin{" "}
                <span className="bg-clip-text text-transparent" style={{backgroundImage:"linear-gradient(to right,hsl(var(--primary)),hsl(var(--primary-end,var(--primary)/0.72))"}}>
                  React
                </span>
                <span className="block text-base font-medium text-muted-foreground mt-1.5">Free React HR Dashboard Template</span>
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                A complete HR dashboard template covering <strong className="font-semibold text-foreground">employees, payroll, attendance, and leave management</strong> across 30+ production-ready pages — built with React, Vite, Tailwind CSS, and TypeScript.
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
                  <a href="https://codespanda.github.io/Alpine-Admin-React/dashboard" target="_blank" rel="noreferrer noopener">
                    <ExternalLink className="h-4 w-4" /> Live Preview
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://github.com/codespanda/Alpine-Admin-React" target="_blank" rel="noreferrer noopener">
                    <Github className="h-4 w-4" /> View on GitHub
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://codespanda.github.io/Alpine-Admin-React/docs" target="_blank" rel="noreferrer noopener">
                    <BookOpen className="h-4 w-4" /> Documentation
                  </a>
                </Button>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative flex-1 lg:max-w-xl">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-600/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl shadow-indigo-500/10">
                <img
                  src="/images/alpine/dashboard.webp"
                  alt="Alpine Admin React dashboard preview"
                  width={1600}
                  height={812}
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
                <h2 className="text-2xl font-bold">What is Alpine Admin React?</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Alpine Admin React is a free, open-source <strong className="font-medium text-foreground">React HR management dashboard template</strong> built for developers who need a solid, real-world starting point. Instead of boilerplate UI components, you get a fully wired HR management application — real navigation, working page layouts, and realistic mock data across every module.
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Whether you're building a custom HR portal, an employee management system, or a white-label HRMS product, Alpine Admin gives you a production-ready foundation without starting from zero.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Who is it for?</h2>
                <ul className="mt-4 space-y-3">
                  {[
                    "Agencies building white-label HRMS products for clients",
                    "Teams replacing spreadsheets with a custom internal HR portal",
                    "Developers studying enterprise-grade React layout patterns",
                    "Startups that need a polished HR system without months of design work",
                    "Freelancers looking for a production-quality free template base",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
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
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Gallery</p>
              <h2 className="text-3xl font-bold">See it in action</h2>
              <p className="mt-3 text-muted-foreground">
                A tour of the key modules — every page is production-ready and fully responsive.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {GALLERY.map((img) => (
                <GalleryImage key={img.src} src={img.src} label={img.label} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" asChild>
                <a href="https://codespanda.github.io/Alpine-Admin-React/dashboard" target="_blank" rel="noreferrer noopener">
                  <Monitor className="h-4 w-4" /> Explore all
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="border-y border-border bg-secondary/20 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Why Alpine Admin</p>
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

        {/* ── Modules ── */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">What's included</p>
              <h2 className="text-3xl font-bold">12 fully built HR management modules</h2>
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
                    <mod.icon className="h-4.5 w-4.5 text-foreground" style={{ height: 18, width: 18 }} />
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

        {/* ── Getting Started ── */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Documentation</p>
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

            <div className="mt-10 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
              <h3 className="mb-3 font-bold">Project structure</h3>
              <pre className="overflow-x-auto font-mono text-sm leading-relaxed text-muted-foreground">{`src/
├── components/
│   ├── ui/          # Reusable shadcn/ui primitives
│   ├── layout/      # Sidebar, header, shell
│   └── charts/      # Recharts wrappers
├── pages/           # One file per route
│   ├── Dashboard.tsx
│   ├── Employees.tsx
│   ├── Attendance.tsx
│   └── ...
├── lib/
│   └── data.ts      # Mock data & types
└── hooks/           # Custom React hooks`}</pre>
            </div>

            <div className="mt-8 text-center">
              <Button variant="gradient" size="lg" asChild>
                <a href="https://codespanda.github.io/Alpine-Admin-React/docs" target="_blank" rel="noreferrer noopener">
                  <BookOpen className="h-4 w-4" /> Read the full docs
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-y border-border bg-secondary/20 px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">FAQ</p>
              <h2 className="text-3xl font-bold">Common questions</h2>
            </div>
            <div className="divide-y divide-border">
              {ALPINE_FAQ.map((item) => (
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
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl p-12 text-center text-white shadow-2xl shadow-primary/30 [background:linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary-end,var(--primary)/0.72)))]">
            <h2 className="text-3xl font-extrabold">Ready to build?</h2>
            <p className="mt-3 text-white/80">
              Alpine Admin React is completely free and open-source. Clone it, customize it, and ship it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-primary/10" asChild>
                <a href="https://codespanda.github.io/Alpine-Admin-React/dashboard" target="_blank" rel="noreferrer noopener">
                  <ExternalLink className="h-4 w-4" /> Live Preview
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <a href="https://github.com/codespanda/Alpine-Admin-React" target="_blank" rel="noreferrer noopener">
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
