import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * Content Security Policy for the built site (GitHub Pages can't send headers, so it's a <meta> tag).
 * Build-only: the dev server needs inline scripts for hot reload. Every external host the site
 * uses is listed here; add a host before adding a new third-party script, form target or frame.
 */
const CSP = [
  "default-src 'self'",
  // 'unsafe-eval' is only for Razorpay's payment button, which builds its form with eval.
  // Inline scripts stay blocked (PayPal's SDK tries one; its button works without it).
  "script-src 'self' 'unsafe-eval' https://www.googletagmanager.com https://*.paypal.com https://*.paypalobjects.com https://checkout.razorpay.com https://*.razorpay.com",
  // Inline style attributes are used throughout the React components and animation library.
  "style-src 'self' 'unsafe-inline' https://*.paypal.com https://*.paypalobjects.com https://*.razorpay.com",
  // Portfolio shots come from Dribbble's CDN; the studio previews blob: and data: images.
  "img-src 'self' data: blob: https:",
  // Razorpay's button asks for a Google Fonts stylesheet; it stays blocked (falls back to a system font) so visitors' IPs don't go to Google.
  "font-src 'self' data: https://*.paypalobjects.com https://*.razorpay.com",
  "media-src 'self' blob:",
  "connect-src 'self' https://formsubmit.co https://api.github.com https://raw.githubusercontent.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://stats.g.doubleclick.net https://www.google.com https://*.paypal.com https://razorpay.com https://*.razorpay.com",
  "frame-src 'self' https://formsubmit.co https://*.paypal.com https://razorpay.com https://*.razorpay.com",
  "form-action 'self' https://formsubmit.co https://*.paypal.com https://razorpay.com https://*.razorpay.com",
  "object-src 'none'",
  "base-uri 'self'",
  "upgrade-insecure-requests",
].join("; ");

function securityMeta(): Plugin {
  return {
    name: "codespanda-security-meta",
    apply: "build",
    transformIndexHtml(html) {
      return html.replace(
        /<meta charset="UTF-8" \/>/,
        [
          `<meta charset="UTF-8" />`,
          `    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`,
          `    <meta name="referrer" content="strict-origin-when-cross-origin" />`,
        ].join("\n")
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), securityMeta()],
  server: { port: parseInt(process.env.PORT ?? "5173") },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react":  ["react", "react-dom", "react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-radix":  [
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-slot",
          ],
          "vendor-icons":  ["lucide-react"],
        },
      },
    },
  },
});
