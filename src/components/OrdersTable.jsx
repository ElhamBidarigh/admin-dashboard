// src/components/OrdersTable.jsx
// ─────────────────────────────────────────────────────
// Table of orders — the heart of the dashboard
//
// Redux:
//  • useSelector  → read state from store
//  • useDispatch  → dispatch action to change state
//
// This component also uses Redux (for list + filter).
// And also Ant Design (Table, Tag, Select)
// ─────────────────────────────────────────────────────

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Table, Tag, Select, Input, Space, Button, Tooltip } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import {
  loadOrders,
  setSearchQuery,
  setStatusFilter,
  updateOrderStatus,
  selectFilteredOrders,
} from "../store/ordersSlice";
import { STATUSES } from "../data/mockOrders";

const { Option } = Select;

export default function OrdersTable() {
  const dispatch  = useDispatch();
  // useSelector: Only the part of the state that we need
  const filtered  = useSelector(selectFilteredOrders);
  const loading   = useSelector((s) => s.orders.loading);
  const search    = useSelector((s) => s.orders.searchQuery);
  const filter    = useSelector((s) => s.orders.statusFilter);

  // Load the data first
  useEffect(() => {
    dispatch(loadOrders());
  }, [dispatch]);

  const columns = [
    {
      title:     "Order ID",
      dataIndex: "id",
      key:       "id",
      width:     120,
      render:    (id) => <code style={{ fontSize: 12 }}>{id}</code>,
    },
    {
      title:     "Customer",
      dataIndex: "customer",
      key:       "customer",
    },
    {
      title:     "Restaurant",
      dataIndex: "restaurant",
      key:       "restaurant",
    },
    {
      title:     "Area",
      dataIndex: "area",
      key:       "area",
    },
    {
      title:     "Items",
      dataIndex: "items",
      key:       "items",
      width:     70,
      align:     "center",
    },
    {
      title:     "Total (QAR)",
      dataIndex: "total",
      key:       "total",
      width:     110,
      align:     "right",
      sorter:    (a, b) => a.total - b.total,
      render:    (v) => `${v} QAR`,
    },
    {
      title:     "Status",
      dataIndex: "status",
      key:       "status",
      width:     130,
      render:    (status, record) => (
        // Change state directly from table → dispatch to Redux
        <Select
          value={status}
          size="small"
          style={{ width: 120 }}
          onChange={(val) => dispatch(updateOrderStatus({ id: record.id, status: val }))}
        >
          {Object.entries(STATUSES).map(([key, { label }]) => (
            <Option key={key} value={key}>{label}</Option>
          ))}
        </Select>
      ),
    },
    {
      title:     "ETA",
      dataIndex: "eta",
      key:       "eta",
      width:     70,
      align:     "center",
      render:    (eta) => `${eta} min`,
    },
  ];

  return (
    <Card
      title="Orders"
      style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      extra={
        <Tooltip title="Reload orders">
          <Button
            icon={<ReloadOutlined />}
            onClick={() => dispatch(loadOrders())}
            loading={loading}
          />
        </Tooltip>
      }
    >
      {/* Toolbar: search + status filter */}
      <Space style={{ marginBottom: 16, flexWrap: "wrap" }}>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search by ID, customer, or restaurant…"
          value={search}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          style={{ width: 300 }}
          allowClear
        />
        <Select
          value={filter}
          onChange={(val) => dispatch(setStatusFilter(val))}
          style={{ width: 160 }}
        >
          <Option value="ALL">All statuses</Option>
          {Object.entries(STATUSES).map(([key, { label, color }]) => (
            <Option key={key} value={key}>
              <Tag color={color}>{label}</Tag>
            </Option>
          ))}
        </Select>
      </Space>

      <Table
        dataSource={filtered}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        size="small"
        scroll={{ x: 900 }}
      />
    </Card>
  );
}
