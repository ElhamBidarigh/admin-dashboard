// src/store/index.js
// ─────────────────────────────────────────────────────
// configureStore → ترکیب همه slice‌ها به یک store مرکزی
// ─────────────────────────────────────────────────────

import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./ordersSlice";

const store = configureStore({
  reducer: {
    orders: ordersReducer,   // state.orders در سراسر app
  },
});

export default store;
