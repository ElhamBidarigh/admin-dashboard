// src/hooks/useStats.js
// ─────────────────────────────────────────────────────
// React Query hook برای fetch آمار dashboard
//
// چرا React Query به جای useEffect + fetch؟
//  • caching: اگه همین data رو 5 کامپوننت بخوان، یک بار fetch میشه
//  • staleTime: تا 60 ثانیه از cache جواب میده، بعد refetch می‌کنه
//  • loading/error state رو خودش manage می‌کنه
//  • refetchOnWindowFocus: وقتی tab رو focus می‌کنیم، داده رو تازه می‌کنه
// ─────────────────────────────────────────────────────

import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "../data/mockOrders";

export function useStats() {
  return useQuery({
    queryKey:  ["dashboard-stats"],   // کلید unique برای cache
    queryFn:   fetchStats,
    staleTime: 60_000,                // 60 ثانیه داده "تازه" است
    refetchOnWindowFocus: true,       // وقتی برگشتیم به tab، تازه کن
  });
}
