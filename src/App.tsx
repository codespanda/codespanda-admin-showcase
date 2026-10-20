import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { LandingPage } from "@/components/pages/LandingPage";
import { LegalPage } from "@/components/pages/LegalPage";

const TemplatesPage       = lazy(() => import("@/components/pages/TemplatesPage").then(m => ({ default: m.TemplatesPage })));
const FinovoPage          = lazy(() => import("@/components/pages/FinovoPage").then(m => ({ default: m.FinovoPage })));
const TemplatePage        = lazy(() => import("@/components/pages/TemplatePage").then(m => ({ default: m.TemplatePage })));
const TemplateDocsPage    = lazy(() => import("@/components/pages/TemplateDocsPage").then(m => ({ default: m.TemplateDocsPage })));
const StudioPage          = lazy(() => import("@/components/pages/StudioPage").then(m => ({ default: m.StudioPage })));
const DeepakPortfolioPage = lazy(() => import("@/components/pages/DeepakPortfolioPage").then(m => ({ default: m.DeepakPortfolioPage })));
const PortfolioShotPage   = lazy(() => import("@/components/pages/PortfolioShotPage").then(m => ({ default: m.PortfolioShotPage })));
const ProjectsPage        = lazy(() => import("@/components/pages/ProjectsPage").then(m => ({ default: m.ProjectsPage })));
const ServicesPage        = lazy(() => import("@/components/pages/ServicesPage").then(m => ({ default: m.ServicesPage })));
const BlogPage            = lazy(() => import("@/components/pages/BlogPage").then(m => ({ default: m.BlogPage })));
const BlogPostPage        = lazy(() => import("@/components/pages/BlogPostPage").then(m => ({ default: m.BlogPostPage })));

function App() {
  return (
    <TooltipProvider delayDuration={150}>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/templates" element={<Suspense><TemplatesPage /></Suspense>} />
        <Route path="/templates/finovo" element={<Suspense><FinovoPage /></Suspense>} />
        <Route path="/templates/:slug" element={<Suspense><TemplatePage /></Suspense>} />
        <Route path="/templates/:slug/docs" element={<Suspense><TemplateDocsPage /></Suspense>} />
        {/* Not linked anywhere and noindex: the content studio. */}
        <Route path="/studio" element={<Suspense><StudioPage /></Suspense>} />
        <Route path="/portfolio" element={<Suspense><DeepakPortfolioPage /></Suspense>} />
        <Route path="/portfolio/:shotId" element={<Suspense><PortfolioShotPage /></Suspense>} />
        <Route path="/projects" element={<Suspense><ProjectsPage /></Suspense>} />
        <Route path="/services" element={<Suspense><ServicesPage /></Suspense>} />
        <Route path="/blog" element={<Suspense><BlogPage /></Suspense>} />
        <Route path="/blog/:slug" element={<Suspense><BlogPostPage /></Suspense>} />
        <Route path="/legal/:slug" element={<LegalPage />} />
        <Route path="*" element={<LegalPage />} />
      </Routes>
    </TooltipProvider>
  );
}

export default App;
