import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ThemeProvider } from "./hooks/use-theme.tsx";
import "./index.css";

// Strip the trailing slash so react-router's basename is "/codespanda-admin-showcase"
// in production and "/" during local dev.
const basename = import.meta.env.BASE_URL.replace(/\/+$/, "") || "/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="nexus-theme">
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
