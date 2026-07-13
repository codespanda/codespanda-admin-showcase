import { Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GradientBlobs } from "@/components/shared/GradientBlobs";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { LandingPage } from "@/components/pages/LandingPage";
import { LegalPage } from "@/components/pages/LegalPage";
import { AlpineAdminPage } from "@/components/pages/AlpineAdminPage";
import { BriskAdminPage } from "@/components/pages/BriskAdminPage";
import { PortfolioTemplatePage } from "@/components/pages/PortfolioTemplatePage";
import { CornerstonePage } from "@/components/pages/CornerstonePage";

function App() {
  return (
    <TooltipProvider delayDuration={150}>
      <GradientBlobs />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/templates/Alpine-Admin-React" element={<AlpineAdminPage />} />
        <Route path="/templates/Brisk-Admin" element={<BriskAdminPage />} />
        <Route path="/templates/portfolio-template" element={<PortfolioTemplatePage />} />
        {/* Redirect legacy URL — render the same page so old links don't 404 */}
        <Route path="/templates/portfolio" element={<PortfolioTemplatePage />} />
        <Route path="/templates/cornerstone" element={<CornerstonePage />} />
        <Route path="/legal/:slug" element={<LegalPage />} />
        {/* Unknown routes fall back to the legal not-found view */}
        <Route path="*" element={<LegalPage />} />
      </Routes>
    </TooltipProvider>
  );
}

export default App;
