import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Keep "/" for root deployments; adjust for subdirectories
  build: {
    outDir: "dist",
  },
  css: {
    postcss: "./postcss.config.cjs",
  },
});
