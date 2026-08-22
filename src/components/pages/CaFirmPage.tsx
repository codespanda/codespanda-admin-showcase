import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Reveal, StaggerItem, Stagger } from "@/components/shared/Reveal";
import { useViewCount } from "@/hooks/use-view-count";
import {
  Eye,
  ExternalLink, ArrowLeft, Star, Github, Monitor,
  CheckCircle2, Menu, Users, Award, Building2, Briefcase,
  Factory, Tag, ListChecks, Quote, Mail, Newspaper, UserPlus,
  Phone, Clock, LayoutTemplate,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/sections/Navbar";

const Footer = lazy(() =>
  import("@/components/sections/Footer").then((m) => ({ default: m.Footer }))
);

const GITHUB_URL  = "https://github.com/codespanda/CA-Firm";
const PREVIEW_URL = "https://ca-firm.codespanda.com/";

const SECTIONS = [
  { icon: Menu,           label: "Header",             desc: "Sticky nav with active-link highlighting, mobile menu, Book Consultation CTA.",     status: "Live" },
  { icon: LayoutTemplate, label: "Hero",                desc: "Two-column hero with trust badges and a floating logo card.",                       status: "Live" },
  { icon: Users,          label: "Trusted By",          desc: "Auto-scrolling, pause-on-hover client logo marquee linking into testimonials.",      status: "Live" },
  { icon: Award,          label: "Why Choose Us",       desc: "Icon-led value list paired with a photo and a floating stat card.",                  status: "Live" },
  { icon: Building2,      label: "About",               desc: "Firm story with a four-stat counter row.",                                          status: "Live" },
  { icon: Briefcase,      label: "Services",            desc: "Six-card grid of core service offerings.",                                          status: "Live" },
  { icon: Factory,        label: "Industries",          desc: "Eight-industry icon grid, from real estate to non-profit.",                         status: "Live" },
  { icon: Tag,            label: "Engagement Models",   desc: "Four pricing/engagement cards with a “Popular” badge.",                    status: "Live" },
  { icon: ListChecks,     label: "Our Process",         desc: "Four-step numbered process timeline.",                                              status: "Live" },
  { icon: Quote,          label: "Testimonials",        desc: "Rotating client quotes with colorful client-logo chips.",                            status: "Live" },
  { icon: Mail,           label: "Newsletter",          desc: "Standalone subscribe panel with a working success state.",                          status: "Live" },
  { icon: Newspaper,      label: "Insights",            desc: "Blog / resources preview grid.",                                                    status: "Live" },
  { icon: LayoutTemplate, label: "Footer",              desc: "CTA band, sitemap columns, masked contact number, social links.",                   status: "Live" },
  { icon: UserPlus,       label: "Careers Page",        desc: "Values, benefits grid, open-roles list, general-application form.",                 status: "Live" },
  { icon: Phone,          label: "Contact Page",        desc: "Info cards, inquiry form, office-location panel, FAQ accordion.",                    status: "Live" },
];

const FEATURES = [
  { icon: LayoutTemplate, title: "Component-Driven",    desc: "Every section lives in its own file under sections/ — reorder, remove, or restyle independently." },
  { icon: Briefcase,      title: "shadcn/ui Primitives", desc: "Button, Card, Input, Badge and Accordion, themed to the navy/gold palette via CSS variables." },
  { icon: LayoutTemplate, title: "Real Routed Pages",    desc: "Home, Careers and Contact as genuine React Router routes, with hash-anchor scrolling back to home sections." },
  { icon: CheckCircle2,   title: "Real Interactivity",   desc: "Working forms with success states, an accessible auto-pausing marquee, a masked phone number, active nav states." },
  { icon: Monitor,        title: "Mobile-First",         desc: "Every section reflows cleanly from a 375px phone up to a 4K desktop." },
  { icon: Github,         title: "GitHub Pages Ready",   desc: "Ships with the SPA 404-redirect trick, so client-side routes work correctly — including under a custom domain." },
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
  { name: "React Router",    color: "bg-red-500/10     text-red-600     dark:text-red-400"     },
  { name: "lucide-react",    color: "bg-rose-500/10    text-rose-600    dark:text-rose-400"    },
];

const FAQ = [
  {
    q: "Can I use this for a commercial website?",
    a: "Yes — it's MIT licensed. Use it for client work, your own firm's site, or any commercial project, no attribution required.",
  },
  {
    q: "Does it work for firms other than chartered accountants?",
    a: "Easily. Section content is data-driven — swap the copy, services list and industries grid and it adapts to legal, consulting or financial-advisory firms.",
  },
  {
    q: "Is there a real backend?",
    a: "No — it's a UI-only template. The contact and newsletter forms manage their own state locally and show a success message on submit; wiring them to a real API is left to you.",
  },
  {
    q: "Why Tailwind CSS v4?",
    a: "The template is built on Tailwind v4's CSS-first configuration and Vite. For v3, a find-and-replace on the CSS-variable tokens in index.css will get you most of the way there.",
  },
];

const STEPS = [
  { step: "01", title: "Clone the repo",       code: "git clone https://github.com/codespanda/CA-Firm.git" },
  { step: "02", title: "Install dependencies", code: "npm install" },
  { step: "03", title: "Start the dev server", code: "npm run dev" },
  { step: "04", title: "Open in browser",      code: "http://localhost:5173/" },
];

/** CSS-only mock browser preview — no real screenshot exists yet, so this
 * mirrors the template's own navy/gold hero instead of a fake/broken image. */
function HeroMock() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl shadow-amber-500/10 ring-1 ring-amber-500/10">
      <div className="flex items-center gap-1.5 bg-[#08122a] px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 flex-1 rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/50">
          ca-firm.codespanda.com
        </span>
      </div>
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f2148] to-[#0a1730] px-6 py-8">
        <div className="absolute -right-14 -top-16 h-56 w-56 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full border border-amber-400 text-[9px] font-bold text-amber-400">CA</span>
            <span className="text-[10px] tracking-widest text-white/75">YOUR CA FIRM</span>
          </div>
          <div className="flex gap-2.5">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="h-[3px] w-5 rounded-full bg-white/15" />
            ))}
          </div>
        </div>
        <div className="relative mt-9 space-y-2.5">
          <div className="h-3.5 w-[82%] rounded bg-white/90" />
          <div className="h-3.5 w-[68%] rounded bg-white/90" />
          <div className="h-3.5 w-[58%] rounded bg-amber-400" />
        </div>
        <div className="relative mt-4 space-y-1.5">
          <span className="block h-1.5 w-[90%] rounded-full bg-white/25" />
          <span className="block h-1.5 w-[70%] rounded-full bg-white/25" />
        </div>
        <div className="relative mt-5 flex gap-2.5">
          <span className="h-6 w-24 rounded bg-amber-400" />
          <span className="h-6 w-24 rounded border border-white/20" />
        </div>
        <div className="relative mt-7 grid grid-cols-4 gap-2.5 text-center">
          {[["500+", "CLIENTS"], ["12+", "YEARS"], ["1000+", "PROJECTS"], ["98%", "RATING"]].map(([n, l]) => (
            <div key={l}>
              <p className="font-serif text-sm font-bold text-amber-400">{n}</p>
              <p className="mt-1 text-[6.5px] tracking-wide text-white/45">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CaFirmPage() {
  const views = useViewCount("tpl-ca-firm", 0);
  useEffect(() => {
    document.documentElement.dataset.template = "cafirm";
    return () => { delete document.documentElement.dataset.template; };
  }, []);

  return (
    <>
      <Helmet>
        <title>Your CA Firm — Financial &amp; Advisory Landing Page | CodesPanda</title>
        <meta name="description" content="Your CA Firm is a free React template for chartered accountants — services, industries, engagement models, testimonials, Careers and Contact pages in a navy-and-gold design." />
        <meta name="keywords" content="react ca firm template, free chartered accountant website, financial advisory landing page react, tailwind css v4 template, shadcn ui react template, accounting firm website template" />
        <link rel="canonical" href="https://codespanda.com/templates/ca-firm" />
        <meta property="og:title" content="Your CA Firm — Financial & Advisory Landing Page | CodesPanda" />
        <meta property="og:description" content="A free React template for chartered accountants and financial advisory firms — services, industries, engagement models, testimonials, Careers and Contact pages." />
        <meta property="og:url" content="https://codespanda.com/templates/ca-firm" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your CA Firm — Financial & Advisory Landing Page | CodesPanda" />
        <meta name="twitter:description" content="A free React template for chartered accountants and financial advisory firms — services, industries, engagement models, testimonials, Careers and Contact pages." />
        <meta name="twitter:image" content="https://codespanda.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Your CA Firm",
          "description": "A free React template for chartered accountancy and financial advisory practices — services, industries, engagement models, testimonials, and dedicated Careers and Contact pages.",
          "url": "https://codespanda.com/templates/ca-firm",
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
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-3 py-1 text-xs font-semibold text-white shadow">
                  New
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  Financial &amp; Advisory Landing Page
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> Free
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  <Eye className="h-3.5 w-3.5" /> {views.toLocaleString()} views
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Your{" "}
                <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                  CA Firm
                </span>
                <span className="block text-base font-medium text-muted-foreground mt-1.5">Free React Template for Chartered Accountants</span>
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                A complete <strong className="font-semibold text-foreground">marketing site for a chartered accountancy or financial advisory practice</strong> — a two-column hero, an auto-scrolling client marquee, service and industry grids, a four-step process, testimonials, and dedicated Careers and Contact pages, all in a <strong className="font-semibold text-foreground">navy-and-gold system</strong> built for trust and precision.
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
                  <Clock className="h-3.5 w-3.5" /> Updated August 2026
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

            {/* Hero preview */}
            <Reveal className="relative flex-1 lg:max-w-xl">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 blur-2xl" />
              <div className="relative">
                <HeroMock />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Overview */}
        <section className="border-y border-border bg-secondary/20 px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-2xl font-bold">What is Your CA Firm?</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Your CA Firm is a free, open-source <strong className="font-medium text-foreground">React template built specifically for chartered accountants</strong>, tax consultants, audit practices and financial advisory firms. It ships a full multi-page site — home, careers, and contact — with every section built as an independent, swappable component.
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Built with React 19, Vite, Tailwind CSS v4 and shadcn/ui, every section is production-ready: real form validation and success states, a keyboard-accessible auto-pausing marquee, and a layout that holds together from a 375px phone to a 4K desktop.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Who is it for?</h2>
                <ul className="mt-4 space-y-3">
                  {[
                    "Developers building a site for a CA firm or accounting practice",
                    "Agencies delivering professional-services sites for clients",
                    "Freelancers who want a polished starter instead of a blank canvas",
                    "Anyone wanting a reference for Tailwind v4 + shadcn/ui + React Router",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
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
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-500">What's included</p>
              <h2 className="text-3xl font-bold">{SECTIONS.length} fully built sections</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Every section ships with working layout, real copy, and working interactivity — nothing is a placeholder.
              </p>
            </div>
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SECTIONS.map((s) => (
                <StaggerItem key={s.label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                    <s.icon className="h-5 w-5 text-amber-500" />
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
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-500">Why This Template</p>
              <h2 className="text-3xl font-bold">Built to be extended, not fought</h2>
            </div>
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <StaggerItem key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                    <f.icon className="h-5 w-5 text-amber-500" />
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
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-500">Tech Stack</p>
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
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-500">Get Started</p>
              <h2 className="text-3xl font-bold">Running in 2 minutes</h2>
              <p className="mt-3 text-muted-foreground">Node.js 18+ required. No paid tools, no account sign-ups.</p>
            </div>
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s) => (
                <StaggerItem key={s.step} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <span className="text-sm font-bold text-amber-500">{s.step}</span>
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
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-500">FAQ</p>
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
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2148] to-[#0a1730] p-12 text-center text-white shadow-2xl shadow-amber-500/10">
            <h2 className="text-3xl font-extrabold">Ready to build your firm's website?</h2>
            <p className="mt-3 text-white/70">
              Your CA Firm is completely free and open-source. Clone it, make it yours, and ship it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-amber-400 text-[#0a1730] hover:bg-amber-300" asChild>
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
