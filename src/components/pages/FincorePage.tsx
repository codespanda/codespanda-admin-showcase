import { Helmet } from "react-helmet-async";
import { TemplateDetail } from "@/components/site/TemplateDetail";
import { faqJsonLd, type FaqItem } from "@/components/site/FaqSection";

const SCREENS: { src: string; label: string }[] = [
  { src: "/images/fincore/hero.webp", label: "Home" },
  { src: "/images/fincore/service-detail.webp", label: "Service page" },
  { src: "/images/fincore/resources.webp", label: "Resources" },
];

const INSIDE = [
  {
    label: "Header & hero",
    desc: "Nav with a Services and Resources dropdown, click-to-call and Book a Consultation, a portrait hero with a growth card and trust badges.",
  },
  {
    label: "Benefits & stats",
    desc: "A benefits bar (tax savings, accurate records, compliance, better decisions) and a stats band.",
  },
  {
    label: "Services",
    desc: "Six services — bookkeeping, tax preparation, payroll, financial statements, business advisory and tax planning.",
  },
  {
    label: "Service pages",
    desc: "A page per service with what's included, the process, a sidebar of all services and related services.",
  },
  {
    label: "Industries",
    desc: "Eight industries served, from retail and SaaS to healthcare, real estate and hospitality.",
  },
  {
    label: "Resources",
    desc: "Six articles with category tabs, four free guides and six FAQs.",
  },
  {
    label: "About & team",
    desc: "Firm story, values, a timeline of milestones and a team of four with photos and roles.",
  },
  {
    label: "Testimonials & CTA",
    desc: "Client reviews and a Book a Free Consultation banner.",
  },
  {
    label: "Contact & legal",
    desc: "Contact cards, a consultation form, an embedded map, plus privacy and terms pages.",
  },
];

const FAQ: FaqItem[] = [
  {
    q: "What is it built with?",
    a: "React 19 and TypeScript with Vite, Tailwind CSS v4, shadcn/ui components (on Base UI) and React Router. It builds to a static site you can host anywhere.",
  },
  {
    q: "Who is it for?",
    a: "Accounting, bookkeeping, tax and CPA firms, financial advisors and payroll providers. Services, industries, team, articles and FAQs are plain data, so swap them for your own.",
  },
  {
    q: "Does the contact form send anything?",
    a: "Not out of the box. It shows a confirmation on the page. Connect it to a form service, email API or your CRM in src/pages/contact.tsx.",
  },
  {
    q: "How do I change the content?",
    a: "Everything lives in src/data/site.ts: contact details and hours, navigation, the six services and their page content, industries, team, articles, guides and FAQs. Pages update automatically.",
  },
];

export function FincorePage() {
  return (
    <>
      <Helmet>
        <title>FinCore Accounting — Free Accounting Firm Template | CodesPanda</title>
        <meta name="description" content="A free React accounting firm website template — service pages, industries, a resources hub with articles and FAQs, team and contact pages in a navy design." />
        <meta name="keywords" content="accounting firm website template, cpa website template, bookkeeping website template, tax firm website react, finance website template free" />
        <link rel="canonical" href="https://codespanda.com/templates/fincore" />
        <meta property="og:title" content="FinCore Accounting — Free Accounting Firm Template | CodesPanda" />
        <meta property="og:description" content="A free React accounting firm website template — service pages, industries, a resources hub with articles and FAQs, team and contact pages in a navy design." />
        <meta property="og:url" content="https://codespanda.com/templates/fincore" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/fincore/hero.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FinCore Accounting — Free Accounting Firm Template | CodesPanda" />
        <meta name="twitter:description" content="A free React accounting firm website template with service pages, industries and a resources hub." />
        <meta name="twitter:image" content="https://codespanda.com/images/fincore/hero.webp" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "FinCore Accounting",
          "description": "A free React accounting firm website template with service pages, industries and a resources hub.",
          "url": "https://codespanda.com/templates/fincore",
          "image": "https://codespanda.com/images/fincore/hero.webp",
          "brand": { "@type": "Brand", "name": "CodesPanda" },
          "category": "Software > Templates > Website",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
        })}</script>
        <script type="application/ld+json">{faqJsonLd(FAQ)}</script>
      </Helmet>

      <TemplateDetail
        id="fincore"
        githubUrl="https://github.com/codespanda/fincore-accounting"
        updated="October 2026"
        screens={SCREENS}
        inside={INSIDE}
        faq={FAQ}
      />
    </>
  );
}
