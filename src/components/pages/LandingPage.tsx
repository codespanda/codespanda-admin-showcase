import { lazy, Suspense } from "react";
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
const ComingSoon = lazy(() =>
  import("@/components/sections/ComingSoon").then((m) => ({ default: m.ComingSoon }))
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
        <Suspense fallback={<SectionFallback />}><ComingSoon /></Suspense>
        <Suspense fallback={<SectionFallback />}><CTABanner /></Suspense>
      </main>

      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </>
  );
}
