import { Helmet } from "react-helmet-async";
import { TemplateDetail } from "@/components/site/TemplateDetail";
import { faqJsonLd, type FaqItem } from "@/components/site/FaqSection";

const SCREENS = [
  {
    "src": "/images/flowers/pos-counter.webp",
    "label": "POS Counter"
  },
  {
    "src": "/images/flowers/orders-live.webp",
    "label": "Orders"
  },
  {
    "src": "/images/flowers/customers-live.webp",
    "label": "Customers"
  },
  {
    "src": "/images/flowers/coupons-live.webp",
    "label": "Coupons"
  },
  {
    "src": "/images/flowers/reports-live.webp",
    "label": "Reports"
  },
  {
    "src": "/images/flowers/settings-live.webp",
    "label": "Settings"
  }
];

const INSIDE = [
  {
    "label": "POS Counter",
    "desc": "Product grid, cart, coupons and multi-tender checkout."
  },
  {
    "label": "Orders",
    "desc": "Order history with status and payment filters."
  },
  {
    "label": "Customers",
    "desc": "Customer directory with spend and order history."
  },
  {
    "label": "Coupons",
    "desc": "Discount codes with usage caps and expiry tracking."
  },
  {
    "label": "Reports",
    "desc": "Revenue trend, top products and category breakdowns."
  },
  {
    "label": "Settings",
    "desc": "Store profile, tax rate, payment methods and team."
  },
  {
    "label": "Notifications",
    "desc": "Order, inventory and system alerts in one feed."
  },
  {
    "label": "Auth screens",
    "desc": "Sign in, sign up and forgot-password, fully designed."
  }
];

const FAQ: FaqItem[] = [
  {
    "q": "Can I use Flowers POS in commercial projects?",
    "a": "Yes. Flowers POS is released under the MIT License. Use it in client work, SaaS products, white-label builds, and commercial applications with no attribution required."
  },
  {
    "q": "Is it suitable for shops other than flower shops?",
    "a": "Absolutely. While designed around a flower shop's workflow, the modules (POS counter, orders, customers, coupons, reports) apply to any retail or boutique business. Rename labels and swap categories to fit your domain."
  },
  {
    "q": "Does it include a real payment gateway?",
    "a": "No — it's a UI-only demo. Cart totals, coupon discounts, and tax are calculated client-side against mock data, with card, cash, and gift-card tender options at checkout. Wiring Stripe or another processor into the checkout flow is on you."
  },
  {
    "q": "How is Flowers POS different from the other templates?",
    "a": "Flowers POS is the only retail-focused template in the CodesPanda library. It includes a counter checkout flow with coupon codes and multi-tender payment, plus order and customer history — features specific to a brick-and-mortar retail counter rather than a back-office admin panel."
  }
];

export function FlowersPosPage() {
  return (
    <>
      <Helmet>
        <title>Flowers POS — Retail POS Dashboard Template | CodesPanda</title>
        <meta name="description" content="Flowers POS is a free retail POS admin dashboard template — product grid, cart, coupons, orders, customers &amp; reports. React, Vite &amp; Tailwind CSS." />
        <meta name="keywords" content="react pos template, free react retail template, point of sale dashboard, tailwind pos template, react shop admin, vite react pos" />
        <link rel="canonical" href="https://codespanda.com/templates/flowers" />
        <meta property="og:title" content="Flowers POS — Retail POS Dashboard Template | CodesPanda" />
        <meta property="og:description" content="Flowers POS is a free React point-of-sale template for a florist counter covering product grid, cart, coupons, orders, customers, and reports." />
        <meta property="og:url" content="https://codespanda.com/templates/flowers" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/flowers/pos-counter.webp" />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="900" />
        <meta property="og:image:alt" content="Flowers POS counter — React retail point-of-sale template" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Flowers POS — Retail POS Dashboard Template | CodesPanda" />
        <meta name="twitter:description" content="Flowers POS is a free React point-of-sale template for a florist counter covering product grid, cart, coupons, orders, customers, and reports." />
        <meta name="twitter:image" content="https://codespanda.com/images/flowers/pos-counter.webp" />
        <meta name="twitter:image:alt" content="Flowers POS counter — React retail point-of-sale template" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Flowers POS",
          "description": "A free React point-of-sale template for a florist counter with product grid, cart, coupons, orders, customers, and reports. Built with React, Vite, Tailwind CSS and TypeScript.",
          "url": "https://codespanda.com/templates/flowers",
          "image": "https://codespanda.com/images/flowers/pos-counter.webp",
          "brand": { "@type": "Brand", "name": "CodesPanda" },
          "category": "Software > Templates > POS System",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://codespanda.com/templates/flowers"
          }
        })}</script>
        <script type="application/ld+json">{faqJsonLd(FAQ)}</script>
      </Helmet>

      <TemplateDetail
        id="flowers-pos"
        githubUrl="https://github.com/codespanda/flowers-pos"
        updated="July 2026"
        screens={SCREENS}
        inside={INSIDE}
        faq={FAQ}
      />
    </>
  );
}
