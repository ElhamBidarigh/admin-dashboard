// src/components/RevenueChart.jsx
// ─────────────────────────────────────────────────────
// نمودار درآمد هفتگی با Recharts
// ─────────────────────────────────────────────────────

import { Card, Skeleton } from "antd";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { useStats } from "../hooks/useStats";

export default function RevenueChart() {
  const { data, isLoading } = useStats();

  return (
    <Card
      title="Weekly Revenue & Orders"
      style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 24 }}
    >
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
        // ResponsiveContainer: نمودار را به اندازه container تنظیم می‌کند
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data?.weekly} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              {/* gradient برای area fill */}
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#1677ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1677ff" stopOpacity={0}   />
              </linearGradient>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#52c41a" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#52c41a" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left"  tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}
            />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#1677ff"
              strokeWidth={2}
              fill="url(#colorRevenue)"
              name="Revenue (QAR)"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              stroke="#52c41a"
              strokeWidth={2}
              fill="url(#colorOrders)"
              name="Orders"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
