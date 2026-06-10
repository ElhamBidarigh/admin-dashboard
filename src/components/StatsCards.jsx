// src/components/StatsCards.jsx
// ─────────────────────────────────────────────────────
// Statistics cards above the dashboard
// It uses useStats (React Query).
// ─────────────────────────────────────────────────────

import { Card, Col, Row, Statistic, Skeleton } from "antd";
import {
  ShoppingOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useStats } from "../hooks/useStats";

const cardStyle = { borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" };

export default function StatsCards() {
  const { data, isLoading } = useStats();

  const cards = [
    {
      title: "Total Orders",
      value: data?.total,
      icon:  <ShoppingOutlined style={{ fontSize: 28, color: "#1677ff" }} />,
      color: "#e6f4ff",
    },
    {
      title: "Delivered",
      value: data?.delivered,
      icon:  <CheckCircleOutlined style={{ fontSize: 28, color: "#52c41a" }} />,
      color: "#f6ffed",
    },
    {
      title: "Pending",
      value: data?.pending,
      icon:  <ClockCircleOutlined style={{ fontSize: 28, color: "#faad14" }} />,
      color: "#fffbe6",
    },
    {
      title: "Revenue (QAR)",
      value: data?.revenue,
      prefix: "＄",
      icon:  <DollarOutlined style={{ fontSize: 28, color: "#722ed1" }} />,
      color: "#f9f0ff",
    },
  ];

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      {cards.map((c) => (
        <Col xs={24} sm={12} lg={6} key={c.title}>
          <Card style={{ ...cardStyle, background: c.color }}>
            {isLoading ? (
              <Skeleton active paragraph={false} />
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Statistic title={c.title} value={c.value} prefix={c.prefix} />
                {c.icon}
              </div>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
}
