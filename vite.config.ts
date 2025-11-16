import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate chart libraries into their own chunks
          "chart-libs": ["chart.js", "react-chartjs-2", "recharts"],
          // Separate date picker libraries
          "date-picker": ["react-multi-date-picker", "react-date-object"],
          // Separate UI libraries
          "ui-libs": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-slot",
            "lucide-react",
          ],
          // Separate utility libraries
          utils: ["clsx", "tailwind-merge", "class-variance-authority"],
        },
      },
    },
    // Increase chunk size warning limit to 1000kb for better visibility
    chunkSizeWarningLimit: 1000,
  },
});
