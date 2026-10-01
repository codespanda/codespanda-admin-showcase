import { Helmet } from "react-helmet-async";
import { TemplateDetail } from "@/components/site/TemplateDetail";
import { faqJsonLd, type FaqItem } from "@/components/site/FaqSection";

const SCREENS = [
  {
    "src": "/images/cornerstone-dashboard-2.webp",
    "label": "Main Dashboard"
  },
  {
    "src": "/images/cornerstone-properties.webp",
    "label": "Properties"
  },
  {
    "src": "/images/cornerstone-tenants.webp",
    "label": "Tenants"
  },
  {
    "src": "/images/cornerstone-payments.webp",
    "label": "Payments"
  },
  {
    "src": "/images/cornerstone-maintenance.webp",
    "label": "Maintenance"
  },
  {
    "src": "/images/cornerstone-analytics.webp",
    "label": "Analytics"
  }
];

const INSIDE = [
  {
    "label": "Dashboard",
    "desc": "Revenue, occupancy, payments and maintenance at a glance."
  },
  {
    "label": "Properties",
    "desc": "Full property directory with units, occupancy and value."
  },
  {
    "label": "Tenants",
    "desc": "Tenant profiles, lease status and contact details."
  },
  {
    "label": "Leases",
    "desc": "Lease agreements, renewals and expiry tracking."
  },
  {
    "label": "Payments",
    "desc": "Rent collection, receipts, overdue and refund tracking."
  },
  {
    "label": "Maintenance",
    "desc": "Maintenance requests, priority queue and status workflow."
  },
  {
    "label": "Invoices",
    "desc": "Invoice generation, due dates and payment reconciliation."
  },
  {
    "label": "Analytics",
    "desc": "Revenue trends, occupancy charts and property insights."
  },
  {
    "label": "Reports",
    "desc": "Exportable income, occupancy and maintenance reports."
  },
  {
    "label": "Messages",
    "desc": "In-app messaging between landlord and tenants."
  },
  {
    "label": "Announcements",
    "desc": "Broadcast notices to all or selected tenants."
  },
  {
    "label": "Settings",
    "desc": "Company profile, user roles and app preferences."
  }
];

const FAQ: FaqItem[] = [
  {
    "q": "Can I use Cornerstone in commercial projects?",
    "a": "Yes. Cornerstone is released under the MIT License. Use it in client work, SaaS products, white-label builds, and commercial applications with no attribution required."
  },
  {
    "q": "Does it include authentication?",
    "a": "Cornerstone ships with fully designed login, signup, forgot-password, and onboarding screens. The UI is complete — wiring up a real auth provider (Supabase, Firebase, Clerk, Auth.js) takes minutes."
  },
  {
    "q": "Can I use it without TypeScript?",
    "a": "The template is TypeScript-first. You can rename files to .jsx and strip type annotations, but you'll lose autocomplete and refactoring safety. Most teams find the types pay for themselves quickly."
  },
  {
    "q": "How is Cornerstone different from Alpine Admin React?",
    "a": "Alpine Admin React is purpose-built for HR management (employees, payroll, attendance, leave). Cornerstone targets general SaaS and business products — customers, orders, billing, analytics, and support. Pick the one closest to your domain."
  }
];

export function CornerstonePage() {
  return (
    <>
      <Helmet>
        <title>Cornerstone — SaaS Admin Dashboard Template | CodesPanda</title>
        <meta name="description" content="Cornerstone is a free SaaS admin dashboard template — 30+ pages for customers, orders, billing &amp; analytics. Built with React, Vite, Tailwind CSS &amp; TypeScript." />
        <meta name="keywords" content="react saas dashboard template, free react admin template, saas admin dashboard, tailwind saas template, shadcn ui dashboard, vite react dashboard" />
        <link rel="canonical" href="https://codespanda.com/templates/cornerstone" />
        <meta property="og:title" content="Cornerstone — SaaS Admin Dashboard Template | CodesPanda" />
        <meta property="og:description" content="Free React SaaS dashboard with 30+ pages for customers, orders, billing, analytics and support. Vite, Tailwind CSS, shadcn/ui, TypeScript." />
        <meta property="og:url" content="https://codespanda.com/templates/cornerstone" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/cornerstone-dashboard-2.webp" />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="900" />
        <meta property="og:image:alt" content="Cornerstone SaaS dashboard — free React admin template" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cornerstone — SaaS Admin Dashboard Template | CodesPanda" />
        <meta name="twitter:description" content="Cornerstone is a free React SaaS dashboard template with 30+ pages for customers, orders, billing, analytics and support." />
        <meta name="twitter:image" content="https://codespanda.com/images/cornerstone-dashboard-2.webp" />
        <meta name="twitter:image:alt" content="Cornerstone SaaS dashboard — free React admin template" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Cornerstone",
          "description": "Cornerstone is a free SaaS dashboard template with 30+ pages for customers, orders, billing, analytics and support. Built with React, Vite, Tailwind CSS, shadcn/ui and TypeScript.",
          "url": "https://codespanda.com/templates/cornerstone",
          "image": "https://codespanda.com/images/cornerstone-dashboard-2.webp",
          "brand": { "@type": "Brand", "name": "CodesPanda" },
          "category": "Software > Templates > Admin Dashboard",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://codespanda.com/templates/cornerstone"
          }
        })}</script>
        <script type="application/ld+json">{faqJsonLd(FAQ)}</script>
      </Helmet>

      <TemplateDetail
        id="cornerstone"
        githubUrl="https://github.com/codespanda/cornerstone"
        updated="July 2025"
        screens={SCREENS}
        inside={INSIDE}
        faq={FAQ}
      />
    </>
  );
}
