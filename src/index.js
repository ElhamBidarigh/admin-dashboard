// src/index.js
// ─────────────────────────────────────────────────────
// Entry point — اینجا Provider‌ها wrap می‌شوند
//
// Provider‌ها چیستند؟
//  • <Provider store>    → Redux store را به همه component‌ها می‌دهد
//  • <QueryClientProvider> → React Query cache را share می‌کند
// ─────────────────────────────────────────────────────

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./store";
import App from "./App";
import "antd/dist/reset.css";   // استایل پایه Ant Design

// QueryClient: تنظیمات پیش‌فرض React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,   // 30 ثانیه
      retry:     1,        // در صورت خطا یک بار دیگر تلاش کن
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
