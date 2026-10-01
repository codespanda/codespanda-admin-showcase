import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BrowserFrame } from "@/components/site/BrowserFrame";
import { KindPill, NewPill } from "@/components/site/TemplateCard";
import { getSiteTemplate } from "@/lib/site";
import { FaqSection, faqJsonLd, type FaqItem } from "@/components/site/FaqSection";

const GITHUB_URL = "https://github.com/codespanda/finovo";
const DOCS_URL = "https://finovo.codespanda.com/docs";
const PREVIEW_URL = "https://finovo.codespanda.com/";

const TITLE = "Finovo — Accounting & ERP Admin Dashboard | CodesPanda";
const DESCRIPTION =
  "Finovo is a free React accounting/ERP admin dashboard covering invoicing, purchases, banking, expenses, payroll, inventory, projects, GST/TDS tax filing, reports and contacts.";

const MODULES = [
  { title: "Invoicing", body: "Quotes, invoices, credit notes", short: "Quotes, invoices, credit notes" },
  { title: "Purchases", body: "Bills, vendors, purchase orders", short: "Bills, vendors, POs" },
  { title: "Banking", body: "Accounts and reconciliation", short: "Accounts, reconciliation" },
  { title: "Expenses", body: "Claims and categories", short: "Claims, categories" },
  { title: "Payroll", body: "Employees and pay runs", short: "Employees, pay runs" },
  { title: "Inventory", body: "Items, stock and warehouses", short: "Items, stock" },
  { title: "Projects", body: "Time and billing by project", short: "Time and billing" },
  { title: "GST & TDS", body: "Tax filing screens", short: "Tax filing screens" },
  { title: "Reports & settings", body: "Reports, contacts, tabbed settings", short: "Reports, contacts, settings", desktopOnly: true },
];

const SPECS: [string, string, string?][] = [
  ["Tech stack", "React · Vite · Tailwind · TypeScript", "React · Vite · Tailwind · TS"],
  ["Dark mode", "Yes"],
  ["Responsive", "Yes"],
  ["License", "MIT"],
  ["Last updated", "August 2026"],
];

const RELATED = ["deepcity-care-hospital", "eva-autocare", "cornerstone"]
  .map((id) => getSiteTemplate(id))
  .filter((t) => t !== undefined);

function PriceCard() {
  return (
    <div className="flex flex-col gap-4 rounded-[18px] border border-border bg-card p-[22px] lg:gap-[22px] lg:p-7">
      <div className="flex items-baseline justify-between lg:flex-col lg:gap-1.5">
        <span className="text-sm text-muted-foreground">Price</span>
        <span className="font-display text-[30px] font-bold lg:text-4xl">Free</span>
      </div>
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noreferrer noopener"
        className="hidden h-[54px] items-center justify-center rounded-xl bg-brand text-base font-bold text-white hover:opacity-90 lg:flex"
      >
        Get Finovo
      </a>
      <a
        href={PREVIEW_URL}
        target="_blank"
        rel="noreferrer noopener"
        className="hidden h-[50px] items-center justify-center rounded-xl border-[1.5px] border-input text-base font-semibold text-foreground hover:bg-secondary lg:flex"
      >
        Open live preview
      </a>
      <dl className="flex flex-col text-[15px]">
        {SPECS.map(([k, v, short], i) => (
          <div
            key={k}
            className={`flex justify-between gap-4 border-t border-line-2 py-3 lg:py-3.5 ${i === SPECS.length - 1 ? "border-b" : ""}`}
          >
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="text-right font-semibold">
              {short ? (
                <>
                  <span className="lg:hidden">{short}</span>
                  <span className="hidden lg:inline">{v}</span>
                </>
              ) : (
                v
              )}
            </dd>
          </div>
        ))}
      </dl>
      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm lg:flex-col lg:gap-3 lg:text-[15px]">
        {["Full source code", "Documentation", "Lifetime updates"].map((item) => (
          <li key={item} className="flex items-center gap-1.5 lg:gap-2.5">
            <Check className="h-4 w-4 text-link lg:h-[18px] lg:w-[18px]" strokeWidth={2.4} aria-hidden />
            {item}
          </li>
        ))}
      </ul>
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noreferrer noopener"
        className="flex h-[54px] items-center justify-center rounded-xl bg-brand text-base font-bold text-white hover:opacity-90 lg:hidden"
      >
        Get Finovo
      </a>
    </div>
  );
}

const FAQ: FaqItem[] = [
  {
    "q": "Can I use Finovo in commercial projects?",
    "a": "Yes. It's released under the MIT License. Use it in client work, SaaS products, white-label builds, and commercial applications with no attribution required."
  },
  {
    "q": "Does it support tax rules outside India's GST/TDS system?",
    "a": "The tax module is built around India's GST and TDS filing workflows (GSTR-1/3B, e-way bills, ITC, Forms 130/131/133), but the rest of the app — invoicing, banking, payroll, inventory, projects — applies to any accounting or ERP use case. Trim or relabel the tax module for other jurisdictions."
  },
  {
    "q": "Does it include a real backend or database?",
    "a": "No — it's a UI-only demo. Every list and detail page is driven by static TypeScript fixtures across src/pages, with no persistence or API layer. Wiring up your own backend is on you."
  },
  {
    "q": "How is it different from other admin dashboard templates?",
    "a": "Finovo is purpose-built for accounting and ERP workflows — invoicing, purchase orders, bank reconciliation, payroll runs, GST/TDS filing and financial reports — spanning 113 routes across 13 modules, deeper than a general-purpose admin dashboard."
  }
];

export function FinovoPage() {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content="Finovo is a free accounting/ERP admin dashboard template — invoicing, purchases, banking, payroll, inventory &amp; GST/TDS tax filing. React, Vite &amp; Tailwind CSS." />
        <meta name="keywords" content="react accounting admin template, free react erp dashboard, gst tds filing dashboard, tailwind accounting template, react invoicing dashboard, vite react erp admin" />
        <link rel="canonical" href="https://codespanda.com/templates/finovo" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content="https://codespanda.com/templates/finovo" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/finovo/dashboard.webp" />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="900" />
        <meta property="og:image:alt" content="Finovo dashboard — free React accounting/ERP admin template" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content="https://codespanda.com/images/finovo/dashboard.webp" />
        <meta name="twitter:image:alt" content="Finovo dashboard — free React accounting/ERP admin template" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Finovo",
          "description": "A free React accounting/ERP admin dashboard template covering invoicing, purchases, banking, expenses, payroll, inventory, projects, GST/TDS tax filing, reports and contacts. Built with React, Vite, Tailwind CSS and TypeScript.",
          "url": "https://codespanda.com/templates/finovo",
          "image": "https://codespanda.com/images/finovo/dashboard.webp",
          "brand": { "@type": "Brand", "name": "CodesPanda" },
          "category": "Software > Templates > Admin Dashboard",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://codespanda.com/templates/finovo"
          }
        })}</script>
        <script type="application/ld+json">{faqJsonLd(FAQ)}</script>
      </Helmet>

      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />

        <main className="pt-16 lg:pt-20">
          {/* Title */}
          <section className="flex flex-col gap-4 bg-card px-4 pb-7 pt-6 lg:gap-[22px] lg:px-page lg:pb-10 lg:pt-12">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Home</Link> /{" "}
              <Link to="/templates?type=admin" className="hover:text-foreground">Admin panels</Link> / Finovo
            </nav>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <div className="flex flex-col gap-4 lg:w-[800px] lg:gap-3.5">
                <div className="flex flex-wrap gap-1.5 lg:gap-2">
                  <KindPill kind="admin" label="Admin panel" />
                  <NewPill />
                  <span className="rounded-md bg-secondary px-[9px] py-1 text-xs font-semibold">Finance / Accounting</span>
                </div>
                <h1 className="text-[44px] font-extrabold leading-none tracking-[-0.035em] lg:text-[64px]">Finovo</h1>
                <p className="text-base leading-[1.55] text-muted-foreground lg:text-[19px]">
                  A full accounting and ERP admin dashboard covering invoicing, purchases, banking, expenses, payroll, inventory,
                  projects, GST/TDS tax filing, reports and contacts — plus a<span className="hidden lg:inline"> fully</span> tabbed
                  settings area.
                </p>
              </div>
              <div className="flex flex-col-reverse gap-2.5 lg:shrink-0 lg:flex-row lg:gap-3">
                <div className="grid grid-cols-2 gap-2.5 lg:flex lg:gap-3">
                  <a
                    href={PREVIEW_URL}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex h-[50px] items-center justify-center gap-2 rounded-xl border-[1.5px] border-input px-[22px] text-[15px] font-semibold text-foreground hover:bg-secondary lg:h-[54px] lg:text-base"
                  >
                    Live preview <ArrowUpRight className="hidden h-4 w-4 lg:block" aria-hidden />
                  </a>
                  <a
                    href={DOCS_URL}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex h-[50px] items-center justify-center rounded-xl border-[1.5px] border-input px-[22px] text-[15px] font-semibold text-foreground hover:bg-secondary lg:h-[54px] lg:text-base"
                  >
                    Docs
                  </a>
                </div>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-[54px] items-center justify-center rounded-xl bg-brand px-[26px] text-base font-bold text-white hover:opacity-90"
                >
                  Get Finovo — Free
                </a>
              </div>
            </div>
          </section>

          {/* Screens */}
          <section className="flex flex-col gap-3 px-4 py-7 max-lg:tint-panel lg:[background:linear-gradient(hsl(var(--card))_50%,hsl(var(--background))_50%)] lg:gap-6 lg:px-page lg:pb-16 lg:pt-0" style={{ ["--tint" as string]: "#E2F3EC" }}>
            <BrowserFrame
              src="/images/finovo/dashboard.webp"
              alt="Finovo dashboard"
              url="finovo.codespanda.com/dashboard"
              size="lg"
              loading="eager"
              className="h-[248px] rounded-xl shadow-[0_20px_40px_rgba(14,23,38,0.16)] lg:h-[760px] lg:rounded-[20px] lg:shadow-[0_30px_70px_rgba(14,23,38,0.12)] max-lg:[&>div]:h-6 max-lg:[&>div>span]:hidden"
            />
            <div className="grid grid-cols-2 gap-3 lg:gap-6">
              <BrowserFrame
                src="/images/finovo/sales.webp"
                alt="Finovo sales and invoices"
                url="finovo.codespanda.com/sales"
                className="h-[124px] rounded-[10px] lg:h-[380px] lg:rounded-2xl max-lg:[&>div]:h-4 max-lg:[&>div>span]:hidden"
              />
              <BrowserFrame
                src="/images/finovo/payroll.webp"
                alt="Finovo payroll"
                url="finovo.codespanda.com/payroll"
                className="h-[124px] rounded-[10px] lg:h-[380px] lg:rounded-2xl max-lg:[&>div]:h-4 max-lg:[&>div>span]:hidden"
              />
            </div>
          </section>

          {/* Details */}
          <section id="get" className="flex flex-col gap-10 px-4 pb-12 pt-8 lg:flex-row lg:items-start lg:gap-12 lg:px-page lg:pb-24">
            <div className="lg:hidden">
              <PriceCard />
            </div>

            <div className="flex flex-1 flex-col gap-10 lg:gap-14">
              <div className="flex flex-col gap-4 lg:gap-[22px]">
                <h2 className="text-[26px] font-bold tracking-[-0.02em] lg:text-[32px]">What's inside</h2>
                <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3 lg:gap-3.5">
                  {MODULES.map((m) => (
                    <div
                      key={m.title}
                      className={`flex-col gap-1 rounded-xl border border-border bg-card p-3.5 lg:gap-1.5 lg:p-[18px] ${m.desktopOnly ? "hidden lg:flex" : "flex"}`}
                    >
                      <span className="text-[15px] font-bold lg:text-base">{m.title}</span>
                      <span className="text-[13px] text-muted-foreground lg:text-sm">
                        <span className="lg:hidden">{m.short}</span>
                        <span className="hidden lg:inline">{m.body}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 lg:gap-[22px]">
                <h2 className="text-[26px] font-bold tracking-[-0.02em] lg:text-[32px]">More admin panels</h2>
                <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
                  {RELATED.map((t) => (
                    <Link
                      key={t.id}
                      to={t.href}
                      className="flex items-center gap-3.5 rounded-[14px] border border-border bg-card p-3 text-foreground lg:flex-col lg:items-stretch lg:gap-0 lg:overflow-hidden lg:rounded-2xl lg:p-0"
                    >
                      <div
                        className="tint-panel flex h-[72px] w-24 shrink-0 items-end overflow-hidden rounded-[9px] px-2 pt-2 lg:h-[130px] lg:w-auto lg:rounded-none lg:px-[18px] lg:pt-[18px]"
                        style={{ ["--tint" as string]: t.tint }}
                      >
                        {t.screenshotUrl && (
                          <img
                            src={t.screenshotUrl}
                            alt=""
                            loading="lazy"
                            className="block h-full w-full rounded-t object-cover object-left-top lg:rounded-t-lg lg:object-top lg:shadow-[0_8px_20px_rgba(14,23,38,0.14)]"
                          />
                        )}
                      </div>
                      <div className="flex flex-col gap-1 lg:px-[18px] lg:py-4">
                        <span className="text-base font-bold lg:text-[17px]">{t.name}</span>
                        <span className="text-[13px] text-muted-foreground lg:text-sm">{t.shortCategory}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <aside className="hidden w-[380px] shrink-0 lg:block">
              <PriceCard />
            </aside>
          </section>
          <FaqSection items={FAQ} />
        </main>

        <Footer />
      </div>
    </>
  );
}
