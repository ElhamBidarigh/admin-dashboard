// src/index.js
// ─────────────────────────────────────────────────────
// Entry point — Providers are wrapped here
//
// What are providers?
//  • <Provider store>    → Gives the Redux store to all components
//  • <QueryClientProvider> → React shares the Query cache
// ─────────────────────────────────────────────────────

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./store";
import App from "./App";
import "antd/dist/reset.css";   // Basic Ant Design style

// QueryClient: Default React Query settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,   // 30 seconds
      retry:     1,        // In case of error, try again
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>              {/* Redux */}
      <QueryClientProvider client={queryClient}>  {/* React Query */}
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
