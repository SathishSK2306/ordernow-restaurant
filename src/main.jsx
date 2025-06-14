import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeaderProvider } from "@/providers/header-context";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeaderProvider>
      <App />
    </HeaderProvider>
  </StrictMode>
);
