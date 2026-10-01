import { Helmet } from "react-helmet-async";
import { TemplateDetail } from "@/components/site/TemplateDetail";
import { faqJsonLd, type FaqItem } from "@/components/site/FaqSection";

const SCREENS = [
  {
    "src": "/images/alpine/dashboard.webp",
    "label": "Main Dashboard"
  },
  {
    "src": "/images/alpine/employees.webp",
    "label": "Employee Directory"
  },
  {
    "src": "/images/alpine/attendance.webp",
    "label": "Attendance Tracker"
  },
  {
    "src": "/images/alpine/leave.webp",
    "label": "Leave Management"
  },
  {
    "src": "/images/alpine/payroll.webp",
    "label": "Payroll Module"
  },
  {
    "src": "/images/alpine/performance.webp",
    "label": "Performance Reviews"
  }
];

const INSIDE = [
  {
    "label": "Dashboard",
    "desc": "Headcount, attendance & hiring KPIs at a glance."
  },
  {
    "label": "Employees",
    "desc": "Full directory with profiles, roles & status."
  },
  {
    "label": "Departments",
    "desc": "Teams, headcounts & department leads."
  },
  {
    "label": "Designations",
    "desc": "Job titles & role hierarchy management."
  },
  {
    "label": "Attendance",
    "desc": "Daily present / absent / late tracking."
  },
  {
    "label": "Leave Management",
    "desc": "Request submission & manager approval workflow."
  },
  {
    "label": "Payroll",
    "desc": "Salary processing, payslips & payment status."
  },
  {
    "label": "Performance",
    "desc": "Goal tracking, peer reviews & rating cycles."
  },
  {
    "label": "Onboarding",
    "desc": "New-hire checklists, tasks & welcome flows."
  },
  {
    "label": "Charts",
    "desc": "Recharts line, bar, area, pie & composed charts."
  },
  {
    "label": "Reports",
    "desc": "Exportable HR analytics & summary reports."
  },
  {
    "label": "Settings",
    "desc": "Profile, role-based access & site preferences."
  }
];

const FAQ: FaqItem[] = [
  {
    "q": "Can I use Alpine Admin in commercial projects?",
    "a": "Yes. Alpine Admin React is released under the MIT License. You can use it in commercial products, client work, and white-labeled HRMS systems with no attribution required."
  },
  {
    "q": "Does it support dark mode?",
    "a": "Yes. Light and dark themes ship out of the box, toggled via Tailwind's dark class strategy. Every component — including charts and data tables — adapts automatically."
  },
  {
    "q": "Is TypeScript required?",
    "a": "The template is TypeScript-first. You can rename files to .jsx/.js and strip type annotations if you prefer plain JavaScript, but you'll give up autocomplete, inline type errors, and the refactoring safety net."
  },
  {
    "q": "Can I remove Recharts if I'm using a different chart library?",
    "a": "Recharts is only used in the Charts module and Dashboard KPI widgets. Remove those pages and the npm package — every other module (Employees, Payroll, Attendance, etc.) is completely independent."
  }
];

export function AlpineAdminPage() {
  return (
    <>
      <Helmet>
        <title>Alpine Admin React — HR Dashboard Template | CodesPanda</title>
        <meta name="description" content="Alpine Admin React is a free HR admin dashboard template — 30+ pages for employees, payroll, attendance &amp; leave management. React, Vite &amp; Tailwind CSS." />
        <meta name="keywords" content="react hr management dashboard template, free react admin template, hr dashboard react, react admin dashboard, tailwind hr template, vite react dashboard" />
        <link rel="canonical" href="https://codespanda.com/templates/alpine-admin-react" />
        <meta property="og:title" content="Alpine Admin React — HR Dashboard Template | CodesPanda" />
        <meta property="og:description" content="Free React HR management dashboard — 30+ pages for employees, payroll, attendance and leave management. Built with Vite, Tailwind CSS and TypeScript." />
        <meta property="og:url" content="https://codespanda.com/templates/alpine-admin-react" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/alpine/dashboard.webp" />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="900" />
        <meta property="og:image:alt" content="Alpine Admin React HR dashboard — free React HR management template" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Alpine Admin React — HR Dashboard Template | CodesPanda" />
        <meta name="twitter:description" content="Alpine Admin React is a free React HR management dashboard template with 30+ pages for employees, payroll, attendance and leave management. Built with Vite, Tailwind CSS and TypeScript." />
        <meta name="twitter:image" content="https://codespanda.com/images/alpine/dashboard.webp" />
        <meta name="twitter:image:alt" content="Alpine Admin React HR dashboard — free React HR management template" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Alpine Admin React",
          "description": "Alpine Admin React is a free HR dashboard template with 30+ pages for employees, payroll, attendance and leave management. Built with React, Vite, Tailwind CSS and TypeScript.",
          "url": "https://codespanda.com/templates/Alpine-Admin-React",
          "image": "https://codespanda.com/images/alpine/dashboard.webp",
          "brand": { "@type": "Brand", "name": "CodesPanda" },
          "category": "Software > Templates > Admin Dashboard",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://codespanda.com/templates/alpine-admin-react"
          }
        })}</script>
        <script type="application/ld+json">{faqJsonLd(FAQ)}</script>
      </Helmet>

      <TemplateDetail
        id="alpine-admin-react"
        githubUrl="https://github.com/codespanda/Alpine-Admin-React"
        updated="July 2025"
        screens={SCREENS}
        inside={INSIDE}
        faq={FAQ}
      />
    </>
  );
}
