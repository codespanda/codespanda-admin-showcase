import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  AppWindow, ArrowRight, Check, Code2, Layers, LayoutDashboard, Palette,
  RefreshCw, Rocket, SlidersHorizontal, Smartphone, Zap,
} from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BrowserFrame } from "@/components/site/BrowserFrame";
import { TemplateCard } from "@/components/site/TemplateCard";
import { TypeTabs } from "@/components/site/TypeTabs";
import { TechLogo } from "@/components/site/TechLogo";
import { FaqSection, faqJsonLd, type FaqItem } from "@/components/site/FaqSection";
import { ADMIN_TEMPLATES, SITE_TEMPLATES, WEB_TEMPLATES, getSiteTemplate } from "@/lib/site";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";


const eyebrow = "text-[13px] font-bold uppercase tracking-[0.08em] text-link lg:text-sm";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
function Hero() {
  const latest = SITE_TEMPLATES[0];
  const finovo = getSiteTemplate("finovo");
  const interio = getSiteTemplate("interio");

  return (
    <section className="flex flex-col gap-[22px] border-b border-border bg-card px-4 pb-12 pt-9 lg:gap-14 lg:px-page lg:pb-[104px] lg:pt-24 xl:flex-row xl:items-center xl:gap-8">
      <div className="flex flex-col gap-[22px] lg:max-w-[720px] lg:gap-7 xl:w-[560px] xl:shrink-0">
        <Link
          to={latest.href}
          className="flex items-center gap-2 self-start rounded-full bg-blue-soft py-[5px] pl-[5px] pr-3 text-[13px] font-semibold text-blue-ink lg:py-1.5 lg:pl-1.5 lg:pr-3.5 lg:text-sm"
        >
          <span className="rounded-full bg-brand px-[9px] py-[3px] text-[11px] text-white lg:px-2.5 lg:text-xs">New</span>
          {latest.name} just landed
        </Link>
        <h1 className="text-balance text-[42px] font-extrabold leading-[1.04] tracking-[-0.035em] lg:text-[68px] lg:leading-[1.02]">
          Web pages and admin panels, ready to ship.
        </h1>
        <p className="text-base leading-[1.65] text-muted-foreground lg:text-[17px]">
          CodesPanda is a free admin dashboard template library built for developers who ship. Every template in our collection
          from HR management and CRM to retail POS and healthcare is built with React, Vite, and Tailwind CSS. Each admin
          dashboard template is production-ready from day one: TypeScript, shadcn/ui components, responsive layouts, and clean
          code you can actually maintain. Download any template, adapt the theme admin colors to your brand, and go live. No
          license fees, no attribution required.
        </p>
        <div className="flex flex-col gap-2.5 lg:flex-row lg:gap-3.5">
          <Link
            to="/templates"
            className="flex h-[54px] items-center justify-center gap-2.5 rounded-xl bg-brand px-7 text-[17px] font-semibold text-white transition-opacity hover:opacity-90 lg:h-14"
          >
            Browse templates <ArrowRight className="h-[18px] w-[18px]" aria-hidden />
          </Link>
          <Link
            to="/templates/finovo"
            className="flex h-[54px] items-center justify-center rounded-xl border-[1.5px] border-input px-[26px] text-[17px] font-semibold text-foreground transition-colors hover:bg-secondary lg:h-14"
          >
            See an admin panel
          </Link>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-muted-foreground lg:gap-[22px]">
          {["React + Vite", "Tailwind CSS", "Responsive & dark mode"].map((label, i) => (
            <span key={label} className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-link" strokeWidth={2.4} aria-hidden />
              {i === 2 ? (
                <>
                  <span className="hidden lg:inline">{label}</span>
                  <span className="lg:hidden">Dark mode</span>
                </>
              ) : (
                label
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Screenshots: one composition drawn at 656×540 on desktop (358×290 on phones);
          every piece is sized in % of it so it keeps those proportions at any width. */}
      <div className="relative mt-1.5 aspect-[358/290] w-full lg:mt-0 lg:aspect-[656/540] lg:max-w-[720px] xl:min-w-0 xl:max-w-none xl:flex-1">
        {finovo?.screenshotUrl && (
          <BrowserFrame
            src={finovo.screenshotUrl}
            alt="Finovo admin dashboard"
            url="finovo.codespanda.com"
            size="lg"
            loading="eager"
            className="absolute right-0 top-0 h-[75.9%] w-[89.4%] rounded-xl shadow-[0_20px_40px_rgba(14,23,38,0.14)] lg:h-[83.3%] lg:w-full lg:rounded-2xl lg:shadow-[0_30px_60px_rgba(14,23,38,0.16)] [&>div>span]:hidden lg:[&>div>span]:flex max-lg:[&>div]:h-5"
          />
        )}
        {interio?.screenshotUrl && (
          <BrowserFrame
            src={interio.screenshotUrl}
            alt="Interio landing page"
            size="md"
            loading="eager"
            className="absolute bottom-0 left-0 h-[45.5%] w-[50.3%] rounded-[10px] shadow-[0_20px_40px_rgba(14,23,38,0.18)] lg:h-[44.4%] lg:w-[51.8%] lg:rounded-[14px] max-lg:[&>div]:h-4"
          />
        )}
        <div className="absolute bottom-[4.1%] right-[6.1%] hidden items-center gap-2.5 rounded-xl bg-[#0E1726] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(14,23,38,0.25)] lg:flex">
          <Code2 className="h-[18px] w-[18px] text-[#7CC4F2]" aria-hidden />
          npm run dev — and you have a product
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Web pages vs admin panels                                           */
/* ------------------------------------------------------------------ */
function TemplateKinds() {
  return (
    <section className="flex flex-col gap-6 px-4 py-14 lg:gap-12 lg:px-page lg:py-28">
      <div className="flex flex-col gap-2.5 lg:w-[720px] lg:gap-3.5">
        <span className={eyebrow}>Two kinds of templates</span>
        <h2 className="text-[30px] font-bold leading-[1.12] tracking-[-0.025em] lg:text-5xl lg:leading-[1.08] lg:tracking-[-0.03em]">
          The site your customers see, and the panel your team runs it from.
        </h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-7">
        <Link
          to="/templates?type=web"
          className="flex flex-col gap-4 rounded-[18px] border border-border bg-card p-6 text-foreground lg:gap-[22px] lg:rounded-[20px] lg:p-10"
        >
          <span className="flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-blue-soft lg:h-[52px] lg:w-[52px] lg:rounded-[14px]">
            <AppWindow className="h-6 w-6 text-link lg:h-[26px] lg:w-[26px]" strokeWidth={1.8} aria-hidden />
          </span>
          <h3 className="text-[26px] font-bold tracking-[-0.02em] lg:text-[32px]">Web pages</h3>
          <p className="text-base leading-[1.55] text-muted-foreground lg:text-[17px] lg:leading-[1.6]">
            Landing pages and business sites for shops, schools, firms, travel and portfolios
            <span className="hidden lg:inline"> — sections, forms and responsive layouts already done</span>.
          </p>
          <div className="flex flex-wrap gap-1.5 lg:gap-2">
            {WEB_TEMPLATES.map((t, i) => (
              <span
                key={t.id}
                className={cn(
                  "rounded-lg bg-secondary px-2.5 py-1.5 text-[13px] font-medium lg:px-3 lg:py-[7px] lg:text-sm",
                  i >= 5 && "hidden lg:inline"
                )}
              >
                {t.name.replace(" Template", "")}
              </span>
            ))}
          </div>
          <span className="text-base font-semibold text-link lg:mt-1.5">Browse web pages →</span>
        </Link>
        <Link
          to="/templates?type=admin"
          className="flex flex-col gap-4 rounded-[18px] bg-band p-6 text-white lg:gap-[22px] lg:rounded-[20px] lg:p-10"
        >
          <span className="flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-[#16283F] lg:h-[52px] lg:w-[52px] lg:rounded-[14px]">
            <LayoutDashboard className="h-6 w-6 text-[#7CC4F2] lg:h-[26px] lg:w-[26px]" strokeWidth={1.8} aria-hidden />
          </span>
          <h3 className="text-[26px] font-bold tracking-[-0.02em] lg:text-[32px]">Admin panels</h3>
          <p className="text-base leading-[1.55] text-[#B7C3D1] lg:text-[17px] lg:leading-[1.6]">
            Dashboards for accounting, hospitals, service centres, point of sale and SaaS
            <span className="hidden lg:inline"> — tables, charts, forms and settings wired into a working layout</span>.
          </p>
          <div className="flex flex-wrap gap-1.5 lg:gap-2">
            {ADMIN_TEMPLATES.map((t, i) => (
              <span
                key={t.id}
                className={cn(
                  "rounded-lg bg-[#16283F] px-2.5 py-1.5 text-[13px] font-medium lg:px-3 lg:py-[7px] lg:text-sm",
                  i >= 5 && "hidden lg:inline"
                )}
              >
                {t.name}
              </span>
            ))}
          </div>
          <span className="text-base font-semibold text-[#7CC4F2] lg:mt-1.5">Browse admin panels →</span>
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Latest templates with type tabs                                     */
/* ------------------------------------------------------------------ */
type Tab = "all" | "web" | "admin";
const TABS: { id: Tab; label: string; short: string }[] = [
  { id: "all", label: "All", short: "All" },
  { id: "web", label: "Web pages", short: "Web pages" },
  { id: "admin", label: "Admin panels", short: "Admin" },
];

function LatestTemplates() {
  const [tab, setTab] = useState<Tab>("all");
  const list = SITE_TEMPLATES.filter((t) => tab === "all" || t.kind === tab).slice(0, 6);

  return (
    <section id="templates" className="flex flex-col gap-5 px-4 pb-14 lg:gap-9 lg:px-page lg:pb-28">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-2.5 lg:gap-3">
          <span className={eyebrow}>Latest templates</span>
          <h2 className="text-[30px] font-bold tracking-[-0.025em] lg:text-[44px] lg:tracking-[-0.03em]">Fresh from the workshop</h2>
        </div>
        <TypeTabs tabs={TABS} value={tab} onChange={setTab} label="Template type" className="grid grid-cols-3 lg:flex" />
      </div>
      <div className="grid gap-5 lg:grid-cols-3 lg:gap-7">
        {list.map((t, i) => (
          <TemplateCard
            key={t.id}
            template={t}
            thumbClassName="h-[200px] px-[22px] pt-[30px] lg:h-[236px] lg:px-7 lg:pt-9"
            className={i >= 4 ? "hidden lg:flex" : undefined}
          />
        ))}
      </div>
      <Link
        to="/templates"
        className="flex h-[52px] items-center justify-center self-stretch rounded-xl border-[1.5px] border-input bg-card px-[26px] text-base font-semibold text-foreground hover:bg-secondary lg:self-center"
      >
        See all templates
      </Link>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Admin panel showcase                                                */
/* ------------------------------------------------------------------ */
function AdminShowcase() {
  return (
    <section className="flex flex-col gap-5 bg-band px-4 py-14 text-white lg:flex-row lg:items-center lg:gap-[72px] lg:px-page lg:py-[104px]">
      <div className="flex flex-col gap-5 lg:w-[420px] lg:shrink-0 lg:gap-6">
        <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#7CC4F2] lg:text-sm">Admin panels</span>
        <h2 className="text-[30px] font-bold leading-[1.12] tracking-[-0.025em] lg:text-[46px] lg:leading-[1.08] lg:tracking-[-0.03em]">
          Whole back offices, not just a dashboard page.
        </h2>
        <p className="text-base leading-[1.6] text-[#B7C3D1] lg:text-lg">
          Finovo ships invoicing, purchases, banking, expenses, payroll, inventory, projects, GST/TDS filing, reports, contacts
          and a fully tabbed settings area.
        </p>
        <ul className="hidden flex-col gap-3.5 text-base text-[#E3E9F0] lg:flex">
          {["Dark mode on every screen", "Typed data and clear component boundaries", "Live demo and docs for each template"].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <Check className="h-5 w-5 text-[#7CC4F2]" strokeWidth={2.2} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <Link
          to="/templates/finovo"
          className="hidden h-[54px] items-center self-start rounded-xl bg-white px-[26px] text-base font-bold text-[#0B1320] hover:opacity-90 lg:flex"
        >
          Explore Finovo
        </Link>
      </div>
      <BrowserFrame
        src="/images/finovo/sales.webp"
        alt="Finovo sales and invoices screen"
        url="finovo.codespanda.com/sales"
        dark
        size="lg"
        className="h-[250px] rounded-2xl lg:h-[520px] lg:min-w-0 lg:flex-1 lg:rounded-[18px] max-lg:[&>div]:h-6 max-lg:[&>div>span]:hidden"
      />
      <Link
        to="/templates/finovo"
        className="flex h-[54px] items-center justify-center rounded-xl bg-white text-base font-bold text-[#0B1320] hover:opacity-90 lg:hidden"
      >
        Explore Finovo
      </Link>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why CodesPanda                                                      */
/* ------------------------------------------------------------------ */
const FEATURES = [
  { icon: Code2, title: "Clean code", body: "Well-structured, documented and maintainable, following best practices.", short: "Structured, documented, maintainable." },
  { icon: Palette, title: "Modern design", body: "Pixel-careful UI inspired by the best SaaS products.", short: "UI inspired by top SaaS products." },
  { icon: Smartphone, title: "Responsive layouts", mobileTitle: "Responsive", body: "Every template holds up on desktop, tablet and mobile.", short: "Desktop, tablet and mobile." },
  { icon: SlidersHorizontal, title: "Easy customization", mobileTitle: "Easy to theme", body: "Design tokens and modular components make re-theming straightforward.", short: "Design tokens, modular parts." },
  { icon: Layers, title: "Developer friendly", body: "Intuitive folders, typed data and clear component boundaries.", short: "Clear folders and typed data." },
  { icon: Rocket, title: "Production ready", body: "Optimized builds, accessibility-first markup, real-world data patterns.", short: "Optimized, accessible markup." },
  { icon: Zap, title: "Fast performance", mobileTitle: "Fast", body: "Vite-powered builds with lazy loading and lean bundles.", short: "Vite builds, lazy loading." },
  { icon: RefreshCw, title: "Lifetime updates", body: "Every future improvement to a template, at no extra cost.", short: "Every future improvement." },
];

const STACK = ["React", "Vite", "Tailwind CSS", "JavaScript", "TypeScript", "Next.js"];

function StackChips({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2 lg:gap-2.5", className)}>
      {STACK.map((s) => (
        <span key={s} className="flex items-center gap-2 rounded-[9px] border border-border bg-card px-[13px] py-[9px] text-sm font-semibold lg:rounded-[10px] lg:border-0 lg:bg-secondary lg:px-3.5 lg:py-3 lg:text-[15px]">
          <TechLogo name={s} />
          {s}
        </span>
      ))}
    </div>
  );
}

function WhyCodesPanda() {
  return (
    <>
      <section id="features" className="flex flex-col gap-6 px-4 py-14 lg:gap-[52px] lg:px-page lg:py-28">
        <div className="flex flex-col gap-2.5 lg:w-[720px] lg:gap-3">
          <span className={eyebrow}>Why CodesPanda</span>
          <h2 className="text-[30px] font-bold leading-[1.12] tracking-[-0.025em] lg:text-[44px] lg:leading-[1.1] lg:tracking-[-0.03em]">
            Built the way you would build it — if you had the time.
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {FEATURES.map(({ icon: Icon, title, mobileTitle, body, short }) => (
            <div key={title} className="flex flex-col gap-2 rounded-[14px] border border-border bg-card p-[18px] lg:gap-3 lg:rounded-2xl lg:p-7">
              <Icon className="hidden h-[26px] w-[26px] text-link lg:block" strokeWidth={1.9} aria-hidden />
              <h3 className="text-base font-bold lg:text-[19px]">
                <span className="lg:hidden">{mobileTitle ?? title}</span>
                <span className="hidden lg:inline">{title}</span>
              </h3>
              <p className="text-sm leading-[1.5] text-muted-foreground lg:text-[15px] lg:leading-[1.55]">
                <span className="lg:hidden">{short}</span>
                <span className="hidden lg:inline">{body}</span>
              </p>
            </div>
          ))}
        </div>
        <StackChips className="lg:hidden" />
      </section>

      <section className="hidden px-page pb-28 lg:block">
        <div className="flex items-center justify-between gap-8 rounded-[20px] border border-border bg-card px-11 py-9">
          <div className="flex flex-col gap-1.5">
            <span className="text-xl font-bold">Built on a stack you already know</span>
            <span className="text-[15px] text-muted-foreground">More frameworks on the way.</span>
          </div>
          <StackChips />
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Contact CTA                                                         */
/* ------------------------------------------------------------------ */
const HOME_FAQ: FaqItem[] = [
  {
    q: "What is an admin dashboard template?",
    a: "An admin dashboard template is a pre-built front-end codebase that gives you the complete UI shell of an admin panel — sidebar navigation, data tables, charts, forms, and authentication layouts — without building it from scratch. CodesPanda admin dashboard templates are built with React, Vite, and Tailwind CSS so you get a production-ready starting point for any internal tool, SaaS back-office, or client portal.",
  },
  {
    q: "Are your admin templates free or paid?",
    a: "Every admin dashboard template in the current library is completely free and released under the MIT License. You can use them in commercial client projects, white-label them, or build SaaS products on top — no attribution required. Premium dashboard templates with extended page sets and additional modules are in development.",
  },
  {
    q: "Can I customize the theme admin colors and branding?",
    a: "Yes. All templates follow the shadcn/ui theming convention: change the CSS custom properties in one file and every component updates automatically. You can swap primary, accent, background, and surface tokens in minutes to match any brand. Tailwind's config file gives you full control over the type scale, border radius, and spacing.",
  },
  {
    q: "Do I need a backend to use a template administrator panel?",
    a: "No. Every template ships with static mock data so you can run it immediately with just npm install && npm run dev. When you're ready to connect a real backend, replace the mock data layer with your own API calls — REST or GraphQL. The templates have no opinion about the backend, so they work equally well with Node.js, Laravel, Django, or any headless CMS.",
  },
];

function ContactCta() {
  return (
    <section id="contact" className="px-4 pb-14 lg:px-page lg:pb-28">
      <div className="flex flex-col gap-4 rounded-[22px] bg-brand px-6 py-9 text-white lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:rounded-[28px] lg:px-page lg:py-[72px]">
        <div className="flex flex-col gap-4 lg:w-[700px]">
          <h2 className="text-[30px] font-bold leading-[1.12] tracking-[-0.025em] lg:text-[46px] lg:leading-[1.08] lg:tracking-[-0.03em]">
            Need a custom web app or admin panel?
          </h2>
          <p className="text-base leading-[1.6] text-white lg:text-lg">
            Start from a template, or tell us what you're building and we'll design and ship it with you.
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:flex-row">
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="flex h-[54px] items-center justify-center rounded-xl bg-white px-7 text-[17px] font-bold text-[#005A94] hover:opacity-90 lg:h-14"
          >
            Chat with Us
          </a>
          <Link
            to="/templates"
            className="hidden h-14 items-center rounded-xl border-[1.5px] border-[#7CC4F2] px-[26px] text-[17px] font-semibold text-white hover:bg-white/10 lg:flex"
          >
            Browse templates
          </Link>
          <Link
            to="/portfolio"
            className="flex h-[54px] items-center justify-center rounded-xl border-[1.5px] border-[#7CC4F2] text-base font-semibold text-white lg:hidden"
          >
            See our design work
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard Templates &amp; UI Kits | CodesPanda</title>
        <meta name="description" content="Premium &amp; free admin dashboard templates built with React, Vite &amp; Tailwind. Modern dashboard design for SaaS, CRM, HR, POS &amp; more — ship faster." />
        <meta name="keywords" content="admin dashboard template, react admin dashboard, free admin template, dashboard design, theme admin, template administrator panel, saas dashboard, crm dashboard, hr dashboard, pos template" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://codespanda.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codespanda.com/" />
        <meta property="og:title" content="Admin Dashboard Templates &amp; UI Kits | CodesPanda" />
        <meta property="og:description" content="Premium &amp; free admin dashboard templates built with React, Vite &amp; Tailwind. Modern dashboard design for SaaS, CRM, HR, POS &amp; more — ship faster." />
        <meta property="og:site_name" content="CodesPanda" />
        <meta property="og:image" content="https://codespanda.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="CodesPanda — React Admin Templates" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@codespanda" />
        <meta name="twitter:creator" content="@codespanda" />
        <meta name="twitter:title" content="Admin Dashboard Templates &amp; UI Kits | CodesPanda" />
        <meta name="twitter:description" content="Premium &amp; free admin dashboard templates built with React, Vite &amp; Tailwind. Modern dashboard design for SaaS, CRM, HR, POS &amp; more." />
        <meta name="twitter:image" content="https://codespanda.com/og-image.png" />
        <meta name="twitter:image:alt" content="CodesPanda — React Admin Templates" />
        <script type="application/ld+json">{faqJsonLd(HOME_FAQ)}</script>
      </Helmet>

      <a
        href="#templates"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="pt-16 lg:pt-20">
          <Hero />
          <TemplateKinds />
          <LatestTemplates />
          <AdminShowcase />
          <WhyCodesPanda />
          <FaqSection items={HOME_FAQ} />
          <ContactCta />
        </main>
        <Footer />
      </div>
    </>
  );
}
