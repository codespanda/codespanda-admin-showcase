import { Helmet } from "react-helmet-async";
import { TemplateDetail } from "@/components/site/TemplateDetail";
import { faqJsonLd, type FaqItem } from "@/components/site/FaqSection";

const SCREENS = [
  {
    "src": "/images/eva-autocare/dashboard.webp",
    "label": "Dashboard"
  },
  {
    "src": "/images/eva-autocare/appointments.webp",
    "label": "Appointments"
  },
  {
    "src": "/images/eva-autocare/customers.webp",
    "label": "Customers"
  },
  {
    "src": "/images/eva-autocare/vehicles.webp",
    "label": "Vehicles"
  },
  {
    "src": "/images/eva-autocare/work-orders.webp",
    "label": "Work Orders"
  },
  {
    "src": "/images/eva-autocare/invoices.webp",
    "label": "Invoices & Billing"
  },
  {
    "src": "/images/eva-autocare/inventory.webp",
    "label": "Inventory"
  },
  {
    "src": "/images/eva-autocare/reports.webp",
    "label": "Reports"
  },
  {
    "src": "/images/eva-autocare/technicians.webp",
    "label": "Technicians"
  },
  {
    "src": "/images/eva-autocare/reviews.webp",
    "label": "Reviews & Ratings"
  },
  {
    "src": "/images/eva-autocare/settings.webp",
    "label": "Settings"
  }
];

const INSIDE = [
  {
    "label": "Dashboard",
    "desc": "Appointment, revenue, technician and inventory stats with trend charts."
  },
  {
    "label": "Appointments",
    "desc": "Status tabs, search, filters, and a full booking table with pagination."
  },
  {
    "label": "Service Requests",
    "desc": "Priority-driven intake queue with technician assignment."
  },
  {
    "label": "Customers",
    "desc": "Searchable directory with a detailed customer activity panel."
  },
  {
    "label": "Vehicles",
    "desc": "Fleet directory with owner, insurance and service history detail."
  },
  {
    "label": "Work Orders",
    "desc": "Full job lifecycle with a live status timeline."
  },
  {
    "label": "Inventory",
    "desc": "Stock levels, suppliers and reorder alerts with a detail panel."
  },
  {
    "label": "Technicians",
    "desc": "Skill levels, workload and performance tracking."
  },
  {
    "label": "Invoices & Billing",
    "desc": "Line-item invoicing, payment history and status tracking."
  },
  {
    "label": "Reports",
    "desc": "Revenue, service and technician analytics with donut and bar charts."
  },
  {
    "label": "Reviews & Ratings",
    "desc": "Rating distribution, trends and top-rated technicians."
  },
  {
    "label": "Settings",
    "desc": "11 tabs covering business profile, branches, users, billing and more."
  },
  {
    "label": "Auth screens",
    "desc": "Sign in and sign up pages outside the dashboard shell."
  }
];

const FAQ: FaqItem[] = [
  {
    "q": "Can I use Eva AutoCare in commercial projects?",
    "a": "Yes. It's released under the MIT License. Use it in client work, SaaS products, white-label builds, and commercial applications with no attribution required."
  },
  {
    "q": "Is it suitable for shops other than a full multi-branch service center?",
    "a": "Absolutely. While designed around a multi-branch operation, the modules (appointments, vehicles, invoices, inventory) apply just as well to independent garages and single-location workshops. Rename labels and trim modules to fit your domain."
  },
  {
    "q": "Does it include a real backend or database?",
    "a": "No — it's a UI-only demo. Every list and detail page is driven by static TypeScript fixtures under src/lib/mock-data.ts, with no persistence or API layer. Wiring up your own backend is on you."
  },
  {
    "q": "How is it different from other admin dashboard templates?",
    "a": "Eva AutoCare is purpose-built for automotive service workflows — appointments, work orders, technician skill tracking, vehicle history and parts inventory — that a general-purpose admin dashboard doesn't touch."
  }
];

export function EvaAutocarePage() {
  return (
    <>
      <Helmet>
        <title>Eva AutoCare — Auto-Service Admin Dashboard | CodesPanda</title>
        <meta name="description" content="Eva AutoCare is a free auto-service admin dashboard template — appointments, work orders, vehicles, technicians &amp; invoicing. React, Vite &amp; Tailwind CSS." />
        <meta name="keywords" content="react auto service admin template, free react automotive dashboard, garage management dashboard, tailwind auto service template, react vehicle management, vite react auto admin" />
        <link rel="canonical" href="https://codespanda.com/templates/eva-autocare" />
        <meta property="og:title" content="Eva AutoCare — Auto-Service Admin Dashboard | CodesPanda" />
        <meta property="og:description" content="Eva AutoCare is a free React auto-service admin dashboard covering appointments, service requests, customers, vehicles, work orders, inventory, technicians, invoicing and reviews." />
        <meta property="og:url" content="https://codespanda.com/templates/eva-autocare" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/eva-autocare/dashboard.webp" />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="900" />
        <meta property="og:image:alt" content="Eva AutoCare dashboard — free React auto-service admin template" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Eva AutoCare — Auto-Service Admin Dashboard | CodesPanda" />
        <meta name="twitter:description" content="Eva AutoCare is a free React auto-service admin dashboard covering appointments, service requests, customers, vehicles, work orders, inventory, technicians, invoicing and reviews." />
        <meta name="twitter:image" content="https://codespanda.com/images/eva-autocare/dashboard.webp" />
        <meta name="twitter:image:alt" content="Eva AutoCare dashboard — free React auto-service admin template" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Eva AutoCare",
          "description": "A free React auto-service admin dashboard template covering appointments, service requests, customers, vehicles, work orders, inventory, technicians, invoicing and reviews. Built with React, Vite, Tailwind CSS and TypeScript.",
          "url": "https://codespanda.com/templates/eva-autocare",
          "image": "https://codespanda.com/images/eva-autocare/dashboard.webp",
          "brand": { "@type": "Brand", "name": "CodesPanda" },
          "category": "Software > Templates > Admin Dashboard",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://codespanda.com/templates/eva-autocare"
          }
        })}</script>
        <script type="application/ld+json">{faqJsonLd(FAQ)}</script>
      </Helmet>

      <TemplateDetail
        id="eva-autocare"
        githubUrl="https://github.com/codespanda/eva-autocare"
        updated="July 2026"
        screens={SCREENS}
        inside={INSIDE}
        faq={FAQ}
      />
    </>
  );
}
