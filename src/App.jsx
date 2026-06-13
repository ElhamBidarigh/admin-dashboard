// src/App.jsx
// ─────────────────────────────────────────────────────
// Main App — Overall Dashboard Layout
// ─────────────────────────────────────────────────────

import { Layout, Typography, Avatar, Space } from "antd";
import { DeploymentUnitOutlined } from "@ant-design/icons";
import StatsCards   from "./components/StatsCards";
import RevenueChart from "./components/RevenueChart";
import OrdersTable  from "./components/OrdersTable";

const { Header, Content } = Layout;
const { Title, Text }     = Typography;

export default function App() {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {/* ── Header ── */}
      <Header
        style={{
          background:    "#001529",
          padding:       "0 24px",
          display:       "flex",
          alignItems:    "center",
          justifyContent:"space-between",
          position:      "sticky",
          top:           0,
          zIndex:        100,
        }}
      >
        <Space>
          <DeploymentUnitOutlined style={{ color: "#1677ff", fontSize: 24 }} />
          <Title level={4} style={{ color: "#fff", margin: 0 }}>
            Snoonu Ops Dashboard
          </Title>
        </Space>
        <Space>
          <Text style={{ color: "#aaa", fontSize: 12 }}>Qatar · Live</Text>
          <Avatar style={{ background: "#1677ff" }}>E</Avatar>
        </Space>
      </Header>

      {/* ── Content ── */}
      <Content style={{ padding: "24px", maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <Title level={5} style={{ marginBottom: 16, color: "#666" }}>
          Overview — Today
        </Title>

        {/* General statistics */}
        <StatsCards />

        {/* Income chart */}
        <RevenueChart />

        {/* Orders table */}
        <OrdersTable />
      </Content>
    </Layout>
  );
}
