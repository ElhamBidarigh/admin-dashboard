// src/hooks/useStats.js
// ─────────────────────────────────────────────────────
// React Query hook to fetch dashboard statistics
//
// why React Query instead of useEffect + fetch?
//  • caching: If you read the same data in 5 components, it will be fetched once
//  • staleTime: It answers from cache for 60 seconds, then it refetches
//  • It manages the loading/error state by itself
//  • refetchOnWindowFocus: When we focus the tab, it refreshes the data
// ─────────────────────────────────────────────────────

import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "../data/mockOrders";

export function useStats() {
  return useQuery({
    queryKey:  ["dashboard-stats"],   // Unique key for cache
    queryFn:   fetchStats,
    staleTime: 60_000,                // 60 seconds of data is "fresh"
    refetchOnWindowFocus: true,       // When we go back to the tab, refresh
  });
}
