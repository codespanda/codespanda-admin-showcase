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
        <title>React Admin Dashboard Templates — Free &amp; Premium | CodeSpanda</title>
        <meta name="description" content="Free, production-ready React admin dashboard templates built with Vite, Tailwind CSS &amp; TypeScript. Download and ship faster." />
        <meta name="keywords" content="react admin dashboard template, free admin template, react dashboard, tailwind css admin, vite react template, typescript dashboard, shadcn ui template, open source admin panel" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://codespanda.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codespanda.com/" />
        <meta property="og:title" content="React Admin Dashboard Templates — Free &amp; Premium | CodeSpanda" />
        <meta property="og:description" content="Free, production-ready React admin dashboard templates built with Vite, Tailwind CSS and TypeScript. Download and ship faster." />
        <meta property="og:site_name" content="CodeSpanda" />
        <meta property="og:image" content="https://codespanda.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="CodeSpanda — React Admin Templates" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@codespanda" />
        <meta name="twitter:creator" content="@codespanda" />
        <meta name="twitter:title" content="React Admin Dashboard Templates — Free &amp; Premium | CodeSpanda" />
        <meta name="twitter:description" content="Free, production-ready React admin dashboard templates built with Vite, Tailwind CSS and TypeScript." />
        <meta name="twitter:image" content="https://codespanda.com/og-image.png" />
        <meta name="twitter:image:alt" content="CodeSpanda — React Admin Templates" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Are CodeSpanda templates free to use commercially?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All eight templates — Alpine Admin React, Brisk Admin, Portfolio Template, Cornerstone, Flowers POS, DeepCity Care Hospital, Eva AutoCare, and Hamara Bharat — are released under the MIT License. You can use them in client projects, white-labeled products, and commercial applications with no attribution required. All templates currently available are free; premium templates are in development."
              }
            },
            {
              "@type": "Question",
              "name": "What tech stack do the templates use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All templates are built with React 18 and Vite. Alpine Admin React uses TypeScript, Tailwind CSS, shadcn/ui component primitives, and Recharts for data visualization. Brisk Admin uses JavaScript, Tailwind CSS, and shadcn/ui. The Portfolio Template uses TypeScript, Tailwind CSS, and Framer Motion for animations."
              }
            },
            {
              "@type": "Question",
              "name": "Do the templates support dark mode?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Alpine Admin React ships with full light and dark themes out of the box — toggled via Tailwind's dark-class strategy, no configuration needed. Brisk Admin and the Portfolio Template are light-mode only by default. Tailwind's built-in dark utilities make adding a dark theme to either template straightforward."
              }
            },
            {
              "@type": "Question",
              "name": "Can I customize the colors and design tokens?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. All templates use Tailwind CSS, so colors, spacing, typography, and border radius are controlled through tailwind.config.js and CSS custom properties. Alpine Admin React and Brisk Admin follow the shadcn/ui theming convention — edit the CSS variables in one file and the change propagates across the entire template."
              }
            },
            {
              "@type": "Question",
              "name": "How do I get support or request a custom template?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "For bug reports or feature requests, open an issue on the relevant GitHub repository. For custom template work, freelance React development, or a dedicated support arrangement, reach out at contact@codespanda.com — or use the Hire Me link in the footer. Typical response time is within 48 hours."
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
