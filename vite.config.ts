import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/stream": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true,
        configure: (proxy, _options) => {
          // Para peticiones HTTP polling
          proxy.on("proxyReq", (proxyReq, req, res) => {
            if (req.url?.startsWith("/stream")) {
              proxyReq.setHeader("x-api-key", "your-secure-api-key" || "");
            }
          });
          // Para el upgrade de WebSocket
          proxy.on("proxyReqWs", (proxyReq, req, socket, head) => {
            proxyReq.setHeader("x-api-key", "your-secure-api-key" || "");
          });
        },
      },
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
