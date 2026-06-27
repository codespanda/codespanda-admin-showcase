import { lazy, Suspense } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";

/* Below-the-fold sections are lazy-loaded to keep the initial bundle small. */
const Features = lazy(() =>
  import("@/components/sections/Features").then((m) => ({ default: m.Features }))
);
const DashboardPreview = lazy(() =>
  import("@/components/sections/DashboardPreview").then((m) => ({
    default: m.DashboardPreview,
  }))
);
const Modules = lazy(() =>
  import("@/components/sections/Modules").then((m) => ({ default: m.Modules }))
);
const Analytics = lazy(() =>
  import("@/components/sections/Analytics").then((m) => ({
    default: m.Analytics,
  }))
);
const AIAutomation = lazy(() =>
  import("@/components/sections/AIAutomation").then((m) => ({
    default: m.AIAutomation,
  }))
);
const Testimonials = lazy(() =>
  import("@/components/sections/Testimonials").then((m) => ({
    default: m.Testimonials,
  }))
);
const FAQ = lazy(() =>
  import("@/components/sections/FAQ").then((m) => ({ default: m.FAQ }))
);
const CallToAction = lazy(() =>
  import("@/components/sections/CallToAction").then((m) => ({
    default: m.CallToAction,
  }))
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
        href="#features"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <TrustedBy />
        <Suspense fallback={<SectionFallback />}>
          <Features />
          <DashboardPreview />
          <Modules />
          <Analytics />
          <AIAutomation />
          <Testimonials />
          <FAQ />
          <CallToAction />
        </Suspense>
      </main>

      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </>
  );
}
