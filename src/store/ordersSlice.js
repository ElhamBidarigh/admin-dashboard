// src/store/ordersSlice.js
// ─────────────────────────────────────────────────────
// Redux Toolkit Slice for order state management
//
// Key concepts:
//  • createSlice  → instead of the old switch/case, slice creates a simple reducer + action
//  • createAsyncThunk → for async actions (like fetch from API)
//  • immer (Inside the toolkit) → We can directly mutate the state, the toolkit makes it immutable
// ─────────────────────────────────────────────────────

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrders } from "../data/mockOrders";

// ── Async Thunk ──────────────────────────────────────
// loadOrders is an async action that is dispatched when:
//   1. pending → loading: true
//   2. successful → fulfilled → orders are filled
//   3. Error → rejected → error is registered 
export const loadOrders = createAsyncThunk(
  "orders/loadOrders",      // نام action
  async () => {
    const data = await fetchOrders();  // همان mock API
    return data;
  }
);

// ── Slice ────────────────────────────────────────────
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    items:        [],       // آرایه سفارشات
    loading:      false,
    error:        null,
    searchQuery:  "",       // متن جستجو
    statusFilter: "ALL",    // فیلتر وضعیت
  },

  // reducers همزمان (بدون async)
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setStatusFilter(state, action) {
      state.statusFilter = action.payload;
    },
    // تغییر وضعیت یک سفارش مستقیم در state
    updateOrderStatus(state, action) {
      const { id, status } = action.payload;
      const order = state.items.find((o) => o.id === id);
      if (order) order.status = status;
    },
  },

  // extraReducers برای async thunk
  extraReducers: (builder) => {
    builder
      .addCase(loadOrders.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items   = action.payload;
      })
      .addCase(loadOrders.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.error.message;
      });
  },
});

export const { setSearchQuery, setStatusFilter, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;

// ── Selectors ────────────────────────────────────────
// Selector: تابعی که از state فقط چیزی که نیاز داریم رو بیرون میکشه
export const selectFilteredOrders = (state) => {
  const { items, searchQuery, statusFilter } = state.orders;
  return items.filter((o) => {
    const matchSearch =
      searchQuery === "" ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "ALL" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });
};
