import { Helmet } from "react-helmet-async";
import { TemplateDetail } from "@/components/site/TemplateDetail";
import { faqJsonLd, type FaqItem } from "@/components/site/FaqSection";

const SCREENS: { src: string; label: string }[] = [];

const INSIDE = [
  {
    "label": "Header & Navigation",
    "desc": "Sticky nav with dropdown menus, live cart badge, notifications, and search."
  },
  {
    "label": "Hero",
    "desc": "Animated shipping-route illustration paired with a dual CTA and trust badges."
  },
  {
    "label": "Brands & Stats",
    "desc": "Scrolling US-store marquee plus an animated stat-counter row."
  },
  {
    "label": "Featured Products",
    "desc": "Product grid with pricing, ratings, shipping estimates, and add-to-cart."
  },
  {
    "label": "How It Works",
    "desc": "Five-step numbered process from signup to doorstep delivery."
  },
  {
    "label": "Shipping Calculator",
    "desc": "Real interactive rate estimator — country, weight, speed, and insurance."
  },
  {
    "label": "Why Choose Us",
    "desc": "Eight-feature grid covering consolidation, tax-free shopping, and insurance."
  },
  {
    "label": "Testimonials",
    "desc": "Rated customer review cards with country and date."
  },
  {
    "label": "FAQ",
    "desc": "Accordion covering shipping, consolidation, tracking, and insurance questions."
  },
  {
    "label": "Auth Pages",
    "desc": "Login and signup screens with real React Hook Form + Zod validation."
  },
  {
    "label": "Shop, Cart & Dashboard",
    "desc": "Product detail, cart, checkout, order success, tracking, and account dashboard."
  },
  {
    "label": "Footer",
    "desc": "Sitemap columns, contact details, and social links."
  }
];

const FAQ: FaqItem[] = [
  {
    "q": "Can I use this for a commercial website?",
    "a": "Yes — it's MIT licensed. Use it for client work, your own shipping/e-commerce product, or any commercial project, no attribution required."
  },
  {
    "q": "Is there a real shipping or payments backend?",
    "a": "No — it ships with realistic mock data (products, brands, rates) wired through TanStack Query. The data-fetching layer is already in place, so pointing it at a real API is a matter of swapping the query functions, not restructuring the app."
  },
  {
    "q": "Does authentication actually work?",
    "a": "The login and signup forms have real client-side validation (React Hook Form + Zod) and an AuthContext that manages session state — but there's no real backend behind it out of the box. You'll connect it to your own auth provider."
  },
  {
    "q": "Why Tailwind CSS v4?",
    "a": "The template is built on Tailwind v4's CSS-first configuration and Vite. For v3, a find-and-replace on the CSS-variable tokens in index.css will get you most of the way there."
  }
];

export function ShoppersCrownPage() {
  return (
    <>
      <Helmet>
        <title>Shoppers Crown — Free International Shopping &amp; Package-Forwarding Template | CodesPanda</title>
        <meta name="description" content="A free React template for international shopping and package-forwarding platforms — shop, cart, checkout, shipping calculator, tracking, and a dashboard, with 17 real routed pages." />
        <meta name="keywords" content="react ecommerce template, package forwarding website template, shipping calculator react, react shopping cart template, tailwind css v4 template, react router ecommerce" />
        <link rel="canonical" href="https://codespanda.com/templates/shopperscrown" />
        <meta property="og:title" content="Shoppers Crown — Free International Shopping & Package-Forwarding Template | CodesPanda" />
        <meta property="og:description" content="A free React template for international shopping and package-forwarding platforms — shop, cart, checkout, shipping calculator, tracking, and a dashboard." />
        <meta property="og:url" content="https://codespanda.com/templates/shopperscrown" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shoppers Crown — Free International Shopping & Package-Forwarding Template | CodesPanda" />
        <meta name="twitter:description" content="A free React template for international shopping and package-forwarding platforms — 17 real routed pages." />
        <meta name="twitter:image" content="https://codespanda.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Shoppers Crown",
          "description": "A free React template for international shopping and package-forwarding platforms — shop, cart, checkout, shipping calculator, tracking, and a dashboard.",
          "url": "https://codespanda.com/templates/shopperscrown",
          "image": "https://codespanda.com/og-image.png",
          "brand": { "@type": "Brand", "name": "CodesPanda" },
          "category": "Software > Templates > E-commerce",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
        })}</script>
        <script type="application/ld+json">{faqJsonLd(FAQ)}</script>
      </Helmet>

      <TemplateDetail
        id="shopperscrown"
        githubUrl="https://github.com/codespanda/Shoppers-Crown"
        updated="September 2026"
        screens={SCREENS}
        inside={INSIDE}
        faq={FAQ}
      />
    </>
  );
}
