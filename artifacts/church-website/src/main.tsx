import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setBaseUrl } from "@workspace/api-client-react";

setBaseUrl("http://localhost:3001/api");

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Missing application root element");

const requestedPath = window.location.pathname.replace(/\/+$/, "") || "/";
if (rootElement.dataset.prerenderedPath === requestedPath) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}