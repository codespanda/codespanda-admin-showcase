import { Helmet } from "react-helmet-async";
import { TemplateDetail } from "@/components/site/TemplateDetail";
import { faqJsonLd, type FaqItem } from "@/components/site/FaqSection";

const SCREENS: { src: string; label: string }[] = [
  { src: "/images/kundeep-kitchen/hero.webp", label: "Home" },
  { src: "/images/kundeep-kitchen/menu.webp", label: "Menu" },
  { src: "/images/kundeep-kitchen/about.webp", label: "About & gallery" },
];

const INSIDE = [
  {
    label: "Header",
    desc: "Logo lockup, section links with an active state, and a Reserve a Table button.",
  },
  {
    label: "Hero",
    desc: "Serif headline, a signature dish photo, Reserve and Explore Menu CTAs, and four trust badges.",
  },
  {
    label: "Signature dishes",
    desc: "Six-card specialties grid with photos, short descriptions, and a View Full Menu link.",
  },
  {
    label: "Menu page",
    desc: "11 category tabs, live search, a bestsellers filter, prices, and spicy tags across 72 dishes.",
  },
  {
    label: "Table booking",
    desc: "Reserve popup for name, phone, date, time, guests and occasion that sends the request to WhatsApp.",
  },
  {
    label: "About & gallery",
    desc: "Restaurant story with checklist highlights, a quote card, and a five-photo ambiance strip.",
  },
  {
    label: "Guest reviews",
    desc: "Three testimonial cards with names and star ratings.",
  },
  {
    label: "Reservation CTA",
    desc: "Closing band with Reserve a Table and a click-to-call phone button.",
  },
  {
    label: "Footer",
    desc: "Quick links, menu categories, contact details, opening hours, and a newsletter field.",
  },
];

const FAQ: FaqItem[] = [
  {
    q: "What is it built with?",
    a: "Next.js 16 with the App Router, React 19, TypeScript and Tailwind CSS v4. It builds to a static site, so it can be hosted almost anywhere.",
  },
  {
    q: "Does it only work for vegetarian restaurants?",
    a: "No — it suits any restaurant, café, cloud kitchen or caterer. The dishes, categories, prices and photos are plain data, so swap them for your own menu.",
  },
  {
    q: "How do table reservations work?",
    a: "Reserve a Table opens a booking form for name, phone, date, time, guests, occasion and requests. Submitting it opens WhatsApp with the booking filled in for the restaurant's number — no backend needed. Online ordering isn't included.",
  },
  {
    q: "How do I change the menu?",
    a: "Categories and dishes live in one data file (src/data/menu.ts), and the restaurant's name, phone and hours in src/data/site.ts. Add a dish, change a price or mark a bestseller there — search and filters update automatically.",
  },
];

export function KundeepKitchenPage() {
  return (
    <>
      <Helmet>
        <title>Kundeep Kitchen — Free Restaurant Website Template | CodesPanda</title>
        <meta name="description" content="A free Next.js restaurant website template — signature dishes, about, gallery, reviews, WhatsApp table booking and a full menu page with search and filters." />
        <meta name="keywords" content="restaurant website template, free restaurant template, next.js restaurant template, food website template, restaurant menu page, tailwind css v4 template" />
        <link rel="canonical" href="https://codespanda.com/templates/kundeep-kitchen" />
        <meta property="og:title" content="Kundeep Kitchen — Free Restaurant Website Template | CodesPanda" />
        <meta property="og:description" content="A free Next.js restaurant website template — signature dishes, about, gallery, reviews, WhatsApp table booking and a full menu page with search and filters." />
        <meta property="og:url" content="https://codespanda.com/templates/kundeep-kitchen" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/kundeep-kitchen/hero.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kundeep Kitchen — Free Restaurant Website Template | CodesPanda" />
        <meta name="twitter:description" content="A free Next.js restaurant website template with a full menu page, gallery, reviews and WhatsApp table booking." />
        <meta name="twitter:image" content="https://codespanda.com/images/kundeep-kitchen/hero.webp" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Kundeep Kitchen",
          "description": "A free Next.js restaurant website template with a full menu page, gallery, reviews and WhatsApp table booking.",
          "url": "https://codespanda.com/templates/kundeep-kitchen",
          "image": "https://codespanda.com/images/kundeep-kitchen/hero.webp",
          "brand": { "@type": "Brand", "name": "CodesPanda" },
          "category": "Software > Templates > Landing Page",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
        })}</script>
        <script type="application/ld+json">{faqJsonLd(FAQ)}</script>
      </Helmet>

      <TemplateDetail
        id="kundeep-kitchen"
        githubUrl="https://github.com/codespanda/kundeep-kitchen"
        updated="October 2026"
        screens={SCREENS}
        inside={INSIDE}
        faq={FAQ}
      />
    </>
  );
}
