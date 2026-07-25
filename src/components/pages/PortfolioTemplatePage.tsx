import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Reveal, StaggerItem, Stagger } from "@/components/shared/Reveal";
import {
  ExternalLink, ArrowLeft, Star, Github, BookOpen, Monitor,
  CheckCircle2, Tag, Clock,
  User, Briefcase, Mail, Code2,
  Zap, Palette, Smartphone, Layers, Globe, MousePointer2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/sections/Navbar";

const Footer = lazy(() =>
  import("@/components/sections/Footer").then((m) => ({ default: m.Footer }))
);

const LIVE = "https://codespanda.github.io/portfolio";

const GALLERY = [
  { src: "/images/portfolio/portfolio.jpg",  label: "Hero Section" },
  { src: "/images/portfolio/about.jpg",      label: "About Me" },
  { src: "/images/portfolio/projects.jpg",   label: "Projects Showcase" },
  { src: "/images/portfolio/skills.jpg",     label: "Skills & Tech Stack" },
  { src: "/images/portfolio/contact.jpg",    label: "Contact Form" },
  { src: "/images/portfolio/footer.jpg",     label: "Footer" },
];

const SECTIONS = [
  { icon: User,         label: "Hero",          desc: "Animated greeting, tagline, and call-to-action buttons with a profile image.",       status: "Live" },
  { icon: Briefcase,    label: "About",         desc: "Personal bio, experience timeline, and a downloadable resume link.",                  status: "Live" },
  { icon: Code2,        label: "Projects",      desc: "Project cards with tech tags, live demo, and GitHub links.",                         status: "Live" },
  { icon: Layers,       label: "Skills",        desc: "Tech stack grid showcasing languages, frameworks, and tools.",                        status: "Live" },
  { icon: Mail,         label: "Contact",       desc: "Functional contact form with validation and social media links.",                     status: "Live" },
  { icon: Globe,        label: "Footer",        desc: "Clean footer with social links and copyright info.",                                  status: "Live" },
];

const FEATURES = [
  { icon: Palette,      title: "Modern Design",        desc: "Clean, minimal aesthetic with smooth gradients and generous whitespace — designed to impress recruiters and clients." },
  { icon: Smartphone,   title: "Fully Responsive",     desc: "Looks flawless on every screen size — from mobile to widescreen monitors." },
  { icon: Zap,          title: "Fast Performance",     desc: "Vite-powered build with lazy loading. Scores high on Lighthouse out of the box." },
  { icon: MousePointer2,title: "Smooth Animations",    desc: "Framer Motion scroll-triggered animations and hover effects give the portfolio a premium feel." },
  { icon: Code2,        title: "Easy to Customise",    desc: "All content is in one data file. Change your name, projects, and skills without touching any component code." },
  { icon: Globe,        title: "Deploy Anywhere",      desc: "Works on GitHub Pages, Vercel, Netlify, or any static host. One command to build and deploy." },
];

const TECH = [
  { name: "React 18",      color: "bg-cyan-500/10    text-cyan-600    dark:text-cyan-400"   },
  { name: "Vite",          color: "bg-violet-500/10  text-violet-600  dark:text-violet-400" },
  { name: "Tailwind CSS",  color: "bg-sky-500/10     text-sky-600     dark:text-sky-400"    },
  { name: "Framer Motion", color: "bg-pink-500/10    text-pink-600    dark:text-pink-400"   },
  { name: "React Router",  color: "bg-red-500/10     text-red-600     dark:text-red-400"    },
  { name: "Lucide Icons",  color: "bg-rose-500/10    text-rose-600    dark:text-rose-400"   },
];

const PORTFOLIO_FAQ = [
  {
    q: "Can I use this template for client work or commercial sites?",
    a: "Yes. The MIT License covers commercial use. Build your own portfolio, a client's personal site, or a freelancer's landing page — no restrictions.",
  },
  {
    q: "Do I need to know React to customise it?",
    a: "Basic React familiarity helps for structural changes, but all personalizable content — your name, projects, skills, and social links — lives in a single file: src/data/portfolio.js. If you can edit a JavaScript object, you can make it your own.",
  },
  {
    q: "How do I deploy it?",
    a: "Run `npm run build` to produce a static dist/ folder, then upload it to GitHub Pages, Vercel, or Netlify. A GitHub Actions workflow for automated Pages deployment is included in the repo.",
  },
  {
    q: "Can I add more sections?",
    a: "Yes. Each section is a standalone React component in src/components/. Add a new component, import it in App.jsx, and add your content to portfolio.js. The scroll-reveal animations will pick it up automatically.",
  },
];

const STEPS = [
  { step: "01", title: "Download or Clone", code: "git clone https://github.com/codespanda/portfolio.git" },
  { step: "02", title: "Install dependencies", code: "npm install" },
  { step: "03", title: "Start the dev server", code: "npm run dev" },
  { step: "04", title: "Customise your content", code: "# Edit src/data/portfolio.js with your info" },
];

const STATUS_STYLES: Record<string, string> = {
  Live: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  New:  "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  Soon: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

function GalleryImage({ src, label }: { src: string; label: string }) {
  return (
    <Reveal className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-md hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300">
      <div className="relative overflow-hidden" style={{ paddingBottom: "62.5%" }}>
        <img
          src={src}
          alt={label}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/images/portfolio/portfolio.jpg";
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

export function PortfolioTemplatePage() {
  useEffect(() => {
    document.documentElement.dataset.template = "portfolio-template";
    return () => { delete document.documentElement.dataset.template; };
  }, []);
  return (
    <>
      <Helmet>
        <title>Free React Portfolio Template for Developers &amp; Designers | CodeSpanda</title>
        <meta name="description" content="A clean, fast-loading React portfolio template built with Vite and Tailwind CSS. Showcase your work and experience — free to download and customize." />
        <meta name="keywords" content="free react portfolio template, react portfolio website, vite portfolio template, tailwind css portfolio, react developer portfolio, free portfolio template" />
        <link rel="canonical" href="https://codespanda.com/templates/portfolio-template" />
        <meta property="og:title" content="Free React Portfolio Template for Developers &amp; Designers | CodeSpanda" />
        <meta property="og:description" content="A clean, fast-loading React portfolio template built with Vite and Tailwind CSS. Showcase your work and experience — free to download and customize." />
        <meta property="og:url" content="https://codespanda.com/templates/portfolio-template" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/portfolio/portfolio.jpg" />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="900" />
        <meta property="og:image:alt" content="React portfolio template hero section — free developer portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free React Portfolio Template for Developers &amp; Designers | CodeSpanda" />
        <meta name="twitter:description" content="A clean, fast-loading React portfolio template built with Vite and Tailwind CSS. Showcase your work and experience — free to download and customize." />
        <meta name="twitter:image" content="https://codespanda.com/images/portfolio/portfolio.jpg" />
        <meta name="twitter:image:alt" content="React portfolio template hero section — free developer portfolio" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Portfolio Template",
          "description": "A clean, fast-loading React portfolio template built with Vite and Tailwind CSS. Showcase your work and experience — free to download and customize.",
          "url": "https://codespanda.com/templates/portfolio-template",
          "image": "https://codespanda.com/images/portfolio/portfolio.jpg",
          "brand": { "@type": "Brand", "name": "CodeSpanda" },
          "category": "Software > Templates > Portfolio",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://codespanda.com/templates/portfolio-template"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "1",
            "bestRating": "5",
            "worstRating": "1"
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": PORTFOLIO_FAQ.map((item) => ({
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
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 px-3 py-1 text-xs font-semibold text-white shadow">
                  New
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  Portfolio
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> Free
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Portfolio{" "}
                <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                  Template
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                A <strong className="font-semibold text-foreground">fast-loading React portfolio template</strong> for developers and designers — showcase your work and experience in minutes. Built with Vite and Tailwind CSS, free to download and customize.
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
                  className="bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 shadow-lg shadow-rose-500/20"
                  asChild
                >
                  <a href={LIVE} target="_blank" rel="noreferrer noopener">
                    <ExternalLink className="h-4 w-4" /> Live Preview
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://github.com/codespanda/portfolio" target="_blank" rel="noreferrer noopener">
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
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-rose-500/20 to-pink-600/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl shadow-rose-500/10">
                <img
                  src="/images/portfolio/portfolio.jpg"
                  alt="Portfolio Template preview"
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
                <h2 className="text-2xl font-bold">What is the Portfolio Template?</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  The Portfolio Template is a free, open-source personal website starter built for developers, designers, and creatives who want to make a strong first impression online. It covers everything you need — a hero introduction, project showcase, skills section, and contact form — in a <strong className="font-medium text-foreground">single, polished package</strong>.
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  All your content lives in a single data file. Update your name, bio, projects, and social links in minutes — no deep knowledge of the codebase required. Just clone, edit, and deploy.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Who is it for?</h2>
                <ul className="mt-4 space-y-3">
                  {[
                    "Frontend developers looking for a professional personal site",
                    "Designers wanting to showcase their portfolio online",
                    "Freelancers who need a clean client-facing website",
                    "Students building their first portfolio for job applications",
                    "Anyone who wants a fast, modern site without building from scratch",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
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
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-rose-500">Gallery</p>
              <h2 className="text-3xl font-bold">See it in action</h2>
              <p className="mt-3 text-muted-foreground">
                A tour of every section — fully responsive and ready to make an impression.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {GALLERY.map((img) => (
                <GalleryImage key={img.src} src={img.src} label={img.label} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" asChild>
                <a href={LIVE} target="_blank" rel="noreferrer noopener">
                  <Monitor className="h-4 w-4" /> View live site
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="border-y border-border bg-secondary/20 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-rose-500">Why this template</p>
              <h2 className="text-3xl font-bold">Everything you need, nothing you don't</h2>
            </div>
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <StaggerItem
                  key={f.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10">
                    <f.icon className="h-5 w-5 text-rose-500" />
                  </div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ── Sections ── */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-rose-500">What's included</p>
              <h2 className="text-3xl font-bold">6 polished sections</h2>
              <p className="mt-3 text-muted-foreground">
                Every section is animated, responsive, and ready to personalise with your own content.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SECTIONS.map((s) => (
                <div
                  key={s.label}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary">
                    <s.icon className="text-foreground" style={{ height: 18, width: 18 }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{s.label}</span>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[s.status]}`}>
                        {s.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
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
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-rose-500">Tech Stack</p>
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
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-rose-500">Documentation</p>
              <h2 className="text-3xl font-bold">Up and running in minutes</h2>
              <p className="mt-3 text-muted-foreground">
                Node.js 18+ required. No paid tools, no accounts needed.
              </p>
            </div>

            <Stagger className="space-y-4">
              {STEPS.map((s) => (
                <StaggerItem
                  key={s.step}
                  className="flex items-start gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <span className="shrink-0 text-3xl font-black text-rose-500/20 leading-none">{s.step}</span>
                  <div className="flex-1 min-w-0">
                    <p className="mb-2 font-semibold">{s.title}</p>
                    <code className="block overflow-x-auto rounded-lg bg-secondary px-4 py-2.5 font-mono text-sm text-foreground">
                      {s.code}
                    </code>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="mt-10 rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6">
              <h3 className="mb-3 font-bold">Project structure</h3>
              <pre className="overflow-x-auto font-mono text-sm leading-relaxed text-muted-foreground">{`src/
├── components/
│   ├── Hero.jsx         # Animated intro section
│   ├── About.jsx        # Bio and timeline
│   ├── Projects.jsx     # Project cards grid
│   ├── Skills.jsx       # Tech stack grid
│   ├── Contact.jsx      # Contact form
│   └── Footer.jsx       # Footer with social links
├── data/
│   └── portfolio.js     # ← Edit this file with your info
└── App.jsx              # Root component & routing`}</pre>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-3 font-bold">Customise your content</h3>
              <p className="mb-4 text-sm text-muted-foreground">All personal data is centralised in <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">src/data/portfolio.js</code>. Edit just this one file:</p>
              <pre className="overflow-x-auto font-mono text-sm leading-relaxed text-muted-foreground">{`export const portfolio = {
  name: "Your Name",
  title: "Frontend Developer",
  bio: "I build things for the web.",
  projects: [
    { name: "My App", tech: ["React", "Node"], url: "..." }
  ],
  skills: ["React", "TypeScript", "Tailwind CSS"],
  social: {
    github: "https://github.com/yourname",
    linkedin: "https://linkedin.com/in/yourname",
  },
};`}</pre>
            </div>

            <div className="mt-8 text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700"
                asChild
              >
                <a href={LIVE} target="_blank" rel="noreferrer noopener">
                  <BookOpen className="h-4 w-4" /> View live demo
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ── From a freelance developer ── */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-rose-500 mb-4">Built by a freelance developer, for freelance developers</p>
              <p className="leading-relaxed text-muted-foreground">
                This template was built by <strong className="font-semibold text-foreground">Deepak Kumar</strong> while working as a freelance developer — the Contact section isn't just a form, it's a lead funnel. The "Hire Me" call-to-action is intentionally prominent because that's what a freelance portfolio needs to do: turn visitors into project inquiries.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Every section was designed with a real hiring manager or client in mind. The Projects grid puts your best work front and center. The Skills section speaks the language recruiters filter for. The About section gives you room to tell your story without sounding like a résumé.
              </p>
              <div className="mt-6">
                <a
                  href="https://codespanda.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm font-semibold text-rose-500 hover:underline underline-offset-2"
                >
                  See CodeSpanda's own portfolio templates →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-y border-border bg-secondary/20 px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-rose-500">FAQ</p>
              <h2 className="text-3xl font-bold">Common questions</h2>
            </div>
            <div className="divide-y divide-border">
              {PORTFOLIO_FAQ.map((item) => (
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
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 to-pink-700 p-12 text-center text-white shadow-2xl shadow-rose-500/30">
            <h2 className="text-3xl font-extrabold">Make it yours.</h2>
            <p className="mt-3 text-rose-100">
              Free, open-source, and ready to deploy. Clone it today and have your portfolio live in under an hour.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50" asChild>
                <a href={LIVE} target="_blank" rel="noreferrer noopener">
                  <ExternalLink className="h-4 w-4" /> Live Preview
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <a href="https://github.com/codespanda/portfolio" target="_blank" rel="noreferrer noopener">
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
