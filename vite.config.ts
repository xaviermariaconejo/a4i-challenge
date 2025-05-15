import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { SERVER_URL } from "./src/config/constants";

// vite+vitest config
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: SERVER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      reporter: ["text", "lcov"],
    },
  },
});
