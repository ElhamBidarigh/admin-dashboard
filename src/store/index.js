// src/store/index.js
// ─────────────────────────────────────────────────────
// configureStore → Combining all slices into a central store
// ─────────────────────────────────────────────────────

import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./ordersSlice";

const store = configureStore({
  reducer: {
    orders: ordersReducer,   // state.orders throughout the app
  },
});

export default store;
