import { Helmet } from "react-helmet-async";
import { ArrowUpRight, Check } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { StartProjectDialog } from "@/components/site/StartProjectDialog";
import { HireUsDialog } from "@/components/site/HireUsDialog";

interface Product {
  id: string;
  name: string;
  category: string;
  url: string;
  logo: string;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
  features: string[];
  /** Highlight line under the features (plan, audience). */
  plan: string;
  /** Label for the main button. */
  cta: string;
  tint: string;
  /** Screenshots of a whole page get a card frame; illustrations sit on the tint as they are. */
  framed?: boolean;
}

/** Live products CodesPanda builds and runs. Copy comes from each product's own site. */
const PRODUCTS: Product[] = [
  {
    id: "ai-invoice",
    name: "AI Invoice",
    category: "SaaS · Invoicing",
    url: "https://ai-invoice.accountingpanda.com",
    logo: "/images/products/ai-invoice/logo.webp",
    image: "/images/products/ai-invoice/hero.webp",
    imageAlt: "AI Invoice home page: a plain-English prompt turned into a ready-to-send invoice",
    tagline: "Type the job. Get the invoice.",
    description:
      "An AI-powered invoice generator for freelancers and small businesses. Describe your work in plain English: AI drafts the invoice, the app does every calculation, and it goes out as a polished PDF or straight to your client's inbox.",
    features: [
      "AI invoice generation from plain English",
      "One-click PDF export",
      "Email delivery to clients",
      "Payment tracking and balances due",
      "Customer and product catalog",
      "Multi-tax (CGST, SGST, VAT, sales tax)",
      "Five professional invoice templates",
      "Multi-currency billing",
    ],
    plan: "Free forever: up to 2 invoices a day, every feature included, no credit card required.",
    cta: "Try AI Invoice free",
    tint: "#E6F0FF",
    framed: true,
  },
  {
    id: "accountingpanda",
    name: "AccountingPanda",
    category: "Website · Accounting services",
    url: "https://accountingpanda.com",
    logo: "/images/products/accountingpanda/logo.webp",
    image: "/images/products/accountingpanda/hero.webp",
    imageAlt: "AccountingPanda mascot working on bookkeeping and financial reports",
    tagline: "Your trusted outsourcing partner for the USA and Australia.",
    description:
      "Accurate, compliant and scalable accounting and bookkeeping for businesses and CPA firms in the USA and Australia, from day-to-day bookkeeping to financial statements, so they can focus on growth.",
    features: [
      "Bookkeeping in QuickBooks and Xero",
      "Financial reporting",
      "Bank and credit card reconciliation",
      "Accounts payable and receivable",
      "Payroll processing and tax filings",
      "US: GAAP statements, sales tax and 1099",
      "Australia: BAS, IAS, GST and super",
      "Support for CPA firms",
    ],
    plan: "100% data security, CPA-approved processes and on-time delivery, with 24/7 support.",
    cta: "Get a free consultation",
    tint: "#E8F5EC",
  },
];

function hostOf(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

function ProductShowcase({ product, flip }: { product: Product; flip: boolean }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[22px] border border-border bg-card lg:flex-row lg:items-stretch">
      <div className={cn("flex min-w-0 flex-col gap-5 p-6 lg:w-[46%] lg:gap-6 lg:p-12", flip && "lg:order-2")}>
        <div className="flex items-center gap-3">
          <img src={product.logo} alt={`${product.name} logo`} className="h-12 w-auto max-w-[160px] rounded-[10px] bg-logo-bg object-contain" />
          <span className="rounded-md bg-[#DCF5EA] px-[9px] py-1 text-xs font-bold text-[#05603F]">Live</span>
          <span className="rounded-md bg-secondary px-[9px] py-1 text-xs font-semibold">{product.category}</span>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[30px] font-bold leading-[1.08] tracking-[-0.025em] lg:text-[44px] lg:tracking-[-0.03em]">{product.name}</h2>
          <p className="text-lg font-semibold text-foreground lg:text-xl">{product.tagline}</p>
        </div>
        <p className="text-[15px] leading-[1.65] text-muted-foreground lg:text-base">{product.description}</p>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[15px] leading-[1.45]">
              <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-link" strokeWidth={2.4} aria-hidden />
              {f}
            </li>
          ))}
        </ul>
        <p className="rounded-xl bg-blue-soft px-4 py-3 text-[15px] font-semibold text-blue-ink">{product.plan}</p>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <a
            href={product.url}
            target="_blank"
            rel="noreferrer noopener"
            className="flex h-[52px] items-center justify-center gap-2 rounded-xl bg-brand px-6 text-base font-bold text-white hover:opacity-90"
          >
            {product.cta} <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href={product.url}
            target="_blank"
            rel="noreferrer noopener"
            className="flex h-[52px] items-center justify-center rounded-xl border-[1.5px] border-input px-5 text-[15px] font-semibold text-foreground hover:bg-secondary"
          >
            {hostOf(product.url)}
          </a>
        </div>
      </div>

      <div
        className="tint-panel flex items-center justify-center p-5 lg:flex-1 lg:p-10"
        style={{ ["--tint" as string]: product.tint }}
      >
        <img
          src={product.image}
          alt={product.imageAlt}
          loading="eager"
          decoding="async"
          className={cn(
            "block h-auto w-full max-w-[720px]",
            product.framed && "rounded-[12px] border border-border shadow-[0_18px_40px_-18px_rgba(14,23,38,0.35)]"
          )}
        />
      </div>
    </article>
  );
}

export function ProjectsPage() {
  return (
    <>
      <Helmet>
        <title>Projects — Our Live Products | CodesPanda</title>
        <meta
          name="description"
          content="Live products built by CodesPanda: AI Invoice, an AI-assisted invoice generator, and AccountingPanda, an outsourced accounting and bookkeeping website."
        />
        <link rel="canonical" href="https://codespanda.com/projects" />
        <meta property="og:title" content="Projects — Our Live Products | CodesPanda" />
        <meta property="og:description" content="Live products built by CodesPanda: AI Invoice and AccountingPanda." />
        <meta property="og:url" content="https://codespanda.com/projects" />
        <meta property="og:image" content="https://codespanda.com/images/products/ai-invoice/hero.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects — Our Live Products | CodesPanda" />
        <meta name="twitter:description" content="Live products built by CodesPanda: AI Invoice and AccountingPanda." />
        <meta name="twitter:image" content="https://codespanda.com/images/products/ai-invoice/hero.webp" />
      </Helmet>

      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />

        <main className="flex flex-1 flex-col pt-16 lg:pt-20">
          {/* Hero */}
          <section className="flex flex-col gap-[18px] border-b border-border bg-card px-4 pb-10 pt-9 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:px-page lg:pb-20 lg:pt-[88px]">
            <div className="flex flex-col gap-[18px] lg:max-w-[820px] lg:gap-[22px]">
              <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-link lg:text-sm">Projects</span>
              <h1 className="text-balance text-[40px] font-extrabold leading-[1.04] tracking-[-0.035em] lg:text-[64px] lg:leading-[1.02]">
                Our live products.
              </h1>
              <p className="text-base leading-[1.6] text-muted-foreground lg:text-xl">
                Products and websites we design, build and run. Every one is live, so you can try it today.
              </p>
            </div>
            <StartProjectDialog>
              <button type="button" className="flex h-[54px] items-center justify-center rounded-xl bg-brand px-7 text-base font-bold text-white hover:opacity-90 lg:h-14 lg:shrink-0 lg:text-[17px]">
                Start a project
              </button>
            </StartProjectDialog>
          </section>

          {/* Products */}
          <section className="flex flex-col gap-6 px-4 py-10 lg:gap-8 lg:px-page lg:py-[88px]">
            {PRODUCTS.map((p, i) => (
              <ProductShowcase key={p.id} product={p} flip={i % 2 === 1} />
            ))}
          </section>

          {/* CTA */}
          <section className="px-4 pb-12 lg:px-page lg:pb-[104px]">
            <div className="flex flex-col gap-4 rounded-[22px] bg-brand px-6 py-9 text-white lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:rounded-[28px] lg:px-20 lg:py-[72px]">
              <div className="flex flex-col gap-4 lg:w-[700px]">
                <h2 className="text-[30px] font-bold leading-[1.12] tracking-[-0.025em] lg:text-[46px] lg:leading-[1.08] lg:tracking-[-0.03em]">
                  Have a product in mind?
                </h2>
                <p className="text-base leading-[1.6] text-[#DCEEFA] lg:text-lg">
                  Tell us what you're building. We'll design it, build it in React and ship it with you.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:flex-row">
                <a href={`mailto:${SITE.email}`} className="flex h-[54px] items-center justify-center rounded-xl bg-white px-7 text-[17px] font-bold text-[#005A94] hover:opacity-90 lg:h-14">
                  Talk to us
                </a>
                <HireUsDialog>
                  <button
                    type="button"
                    className="flex h-[54px] items-center justify-center rounded-xl border-[1.5px] border-[#7CC4F2] px-[26px] text-[17px] font-semibold text-white hover:bg-white/10 lg:h-14"
                  >
                    Hire us
                  </button>
                </HireUsDialog>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
