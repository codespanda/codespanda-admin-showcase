import { Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GradientBlobs } from "@/components/shared/GradientBlobs";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { LandingPage } from "@/components/pages/LandingPage";
import { LegalPage } from "@/components/pages/LegalPage";

function App() {
  return (
    <TooltipProvider delayDuration={150}>
      <GradientBlobs />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/legal/:slug" element={<LegalPage />} />
        {/* Unknown routes fall back to the legal not-found view */}
        <Route path="*" element={<LegalPage />} />
      </Routes>
    </TooltipProvider>
  );
}

export default App;
