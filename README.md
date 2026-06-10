# Admin Ops Dashboard

A production-style order management dashboard built for a food delivery super app context.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18 |
| Global State | Redux Toolkit (createSlice, createAsyncThunk) |
| Server State | React Query v5 (useQuery, staleTime, cache) |
| UI Library | Ant Design 5 |
| Charts | Recharts (AreaChart) |

## Features

- **Stats Cards** — live totals (orders, delivered, pending, revenue) via React Query
- **Weekly Revenue Chart** — area chart with dual Y-axis
- **Orders Table** — search, filter by status, inline status update, sortable columns, pagination
- **Redux State** — orders loaded via async thunk, filtered via selector, status updated optimistically

## Architecture Decisions

### Why Redux Toolkit for orders, React Query for stats?

**Redux Toolkit** manages the orders list because:
- We need to mutate individual order statuses locally (optimistic update)
- Multiple components need to read/write the same list

**React Query** manages stats because:
- Stats are read-only server data
- We benefit from automatic caching and background refetch

This separation mirrors real-world patterns at companies like Snoonu.

## Quick Start

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── components/
│   ├── StatsCards.jsx     # 4 KPI cards using React Query
│   ├── RevenueChart.jsx   # Recharts AreaChart using React Query
│   └── OrdersTable.jsx    # Ant Design Table using Redux
├── store/
│   ├── index.js           # configureStore
│   └── ordersSlice.js     # createSlice + createAsyncThunk + selector
├── hooks/
│   └── useStats.js        # React Query useQuery hook
├── data/
│   └── mockOrders.js      # Mock API (replace with real API)
└── App.jsx                # Layout + composition
```
