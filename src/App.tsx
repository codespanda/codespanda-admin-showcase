import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GradientBlobs } from "@/components/shared/GradientBlobs";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { LandingPage } from "@/components/pages/LandingPage";
import { LegalPage } from "@/components/pages/LegalPage";

const AlpineAdminPage     = lazy(() => import("@/components/pages/AlpineAdminPage").then(m => ({ default: m.AlpineAdminPage })));
const BriskAdminPage      = lazy(() => import("@/components/pages/BriskAdminPage").then(m => ({ default: m.BriskAdminPage })));
const PortfolioTemplatePage = lazy(() => import("@/components/pages/PortfolioTemplatePage").then(m => ({ default: m.PortfolioTemplatePage })));
const CornerstonePage     = lazy(() => import("@/components/pages/CornerstonePage").then(m => ({ default: m.CornerstonePage })));
const TemplatesPage       = lazy(() => import("@/components/pages/TemplatesPage").then(m => ({ default: m.TemplatesPage })));

function App() {
  return (
    <TooltipProvider delayDuration={150}>
      <GradientBlobs />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/templates" element={<Suspense><TemplatesPage /></Suspense>} />
        <Route path="/templates/Alpine-Admin-React" element={<Suspense><AlpineAdminPage /></Suspense>} />
        <Route path="/templates/Brisk-Admin" element={<Suspense><BriskAdminPage /></Suspense>} />
        <Route path="/templates/portfolio-template" element={<Suspense><PortfolioTemplatePage /></Suspense>} />
        <Route path="/templates/portfolio" element={<Suspense><PortfolioTemplatePage /></Suspense>} />
        <Route path="/templates/cornerstone" element={<Suspense><CornerstonePage /></Suspense>} />
        <Route path="/legal/:slug" element={<LegalPage />} />
        <Route path="*" element={<LegalPage />} />
      </Routes>
    </TooltipProvider>
  );
}

export default App;
