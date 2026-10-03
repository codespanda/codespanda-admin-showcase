import { Helmet } from "react-helmet-async";
import { TemplateDetail } from "@/components/site/TemplateDetail";
import { faqJsonLd, type FaqItem } from "@/components/site/FaqSection";

const SCREENS: { src: string; label: string }[] = [];

const INSIDE = [
  {
    "label": "Header",
    "desc": "Sticky nav with active-link highlighting, mobile menu, Book a Consultation CTA."
  },
  {
    "label": "Hero",
    "desc": "Two-column hero with a project photo, trust badges, and a dual CTA pair."
  },
  {
    "label": "Services",
    "desc": "Five-card grid — residential, commercial, modular kitchen, turnkey, and space planning."
  },
  {
    "label": "Portfolio",
    "desc": "Filterable project grid across residential and commercial work."
  },
  {
    "label": "Process",
    "desc": "Five-step numbered timeline from consultation to handover."
  },
  {
    "label": "About",
    "desc": "Studio story with a four-stat counter row."
  },
  {
    "label": "Testimonials",
    "desc": "Three-card client quote grid with avatars and roles."
  },
  {
    "label": "Blog / Client Diaries",
    "desc": "Article preview grid for design trends, tips, and guides."
  },
  {
    "label": "Consultation CTA",
    "desc": "Closing enquiry band with a direct phone number."
  },
  {
    "label": "Footer",
    "desc": "Sitemap columns, contact details, and social links."
  }
];

const FAQ: FaqItem[] = [
  {
    "q": "Can I use this for a commercial website?",
    "a": "Yes — it's MIT licensed. Use it for client work, your own studio's site, or any commercial project, no attribution required."
  },
  {
    "q": "Does it only work for interior design studios?",
    "a": "Easily adapts to architecture firms, furniture brands, renovation contractors, and other design-led businesses — the content is data-driven, so swap the services, portfolio and process steps to match."
  },
  {
    "q": "Is there a real backend or booking system?",
    "a": "No — it's a UI-only template. The Book a Consultation CTAs are presentational; wiring them to a real form handler, calendar tool, or CRM is left to you."
  },
  {
    "q": "Why Tailwind CSS v4?",
    "a": "The template is built on Tailwind v4's CSS-first configuration and Vite. For v3, a find-and-replace on the CSS-variable tokens in index.css will get you most of the way there."
  }
];

export function InterioPage() {
  return (
    <>
      <Helmet>
        <title>Interio — Free Interior Design Website Template | CodesPanda</title>
        <meta name="description" content="A free React template for interior design studios — services, portfolio, process, testimonials, and a blog, in a warm cream-and-terracotta editorial design." />
        <meta name="keywords" content="react interior design template, free interior design website, interior design studio landing page react, tailwind css v4 template, shadcn ui react template, portfolio website template" />
        <link rel="canonical" href="https://codespanda.com/templates/interio" />
        <meta property="og:title" content="Interio — Free Interior Design Website Template | CodesPanda" />
        <meta property="og:description" content="A free React template for interior design studios — services, portfolio, process, testimonials, and a blog, in a warm cream-and-terracotta editorial design." />
        <meta property="og:url" content="https://codespanda.com/templates/interio" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Interio — Free Interior Design Website Template | CodesPanda" />
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
        <script type="application/ld+json">{faqJsonLd(FAQ)}</script>
      </Helmet>

      <TemplateDetail
        id="interio"
        githubUrl="https://github.com/codespanda/interio"
        updated="September 2026"
        screens={SCREENS}
        inside={INSIDE}
        faq={FAQ}
      />
    </>
  );
}
