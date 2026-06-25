import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import workhallBlack from "./assets/workhall-black.svg";
import { BrowserRouter } from "react-router-dom";
const favicon =
  document.querySelector<HTMLLinkElement>("link[rel='icon']") ??
  document.createElement("link");

favicon.rel = "icon";
favicon.type = "image/svg+xml";
favicon.href = workhallBlack;

if (!favicon.parentNode) {
  document.head.appendChild(favicon);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
