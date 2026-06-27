import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Project is served from https://<user>.github.io/codespanda-admin-showcase/
// in production, but from "/" during local dev.
// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/codespanda-admin-showcase/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
