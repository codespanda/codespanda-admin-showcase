import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Reveal, StaggerItem, Stagger } from "@/components/shared/Reveal";
import { useViewCount } from "@/hooks/use-view-count";
import {
  Eye,
  ExternalLink, ArrowLeft, Star, Github, Monitor,
  CheckCircle2, Menu, LayoutTemplate, Sofa, Building2,
  ListChecks, Users, Quote, Newspaper, Megaphone,
  Tag, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/sections/Navbar";

const Footer = lazy(() =>
  import("@/components/sections/Footer").then((m) => ({ default: m.Footer }))
);

const GITHUB_URL  = "https://github.com/codespanda/interio";
const PREVIEW_URL = "https://interio.codespanda.com/";

const SECTIONS = [
  { icon: Menu,           label: "Header",              desc: "Sticky nav with active-link highlighting, mobile menu, Book a Consultation CTA.",     status: "Live" },
  { icon: LayoutTemplate, label: "Hero",                 desc: "Two-column hero with a project photo, trust badges, and a dual CTA pair.",             status: "Live" },
  { icon: Sofa,           label: "Services",             desc: "Five-card grid — residential, commercial, modular kitchen, turnkey, and space planning.", status: "Live" },
  { icon: Building2,      label: "Portfolio",            desc: "Filterable project grid across residential and commercial work.",                       status: "Live" },
  { icon: ListChecks,     label: "Process",              desc: "Five-step numbered timeline from consultation to handover.",                            status: "Live" },
  { icon: Users,          label: "About",                desc: "Studio story with a four-stat counter row.",                                            status: "Live" },
  { icon: Quote,          label: "Testimonials",         desc: "Three-card client quote grid with avatars and roles.",                                  status: "Live" },
  { icon: Newspaper,      label: "Blog / Client Diaries", desc: "Article preview grid for design trends, tips, and guides.",                             status: "Live" },
  { icon: Megaphone,      label: "Consultation CTA",     desc: "Closing enquiry band with a direct phone number.",                                       status: "Live" },
  { icon: LayoutTemplate, label: "Footer",               desc: "Sitemap columns, contact details, and social links.",                                   status: "Live" },
];

const FEATURES = [
  { icon: LayoutTemplate, title: "Component-Driven",    desc: "Every section lives in its own file under components/site/ — reorder, remove, or restyle independently." },
  { icon: Sofa,           title: "shadcn/ui Primitives", desc: "Button, Card, Badge, Input and Avatar, themed to the cream/terracotta palette via CSS variables." },
  { icon: CheckCircle2,   title: "Real Interactivity",   desc: "Working nav active-states, hover-driven portfolio cards, and an accessible mobile menu." },
  { icon: Monitor,        title: "Mobile-First",         desc: "Every section reflows cleanly from a 375px phone up to a 4K desktop." },
  { icon: Github,         title: "TypeScript Throughout", desc: "Fully typed components, so the editor catches mistakes before your users do." },
  { icon: Building2,      title: "Editorial Typography", desc: "A serif display face paired with clean sans body text for a premium studio feel." },
];

const STATUS_STYLES: Record<string, string> = {
  Live: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

const TECH = [
  { name: "React 19",        color: "bg-cyan-500/10    text-cyan-600    dark:text-cyan-400"    },
  { name: "TypeScript",      color: "bg-blue-500/10    text-blue-600    dark:text-blue-400"    },
  { name: "Vite",            color: "bg-violet-500/10  text-violet-600  dark:text-violet-400"  },
  { name: "Tailwind CSS v4", color: "bg-sky-500/10     text-sky-600     dark:text-sky-400"     },
  { name: "shadcn/ui",       color: "bg-slate-500/10   text-slate-600   dark:text-slate-300"   },
  { name: "lucide-react",    color: "bg-rose-500/10    text-rose-600    dark:text-rose-400"    },
];

const FAQ = [
  {
    q: "Can I use this for a commercial website?",
    a: "Yes — it's MIT licensed. Use it for client work, your own studio's site, or any commercial project, no attribution required.",
  },
  {
    q: "Does it only work for interior design studios?",
    a: "Easily adapts to architecture firms, furniture brands, renovation contractors, and other design-led businesses — the content is data-driven, so swap the services, portfolio and process steps to match.",
  },
  {
    q: "Is there a real backend or booking system?",
    a: "No — it's a UI-only template. The Book a Consultation CTAs are presentational; wiring them to a real form handler, calendar tool, or CRM is left to you.",
  },
  {
    q: "Why Tailwind CSS v4?",
    a: "The template is built on Tailwind v4's CSS-first configuration and Vite. For v3, a find-and-replace on the CSS-variable tokens in index.css will get you most of the way there.",
  },
];

const STEPS = [
  { step: "01", title: "Clone the repo",       code: "git clone https://github.com/codespanda/interio.git" },
  { step: "02", title: "Install dependencies", code: "npm install" },
  { step: "03", title: "Start the dev server", code: "npm run dev" },
  { step: "04", title: "Open in browser",      code: "http://localhost:5173/" },
];

export function InterioPage() {
  const views = useViewCount("tpl-interio", 0);
  useEffect(() => {
    document.documentElement.dataset.template = "interio";
    return () => { delete document.documentElement.dataset.template; };
  }, []);

  return (
    <>
      <Helmet>
        <title>Interio — Free Interior Design Studio Website Template | CodesPanda</title>
        <meta name="description" content="A free React template for interior design studios — services, portfolio, process, testimonials, and a blog, in a warm cream-and-terracotta editorial design." />
        <meta name="keywords" content="react interior design template, free interior design website, interior design studio landing page react, tailwind css v4 template, shadcn ui react template, portfolio website template" />
        <link rel="canonical" href="https://codespanda.com/templates/interio" />
        <meta property="og:title" content="Interio — Free Interior Design Studio Website Template | CodesPanda" />
        <meta property="og:description" content="A free React template for interior design studios — services, portfolio, process, testimonials, and a blog, in a warm cream-and-terracotta editorial design." />
        <meta property="og:url" content="https://codespanda.com/templates/interio" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Interio — Free Interior Design Studio Website Template | CodesPanda" />
        <meta name="twitter:description" content="A free React template for interior design studios — services, portfolio, process, testimonials, and a blog." />
        <meta name="twitter:image" content="https://codespanda.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Interio",
          "description": "A free React template for interior design studios — services, portfolio, process, testimonials, and a blog.",
          "url": "https://codespanda.com/templates/interio",
          "image": "https://codespanda.com/og-image.png",
          "brand": { "@type": "Brand", "name": "CodesPanda" },
          "category": "Software > Templates > Landing Page",
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
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 px-3 py-1 text-xs font-semibold text-white shadow">
                  New
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  Interior Design / Portfolio Landing Page
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> Free
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  <Eye className="h-3.5 w-3.5" /> {views.toLocaleString()} views
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                  Interio
                </span>{" "}
                Design Studio
                <span className="block text-base font-medium text-muted-foreground mt-1.5">Free React Template for Interior Design Studios</span>
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                A complete <strong className="font-semibold text-foreground">marketing and portfolio site for an interior design studio</strong> — a two-column hero, a services grid, a filterable project portfolio, a five-step process timeline, testimonials, and a blog, all in a <strong className="font-semibold text-foreground">warm cream-and-terracotta editorial design</strong>.
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
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-orange-500/20 to-amber-600/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl shadow-orange-500/10 ring-1 ring-orange-500/10">
                <img
                  src="/images/interio/hero.webp"
                  alt="Interio Design Studio — hero preview"
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
                    interio.codespanda.com
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
                <h2 className="text-2xl font-bold">What is Interio?</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Interio is a free, open-source <strong className="font-medium text-foreground">React template built for interior design studios</strong>, architecture firms, and other design-led businesses. It ships a complete single-page marketing site — hero, services, portfolio, process, and blog — with every section built as an independent, swappable component.
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Built with React 19, TypeScript, Vite, Tailwind CSS v4 and shadcn/ui, every section is production-ready: hover-driven portfolio cards, a numbered process timeline, and a layout that holds together from a 375px phone to a 4K desktop.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Who is it for?</h2>
                <ul className="mt-4 space-y-3">
                  {[
                    "Developers building a site for an interior design or architecture studio",
                    "Agencies delivering portfolio sites for design-led clients",
                    "Freelancers who want a polished starter instead of a blank canvas",
                    "Anyone wanting a reference for Tailwind v4 + shadcn/ui + TypeScript",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
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
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-500">What's included</p>
              <h2 className="text-3xl font-bold">{SECTIONS.length} fully built sections</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Every section ships with working layout, real copy, and working interactivity — nothing is a placeholder.
              </p>
            </div>
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SECTIONS.map((s) => (
                <StaggerItem key={s.label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
                    <s.icon className="h-5 w-5 text-orange-500" />
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
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-500">Why This Template</p>
              <h2 className="text-3xl font-bold">Built to be extended, not fought</h2>
            </div>
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <StaggerItem key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                    <f.icon className="h-5 w-5 text-orange-500" />
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
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-500">Tech Stack</p>
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
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-500">Get Started</p>
              <h2 className="text-3xl font-bold">Running in 2 minutes</h2>
              <p className="mt-3 text-muted-foreground">Node.js 18+ required. No paid tools, no account sign-ups.</p>
            </div>
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s) => (
                <StaggerItem key={s.step} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <span className="text-sm font-bold text-orange-500">{s.step}</span>
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
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-500">FAQ</p>
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
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#2b2420] to-[#1a1512] p-12 text-center text-white shadow-2xl shadow-orange-500/10">
            <h2 className="text-3xl font-extrabold">Ready to build your studio's website?</h2>
            <p className="mt-3 text-white/70">
              Interio is completely free and open-source. Clone it, make it yours, and ship it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-orange-500 text-white hover:bg-orange-400" asChild>
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
