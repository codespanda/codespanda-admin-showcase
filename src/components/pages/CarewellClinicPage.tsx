import { Helmet } from "react-helmet-async";
import { TemplateDetail } from "@/components/site/TemplateDetail";
import { faqJsonLd, type FaqItem } from "@/components/site/FaqSection";

const SCREENS: { src: string; label: string }[] = [
  { src: "/images/carewell/hero.webp", label: "Home" },
  { src: "/images/carewell/packages.webp", label: "Health packages" },
  { src: "/images/carewell/doctors.webp", label: "Doctors" },
];

const INSIDE = [
  {
    label: "Header & hero",
    desc: "Sticky nav with click-to-call and Book Appointment, a doctor banner, trust badges, and an info bar with hours, location and emergency line.",
  },
  {
    label: "Services",
    desc: "Eight specialities — consultation, pediatrics, gynecology, dermatology, cardiology, orthopedics, dental and lab — each with its own page.",
  },
  {
    label: "Doctors",
    desc: "Directory of eight doctors with a speciality filter, qualifications, experience and booking buttons.",
  },
  {
    label: "Health packages",
    desc: "Six check-up packages with prices, discounts, included tests and a Most Popular highlight.",
  },
  {
    label: "Lab reports",
    desc: "Look up test status and download reports by report ID or mobile number.",
  },
  {
    label: "Appointment booking",
    desc: "Patient details, service, doctor, preferred date and time, with a confirmation screen.",
  },
  {
    label: "Blog, gallery & careers",
    desc: "Six health articles, an eight-photo gallery, and five job openings with perks.",
  },
  {
    label: "About, contact & FAQ",
    desc: "Clinic story and stats, contact cards and form, and a FAQ page with 13 questions in four groups.",
  },
  {
    label: "Footer & legal",
    desc: "Quick links, services, contact details and hours, patient reviews on the home page, plus privacy policy and terms pages.",
  },
];

const FAQ: FaqItem[] = [
  {
    q: "What is it built with?",
    a: "React 18 with Vite, Tailwind CSS v4, shadcn/ui components and React Router, written in JavaScript. It builds to a static site you can host anywhere.",
  },
  {
    q: "Does it only suit general clinics?",
    a: "No — it works for multi-speciality clinics, dental and skin clinics, physiotherapy centres, diagnostic labs and small hospitals. Services, doctors, posts and contact details are plain data, so swap them for your own.",
  },
  {
    q: "Do the forms and the report lookup work out of the box?",
    a: "They work as a front end: the appointment and contact forms show a confirmation, and the report lookup searches sample reports. Connect them to your form service, booking system and lab system in src/pages/Appointment.jsx, Contact.jsx and Reports.jsx.",
  },
  {
    q: "How do I change the content?",
    a: "Content lives in two data files: src/data/site.js for contact details, navigation, services, doctors, testimonials, blog posts and stats, and src/data/extra.js for packages, sample reports, gallery, jobs and FAQs. Pages update automatically.",
  },
];

export function CarewellClinicPage() {
  return (
    <>
      <Helmet>
        <title>CareWell Clinic — Free Clinic Website Template | CodesPanda</title>
        <meta name="description" content="A free React clinic website template — services, doctors, health packages, lab report lookup, appointment booking, blog and contact pages in a calm teal design." />
        <meta name="keywords" content="clinic website template, medical website template, doctor website template, hospital website react, healthcare template free, appointment booking template" />
        <link rel="canonical" href="https://codespanda.com/templates/carewell-clinic" />
        <meta property="og:title" content="CareWell Clinic — Free Clinic Website Template | CodesPanda" />
        <meta property="og:description" content="A free React clinic website template — services, doctors, health packages, lab report lookup, appointment booking, blog and contact pages in a calm teal design." />
        <meta property="og:url" content="https://codespanda.com/templates/carewell-clinic" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/carewell/hero.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CareWell Clinic — Free Clinic Website Template | CodesPanda" />
        <meta name="twitter:description" content="A free React clinic website template with a doctors directory, appointment booking and a health blog." />
        <meta name="twitter:image" content="https://codespanda.com/images/carewell/hero.webp" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "CareWell Clinic",
          "description": "A free React clinic website template with a doctors directory, appointment booking and a health blog.",
          "url": "https://codespanda.com/templates/carewell-clinic",
          "image": "https://codespanda.com/images/carewell/hero.webp",
          "brand": { "@type": "Brand", "name": "CodesPanda" },
          "category": "Software > Templates > Website",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
        })}</script>
        <script type="application/ld+json">{faqJsonLd(FAQ)}</script>
      </Helmet>

      <TemplateDetail
        id="carewell-clinic"
        githubUrl="https://github.com/codespanda/carewell-clinic"
        updated="October 2026"
        screens={SCREENS}
        inside={INSIDE}
        faq={FAQ}
      />
    </>
  );
}
