import { Helmet } from "react-helmet-async";
import { TemplateDetail } from "@/components/site/TemplateDetail";
import { faqJsonLd, type FaqItem } from "@/components/site/FaqSection";

const SCREENS: { src: string; label: string }[] = [
  { src: "/images/lassiwala/hero.webp", label: "Home" },
  { src: "/images/lassiwala/shop.webp", label: "Shop & cart" },
  { src: "/images/lassiwala/flavors.webp", label: "Flavour page" },
];

const INSIDE = [
  {
    label: "Header & hero",
    desc: "A sticky header with a cart count and mobile menu, and a hero with a clay-kulhad photo, script and poster headings, three trust points and an Explore Flavors button.",
  },
  {
    label: "Highlights & range",
    desc: "A floating highlights card (fresh, real ingredients, authentic recipe, good for you) and a five-flavour range in matching colourways.",
  },
  {
    label: "Shop & cart",
    desc: "Filter by bestsellers or taste, pick a kulhad or bottle size and quantity, and add to a slide-out cart with totals, a free-delivery nudge and an order confirmation.",
  },
  {
    label: "Flavour pages",
    desc: "A section per flavour with ingredients, a taste profile, calories, protein and calcium, and a quick-jump bar.",
  },
  {
    label: "About & story",
    desc: "Brand intro, a stats strip, values, a four-step how-it's-made process and a timeline from the first cart to today.",
  },
  {
    label: "Find us",
    desc: "A searchable outlet list with live open-now status, an embedded Google Map, and call and directions buttons.",
  },
  {
    label: "Delivery banner",
    desc: "A Craving Lassi? banner with a pincode check, plus fast-delivery, safe-packaging and easy-payment badges.",
  },
  {
    label: "Contact & policies",
    desc: "Call, WhatsApp, email and visit cards, a validated message form, opening hours, FAQs, and shipping, returns, terms and privacy pages.",
  },
];

const FAQ: FaqItem[] = [
  {
    q: "What is it built with?",
    a: "React 18 and TypeScript with Vite, Tailwind CSS v4, shadcn/ui components and React Router. It builds to a static site you can host anywhere.",
  },
  {
    q: "Who is it for?",
    a: "Lassi bars, juice and shake shops, dairies, sweet shops, cafés and any food or beverage brand with a small menu. Flavours, prices and outlets are plain data, so swap them for your own.",
  },
  {
    q: "Does the cart take payments?",
    a: "No. The cart works fully in the browser and remembers items between visits, but Place Order only shows a confirmation. Connect it to your payment gateway or ordering backend in src/components/layout/CartSheet.tsx.",
  },
  {
    q: "How do I change the content?",
    a: "Flavours, prices, sizes, ingredients and nutrition live in src/data/flavors.ts; outlets in src/pages/FindUs.tsx; FAQs and contact details in src/pages/Contact.tsx. The home cards, shop, flavour pages and cart all read from the same flavour list.",
  },
];

export function LassiwalaPage() {
  return (
    <>
      <Helmet>
        <title>LassiWala — Free Lassi &amp; Beverage Brand Template | CodesPanda</title>
        <meta name="description" content="A free React website template for a lassi bar or beverage brand — flavour range, an online shop with cart, flavour pages, story timeline, outlet finder and contact pages." />
        <meta name="keywords" content="lassi website template, beverage brand website template, juice shop website react, food ordering template free, dairy website template" />
        <link rel="canonical" href="https://codespanda.com/templates/lassiwala" />
        <meta property="og:title" content="LassiWala — Free Lassi & Beverage Brand Template | CodesPanda" />
        <meta property="og:description" content="A free React website template for a lassi bar or beverage brand — flavour range, an online shop with cart, flavour pages, story timeline, outlet finder and contact pages." />
        <meta property="og:url" content="https://codespanda.com/templates/lassiwala" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/lassiwala/hero.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LassiWala — Free Lassi & Beverage Brand Template | CodesPanda" />
        <meta name="twitter:description" content="A free React website template for a lassi bar or beverage brand with a shop, cart and outlet finder." />
        <meta name="twitter:image" content="https://codespanda.com/images/lassiwala/hero.webp" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "LassiWala",
          "description": "A free React website template for a lassi bar or beverage brand with a shop, cart and outlet finder.",
          "url": "https://codespanda.com/templates/lassiwala",
          "image": "https://codespanda.com/images/lassiwala/hero.webp",
          "brand": { "@type": "Brand", "name": "CodesPanda" },
          "category": "Software > Templates > Website",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
        })}</script>
        <script type="application/ld+json">{faqJsonLd(FAQ)}</script>
      </Helmet>

      <TemplateDetail
        id="lassiwala"
        githubUrl="https://github.com/codespanda/lassiwala"
        updated="October 2026"
        screens={SCREENS}
        inside={INSIDE}
        faq={FAQ}
      />
    </>
  );
}
