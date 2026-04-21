import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          animation: ["framer-motion"],
          charts: ["recharts", "d3-scale", "d3-shape"],
          icons: ["lucide-react"]
        }
      }
    }
  },
  server: {
    port: 5173
  }
});
