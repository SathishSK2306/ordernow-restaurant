// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
//import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HeaderProvider } from "@/providers/header-context";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true, // Re-fetch when the browser regains connection
      retry: 3, // Retry failed queries up to 3 times
    },
    mutations: {
      retry: false, // Disable retries for mutations
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <QueryClientProvider client={queryClient}>
    <HeaderProvider>
      
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <App />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      
    </HeaderProvider>
  </QueryClientProvider>
  </StrictMode>
);
