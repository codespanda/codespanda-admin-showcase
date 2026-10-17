import { Helmet } from "react-helmet-async";
import { TemplateDetail } from "@/components/site/TemplateDetail";
import { faqJsonLd, type FaqItem } from "@/components/site/FaqSection";

const SCREENS: { src: string; label: string }[] = [
  { src: "/images/schulflow/hero.webp", label: "Website" },
  { src: "/images/schulflow/dashboard.webp", label: "Dashboard" },
  { src: "/images/schulflow/timetable.webp", label: "Timetable generator" },
];

const INSIDE = [
  {
    label: "Marketing website",
    desc: "Landing page with a dashboard preview, modules grid, operations and why-choose sections, testimonials and a call to action.",
  },
  {
    label: "Features, pricing & about",
    desc: "A 12-module features page, three plans with a monthly/yearly toggle and FAQs, an about page and a contact form.",
  },
  {
    label: "Sign up & log in",
    desc: "Auth pages with a demo account, protected dashboard routes and a mock auth service ready to swap for your API.",
  },
  {
    label: "Dashboard overview",
    desc: "Stat cards, weekly attendance chart, recent activity, quick actions and upcoming events.",
  },
  {
    label: "Students & teachers",
    desc: "Searchable, filterable tables with fee status, plus an Add Student side panel.",
  },
  {
    label: "Classes & attendance",
    desc: "Class sections, and a daily roster to mark students present, absent, late or on leave.",
  },
  {
    label: "Timetable generator",
    desc: "Builds clash-free weekly timetables for several sections at once, so no teacher is double-booked.",
  },
  {
    label: "Fees & exams",
    desc: "Invoices with collection progress and reminders, exam schedules and results with class averages.",
  },
  {
    label: "Reports & settings",
    desc: "Fee and attendance analytics with CSV downloads, and profile and school settings.",
  },
];

const FAQ: FaqItem[] = [
  {
    q: "What is it built with?",
    a: "React 18 and JavaScript with Vite, Tailwind CSS, shadcn/ui components (Radix) and React Router. It builds to a static site you can host anywhere.",
  },
  {
    q: "Is the login real?",
    a: "It's a working demo: accounts are kept in the browser's localStorage so the sign-up, log-in and dashboard flow works without a server (demo login: demo@schulflow.com / demo1234). Replace the functions in src/lib/auth.js with calls to your API before going live.",
  },
  {
    q: "How does the timetable generator work?",
    a: "Pick the working days, periods and class sections, assign teachers to subjects, and it places every lesson so no teacher is booked twice in a period, spreading subjects across the week.",
  },
  {
    q: "How do I change the data?",
    a: "Students, teachers, classes, invoices, exams, results and chart data live in src/data/school.js. Swap them for API calls when you connect a backend.",
  },
];

export function SchulflowPage() {
  return (
    <>
      <Helmet>
        <title>SchulFlow — Free School Management Dashboard | CodesPanda</title>
        <meta name="description" content="A free React school management template — website, pricing and a dashboard for students, attendance, a timetable generator, fees, exams and reports." />
        <meta name="keywords" content="school management system template, school dashboard react, school erp template, student management dashboard, timetable generator, education admin template" />
        <link rel="canonical" href="https://codespanda.com/templates/schulflow" />
        <meta property="og:title" content="SchulFlow — Free School Management Dashboard | CodesPanda" />
        <meta property="og:description" content="A free React school management template — website, pricing and a dashboard for students, attendance, a timetable generator, fees, exams and reports." />
        <meta property="og:url" content="https://codespanda.com/templates/schulflow" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/schulflow/hero.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SchulFlow — Free School Management Dashboard | CodesPanda" />
        <meta name="twitter:description" content="A free React school management website and dashboard with a timetable generator, fees, exams and reports." />
        <meta name="twitter:image" content="https://codespanda.com/images/schulflow/hero.webp" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "SchulFlow",
          "description": "A free React school management website and dashboard with a timetable generator, fees, exams and reports.",
          "url": "https://codespanda.com/templates/schulflow",
          "image": "https://codespanda.com/images/schulflow/hero.webp",
          "brand": { "@type": "Brand", "name": "CodesPanda" },
          "category": "Software > Templates > Admin Dashboard",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
        })}</script>
        <script type="application/ld+json">{faqJsonLd(FAQ)}</script>
      </Helmet>

      <TemplateDetail
        id="schulflow"
        githubUrl="https://github.com/codespanda/schulflow"
        updated="October 2026"
        screens={SCREENS}
        inside={INSIDE}
        faq={FAQ}
      />
    </>
  );
}
