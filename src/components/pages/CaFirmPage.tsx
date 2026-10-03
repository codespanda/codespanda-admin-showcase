import { Helmet } from "react-helmet-async";
import { TemplateDetail } from "@/components/site/TemplateDetail";
import { faqJsonLd, type FaqItem } from "@/components/site/FaqSection";

const SCREENS: { src: string; label: string }[] = [];

const INSIDE = [
  {
    "label": "Header",
    "desc": "Sticky nav with active-link highlighting, mobile menu, Book Consultation CTA."
  },
  {
    "label": "Hero",
    "desc": "Two-column hero with trust badges and a floating logo card."
  },
  {
    "label": "Trusted By",
    "desc": "Auto-scrolling, pause-on-hover client logo marquee linking into testimonials."
  },
  {
    "label": "Why Choose Us",
    "desc": "Icon-led value list paired with a photo and a floating stat card."
  },
  {
    "label": "About",
    "desc": "Firm story with a four-stat counter row."
  },
  {
    "label": "Services",
    "desc": "Six-card grid of core service offerings."
  },
  {
    "label": "Industries",
    "desc": "Eight-industry icon grid, from real estate to non-profit."
  },
  {
    "label": "Engagement Models",
    "desc": "Four pricing/engagement cards with a “Popular” badge."
  },
  {
    "label": "Our Process",
    "desc": "Four-step numbered process timeline."
  },
  {
    "label": "Testimonials",
    "desc": "Rotating client quotes with colorful client-logo chips."
  },
  {
    "label": "Newsletter",
    "desc": "Standalone subscribe panel with a working success state."
  },
  {
    "label": "Insights",
    "desc": "Blog / resources preview grid."
  },
  {
    "label": "Footer",
    "desc": "CTA band, sitemap columns, masked contact number, social links."
  },
  {
    "label": "Careers Page",
    "desc": "Values, benefits grid, open-roles list, general-application form."
  },
  {
    "label": "Contact Page",
    "desc": "Info cards, inquiry form, office-location panel, FAQ accordion."
  }
];

const FAQ: FaqItem[] = [
  {
    "q": "Can I use this for a commercial website?",
    "a": "Yes — it's MIT licensed. Use it for client work, your own firm's site, or any commercial project, no attribution required."
  },
  {
    "q": "Does it work for firms other than chartered accountants?",
    "a": "Easily. Section content is data-driven — swap the copy, services list and industries grid and it adapts to legal, consulting or financial-advisory firms."
  },
  {
    "q": "Is there a real backend?",
    "a": "No — it's a UI-only template. The contact and newsletter forms manage their own state locally and show a success message on submit; wiring them to a real API is left to you."
  },
  {
    "q": "Why Tailwind CSS v4?",
    "a": "The template is built on Tailwind v4's CSS-first configuration and Vite. For v3, a find-and-replace on the CSS-variable tokens in index.css will get you most of the way there."
  }
];

export function CaFirmPage() {
  return (
    <>
      <Helmet>
        <title>Your CA Firm — Financial &amp; Advisory Landing Page | CodesPanda</title>
        <meta name="description" content="A free React template for chartered accountants and advisory firms — services, industries, engagement models, testimonials, careers and contact pages." />
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
        <script type="application/ld+json">{faqJsonLd(FAQ)}</script>
      </Helmet>

      <TemplateDetail
        id="ca-firm"
        githubUrl="https://github.com/codespanda/CA-Firm"
        updated="August 2026"
        screens={SCREENS}
        inside={INSIDE}
        faq={FAQ}
      />
    </>
  );
}
