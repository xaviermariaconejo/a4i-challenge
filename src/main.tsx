import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Providers } from "./Providers.tsx";
import { Home } from "./pages/Home/index.tsx";

// TODO: Add react router dom and render Routes instead of Home
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <Home />
    </Providers>
  </StrictMode>
);
