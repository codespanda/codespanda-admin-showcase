import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";

const FeaturedTemplates = lazy(() =>
  import("@/components/sections/FeaturedTemplates").then((m) => ({ default: m.FeaturedTemplates }))
);
const CategoriesSection = lazy(() =>
  import("@/components/sections/CategoriesSection").then((m) => ({ default: m.CategoriesSection }))
);
const WhyUs = lazy(() =>
  import("@/components/sections/WhyUs").then((m) => ({ default: m.WhyUs }))
);
const TechStackSection = lazy(() =>
  import("@/components/sections/TechStackSection").then((m) => ({ default: m.TechStackSection }))
);
const HomepageFAQ = lazy(() =>
  import("@/components/sections/HomepageFAQ").then((m) => ({ default: m.HomepageFAQ }))
);
const CTABanner = lazy(() =>
  import("@/components/sections/CTABanner").then((m) => ({ default: m.CTABanner }))
);
const Footer = lazy(() =>
  import("@/components/sections/Footer").then((m) => ({ default: m.Footer }))
);

function SectionFallback() {
  return <div className="h-72 w-full animate-pulse bg-secondary/30" />;
}

export function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard Templates &amp; UI Kits | CodeSpanda</title>
        <meta name="description" content="Premium &amp; free admin dashboard templates built with React, Vite &amp; Tailwind. Modern dashboard design for SaaS, CRM, HR, POS &amp; more — ship faster." />
        <meta name="keywords" content="admin dashboard template, react admin dashboard, free admin template, dashboard design, theme admin, template administrator panel, saas dashboard, crm dashboard, hr dashboard, pos template" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://codespanda.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codespanda.com/" />
        <meta property="og:title" content="Admin Dashboard Templates &amp; UI Kits | CodeSpanda" />
        <meta property="og:description" content="Premium &amp; free admin dashboard templates built with React, Vite &amp; Tailwind. Modern dashboard design for SaaS, CRM, HR, POS &amp; more — ship faster." />
        <meta property="og:site_name" content="CodeSpanda" />
        <meta property="og:image" content="https://codespanda.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="CodeSpanda — React Admin Templates" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@codespanda" />
        <meta name="twitter:creator" content="@codespanda" />
        <meta name="twitter:title" content="Admin Dashboard Templates &amp; UI Kits | CodeSpanda" />
        <meta name="twitter:description" content="Premium &amp; free admin dashboard templates built with React, Vite &amp; Tailwind. Modern dashboard design for SaaS, CRM, HR, POS &amp; more." />
        <meta name="twitter:image" content="https://codespanda.com/og-image.png" />
        <meta name="twitter:image:alt" content="CodeSpanda — React Admin Templates" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is an admin dashboard template?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "An admin dashboard template is a pre-built front-end codebase that gives you the complete UI shell of an admin panel — sidebar navigation, data tables, charts, forms, and authentication layouts — without building it from scratch. CodeSpanda admin dashboard templates are built with React, Vite, and Tailwind CSS so you get a production-ready starting point for any internal tool, SaaS back-office, or client portal."
              }
            },
            {
              "@type": "Question",
              "name": "Are your admin templates free or paid?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Every admin dashboard template in the current library is completely free and released under the MIT License. You can use them in commercial client projects, white-label them, or build SaaS products on top — no attribution required. Premium dashboard templates with extended page sets and additional modules are in development."
              }
            },
            {
              "@type": "Question",
              "name": "Can I customize the theme admin colors and branding?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. All templates follow the shadcn/ui theming convention: change the CSS custom properties in one file and every component updates automatically. You can swap primary, accent, background, and surface tokens in minutes to match any brand. Tailwind's config file gives you full control over the type scale, border radius, and spacing."
              }
            },
            {
              "@type": "Question",
              "name": "Do I need a backend to use a template administrator panel?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Every template ships with static mock data so you can run it immediately with just npm install && npm run dev. When you're ready to connect a real backend, replace the mock data layer with your own API calls — REST or GraphQL. The templates have no opinion about the backend, so they work equally well with Node.js, Laravel, Django, or any headless CMS."
              }
            }
          ]
        })}</script>
      </Helmet>

      <a
        href="#templates"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />

        <Suspense fallback={<SectionFallback />}><FeaturedTemplates /></Suspense>
        <Suspense fallback={<SectionFallback />}><CategoriesSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><WhyUs /></Suspense>
        <Suspense fallback={<SectionFallback />}><TechStackSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><HomepageFAQ /></Suspense>
        <Suspense fallback={<SectionFallback />}><CTABanner /></Suspense>
      </main>

      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </>
  );
}
