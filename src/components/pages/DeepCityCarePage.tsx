import { Helmet } from "react-helmet-async";
import { TemplateDetail } from "@/components/site/TemplateDetail";
import { faqJsonLd, type FaqItem } from "@/components/site/FaqSection";

const SCREENS = [
  {
    "src": "/images/deepcity-care/dashboard.webp",
    "label": "Dashboard"
  },
  {
    "src": "/images/deepcity-care/appointments.webp",
    "label": "Appointments"
  },
  {
    "src": "/images/deepcity-care/patients.webp",
    "label": "Patients"
  },
  {
    "src": "/images/deepcity-care/billing.webp",
    "label": "Billing & Invoices"
  },
  {
    "src": "/images/deepcity-care/beds-rooms.webp",
    "label": "Beds & Rooms"
  },
  {
    "src": "/images/deepcity-care/settings.webp",
    "label": "Settings"
  }
];

const INSIDE = [
  {
    "label": "Dashboard",
    "desc": "Patient, appointment, revenue and bed stats with trend charts."
  },
  {
    "label": "Appointments",
    "desc": "List view, a doctor schedule board, and full appointment details."
  },
  {
    "label": "Patients",
    "desc": "Searchable directory and detailed patient profiles."
  },
  {
    "label": "Doctors & Departments",
    "desc": "Staff directories with availability and performance charts."
  },
  {
    "label": "Billing & Invoices",
    "desc": "Invoicing, payment tracking and revenue breakdowns."
  },
  {
    "label": "Pharmacy & Lab Reports",
    "desc": "Stock, suppliers, purchase orders and test tracking."
  },
  {
    "label": "Beds & Rooms",
    "desc": "Live occupancy with room transfer and bed management."
  },
  {
    "label": "Settings",
    "desc": "12 tabs covering profile, security, billing, integrations and more."
  },
  {
    "label": "Auth screens",
    "desc": "Sign in and sign up pages outside the dashboard shell."
  }
];

const FAQ: FaqItem[] = [
  {
    "q": "Can I use DeepCity Care Hospital in commercial projects?",
    "a": "Yes. It's released under the MIT License. Use it in client work, SaaS products, white-label builds, and commercial applications with no attribution required."
  },
  {
    "q": "Is it suitable for clinics other than a full hospital?",
    "a": "Absolutely. While designed around a multi-department hospital, the modules (appointments, patients, billing, pharmacy, beds & rooms) apply just as well to clinics, diagnostic centers, and smaller multi-specialty practices. Rename labels and trim modules to fit your domain."
  },
  {
    "q": "Does it include a real backend or database?",
    "a": "No — it's a UI-only demo. Every list and detail page is driven by static TypeScript fixtures under src/data/, with no persistence or API layer. Wiring up your own backend is on you."
  },
  {
    "q": "How is it different from the other templates in the library?",
    "a": "DeepCity Care Hospital is the only healthcare-focused template in the CodesPanda library — it covers clinical workflows (doctor schedules, lab reports, bed occupancy, pharmacy stock, insurance claims) that a general-purpose admin dashboard doesn't touch."
  }
];

export function DeepCityCarePage() {
  return (
    <>
      <Helmet>
        <title>DeepCity Care — Healthcare Dashboard Template | CodesPanda</title>
        <meta name="description" content="DeepCity Care is a free hospital admin dashboard template — appointments, patients, billing, pharmacy &amp; inventory. React, Vite &amp; Tailwind CSS." />
        <meta name="keywords" content="react hospital admin template, free react healthcare dashboard, hospital management dashboard, tailwind hospital template, react patient management, vite react healthcare admin" />
        <link rel="canonical" href="https://codespanda.com/templates/deepcity-care" />
        <meta property="og:title" content="DeepCity Care — Healthcare Dashboard Template | CodesPanda" />
        <meta property="og:description" content="Free React hospital admin — appointments, patients, billing, pharmacy, beds & rooms and inventory. Built with Vite, Tailwind, TypeScript." />
        <meta property="og:url" content="https://codespanda.com/templates/deepcity-care" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/deepcity-care/dashboard.webp" />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="900" />
        <meta property="og:image:alt" content="DeepCity Care Hospital dashboard — React hospital admin template" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DeepCity Care — Healthcare Dashboard Template | CodesPanda" />
        <meta name="twitter:description" content="DeepCity Care Hospital is a free React hospital administration dashboard covering appointments, patients, billing, pharmacy, lab reports, beds & rooms, inventory and insurance." />
        <meta name="twitter:image" content="https://codespanda.com/images/deepcity-care/dashboard.webp" />
        <meta name="twitter:image:alt" content="DeepCity Care Hospital dashboard — React hospital admin template" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "DeepCity Care Hospital",
          "description": "A free React hospital administration dashboard template covering appointments, patients, doctors, billing, pharmacy, lab reports, beds & rooms, inventory, insurance and messaging. Built with React, Vite, Tailwind CSS and TypeScript.",
          "url": "https://codespanda.com/templates/deepcity-care",
          "image": "https://codespanda.com/images/deepcity-care/dashboard.webp",
          "brand": { "@type": "Brand", "name": "CodesPanda" },
          "category": "Software > Templates > Admin Dashboard",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://codespanda.com/templates/deepcity-care"
          }
        })}</script>
        <script type="application/ld+json">{faqJsonLd(FAQ)}</script>
      </Helmet>

      <TemplateDetail
        id="deepcity-care-hospital"
        githubUrl="https://github.com/codespanda/deepcity-care-hospital"
        updated="July 2026"
        screens={SCREENS}
        inside={INSIDE}
        faq={FAQ}
      />
    </>
  );
}
