import { Helmet } from "react-helmet-async";
import { TemplateDetail } from "@/components/site/TemplateDetail";
import { faqJsonLd, type FaqItem } from "@/components/site/FaqSection";

const SCREENS = [
  {
    "src": "/images/brisk/dashboard.webp",
    "label": "Dashboard Overview"
  },
  {
    "src": "/images/brisk/products.webp",
    "label": "Products"
  },
  {
    "src": "/images/brisk/orders.webp",
    "label": "Orders"
  },
  {
    "src": "/images/brisk/customers.webp",
    "label": "Customers"
  },
  {
    "src": "/images/brisk/analytics.webp",
    "label": "Analytics"
  },
  {
    "src": "/images/brisk/settings.webp",
    "label": "Settings"
  }
];

const INSIDE = [
  {
    "label": "Dashboard",
    "desc": "Revenue, orders, and KPI cards at a glance."
  },
  {
    "label": "Orders",
    "desc": "Order list, status tracking & detail view."
  },
  {
    "label": "Customers",
    "desc": "Customer directory with profiles and order history."
  },
  {
    "label": "Products",
    "desc": "Product catalogue with pricing & inventory."
  },
  {
    "label": "Analytics",
    "desc": "Revenue charts, sales trends & conversion metrics."
  },
  {
    "label": "Notifications",
    "desc": "System alerts, activity feed & notification centre."
  },
  {
    "label": "Auth Pages",
    "desc": "Login, register & forgot password screens."
  },
  {
    "label": "Settings",
    "desc": "Profile, preferences & account management."
  }
];

const FAQ: FaqItem[] = [
  {
    "q": "Is Brisk Admin free to use commercially?",
    "a": "Yes. Brisk Admin is released under the MIT License. Use it in client work, commercial SaaS products, or any internal tool — no attribution needed."
  },
  {
    "q": "Does Brisk Admin use TypeScript?",
    "a": "No. Brisk Admin is built with plain JavaScript and CSS Modules. This keeps the setup light and the learning curve low — no tsconfig, no type errors to chase before you can start building."
  },
  {
    "q": "How is Brisk Admin different from Alpine Admin React?",
    "a": "Alpine Admin is an HR-focused template with 30+ pages and TypeScript. Brisk Admin is a CRM/e-commerce template with 8 focused pages and plain JavaScript. Choose Alpine for deep HR data; choose Brisk for faster iteration on business UIs."
  },
  {
    "q": "Can I add TypeScript to Brisk Admin?",
    "a": "Yes. Run `npm install -D typescript @types/react @types/react-dom`, add a tsconfig.json, and rename .jsx to .tsx. You can migrate incrementally — TypeScript is fully compatible with the existing Vite setup."
  }
];

export function BriskAdminPage() {
  return (
    <>
      <Helmet>
        <title>Brisk Admin — Free CRM Dashboard Template | CodesPanda</title>
        <meta name="description" content="Brisk Admin is a free CRM admin dashboard template — clean layouts with shadcn/ui components, enterprise UI polish, fully responsive. React, Vite &amp; Tailwind CSS." />
        <meta name="keywords" content="shadcn ui dashboard template, free react admin template, react crm dashboard, shadcn admin panel, react dashboard template, vite admin template" />
        <link rel="canonical" href="https://codespanda.com/templates/brisk-admin" />
        <meta property="og:title" content="Brisk Admin — Free CRM Dashboard Template | CodesPanda" />
        <meta property="og:description" content="Brisk Admin is a free shadcn/ui React dashboard template for CRMs and business management apps. Clean layouts, enterprise UI polish, fully responsive." />
        <meta property="og:url" content="https://codespanda.com/templates/brisk-admin" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/brisk/dashboard.webp" />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="900" />
        <meta property="og:image:alt" content="Brisk Admin dashboard — free shadcn/ui React CRM template" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Brisk Admin — Free CRM Dashboard Template | CodesPanda" />
        <meta name="twitter:description" content="Brisk Admin is a free shadcn/ui React dashboard template for CRMs and business management apps. Clean layouts, enterprise UI polish, fully responsive." />
        <meta name="twitter:image" content="https://codespanda.com/images/brisk/dashboard.webp" />
        <meta name="twitter:image:alt" content="Brisk Admin dashboard — free shadcn/ui React CRM template" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Brisk Admin",
          "description": "Brisk Admin is a free shadcn/ui React dashboard template for CRMs and business management apps. Clean layouts, enterprise UI polish, fully responsive.",
          "url": "https://codespanda.com/templates/Brisk-Admin",
          "image": "https://codespanda.com/images/brisk/dashboard.webp",
          "brand": { "@type": "Brand", "name": "CodesPanda" },
          "category": "Software > Templates > Admin Dashboard",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://codespanda.com/templates/brisk-admin"
          }
        })}</script>
        <script type="application/ld+json">{faqJsonLd(FAQ)}</script>
      </Helmet>

      <TemplateDetail
        id="brisk-admin"
        githubUrl="https://github.com/codespanda/brisk-admin"
        updated="July 2025"
        screens={SCREENS}
        inside={INSIDE}
        faq={FAQ}
      />
    </>
  );
}
