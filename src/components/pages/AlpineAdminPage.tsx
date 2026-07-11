import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

/* ── image base URL ── */
const RAW = "https://raw.githubusercontent.com/codespanda/Alpine-Admin-React/main/public";

const GALLERY = [
  { src: `${RAW}/dashboard.png`,    label: "Main Dashboard" },
  { src: `${RAW}/employees.png`,    label: "Employee Directory" },
  { src: `${RAW}/attendance.png`,   label: "Attendance Tracker" },
  { src: `${RAW}/leave.png`,        label: "Leave Management" },
  { src: `${RAW}/payroll.png`,      label: "Payroll Module" },
  { src: `${RAW}/performance.png`,  label: "Performance Reviews" },
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

const STEPS = [
  { step: "01", title: "Download or Clone", code: "git clone https://github.com/codespanda/Alpine-Admin-React.git" },
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
      className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
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

export function AlpineAdminPage() {
  return (
    <>
      <Helmet>
        <title>Alpine Admin React — Free HR Dashboard Template | CodeSpanda</title>
        <meta name="description" content="Free, open-source React admin dashboard with 30+ pages covering HR, payroll, attendance, leave management and performance. Built with Vite, Tailwind CSS and TypeScript." />
        <link rel="canonical" href="https://codespanda.com/templates/Alpine-Admin-React" />
        <meta property="og:title" content="Alpine Admin React — Free HR Dashboard Template | CodeSpanda" />
        <meta property="og:description" content="Free React admin dashboard with 30+ pages. HR, payroll, attendance, leave management and performance — built with Vite, Tailwind CSS and TypeScript." />
        <meta property="og:url" content="https://codespanda.com/templates/Alpine-Admin-React" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Alpine Admin React — Free HR Dashboard Template | CodeSpanda" />
        <meta name="twitter:description" content="Free React admin dashboard with 30+ pages. HR, payroll, attendance, leave management and performance — built with Vite, Tailwind CSS and TypeScript." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Alpine Admin React",
          "description": "Free, open-source HR admin dashboard template with 30+ pages covering employees, payroll, attendance, leave management and performance. Built with React, Vite, Tailwind CSS and TypeScript.",
          "url": "https://codespanda.com/templates/Alpine-Admin-React",
          "image": "https://raw.githubusercontent.com/codespanda/Alpine-Admin-React/main/public/dashboard.png",
          "brand": { "@type": "Brand", "name": "CodeSpanda" },
          "category": "Software > Templates > Admin Dashboard",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://codespanda.com/templates/Alpine-Admin-React"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "1",
            "bestRating": "5",
            "worstRating": "1"
          }
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
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1 text-xs font-semibold text-white shadow">
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
                <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  React
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                A comprehensive HR admin dashboard with <strong className="font-semibold text-foreground">30+ production-ready pages</strong> — employees, payroll, attendance, leave, performance, and reporting — all built with the modern React ecosystem.
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
                  src={`${RAW}/dashboard.png`}
                  alt="Alpine Admin React dashboard preview"
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
                <h2 className="text-2xl font-bold">What is Alpine Admin React?</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Alpine Admin React is a free, open-source HR management dashboard template designed for developers who need a <strong className="font-medium text-foreground">solid, real-world starting point</strong> for their next admin project. Instead of boilerplate UI components, you get a fully wired application with real navigation, working page layouts, and realistic mock data — everything you'd expect in a production-grade internal tool.
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Whether you're building a custom HR portal, an employee management system, or using it as a reference implementation for your own dashboard, Alpine Admin gives you a clean foundation to build on without starting from zero.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Who is it for?</h2>
                <ul className="mt-4 space-y-3">
                  {[
                    "Frontend developers building internal admin tools",
                    "Startups launching their first HR or operations portal",
                    "Freelancers looking for a premium-quality free template",
                    "Teams prototyping before committing to a design system",
                    "Developers learning modern React patterns in a real app",
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
                  <Monitor className="h-4 w-4" /> Explore all 30+ pages
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
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <f.icon className="h-5 w-5 text-primary" />
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
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">What's included</p>
              <h2 className="text-3xl font-bold">12 fully built modules</h2>
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
                  <span className="shrink-0 text-3xl font-black text-primary/20 leading-none">{s.step}</span>
                  <div className="flex-1 min-w-0">
                    <p className="mb-2 font-semibold">{s.title}</p>
                    <code className="block overflow-x-auto rounded-lg bg-secondary px-4 py-2.5 font-mono text-sm text-foreground">
                      {s.code}
                    </code>
                  </div>
                </motion.div>
              ))}
            </div>

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

        {/* ── CTA ── */}
        <section className="px-4 pb-24">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-12 text-center text-white shadow-2xl shadow-indigo-500/30">
            <h2 className="text-3xl font-extrabold">Ready to build?</h2>
            <p className="mt-3 text-indigo-100">
              Alpine Admin React is completely free and open-source. Clone it, customize it, and ship it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50" asChild>
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
