import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/VibeVastra/",   // <-- MUST MATCH YOUR EXACT REPO NAME
  build: {
    outDir: "docs",        // <-- GitHub Pages will read from /docs
  },
  plugins: [react()],
});
