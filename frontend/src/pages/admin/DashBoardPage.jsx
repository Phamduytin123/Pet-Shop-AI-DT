import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Table, Select } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  DollarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AdminLayout from "../../layout/AdminLayout";
import orderService from "../../service/orderService";
import authService from "../../service/authService";
import { startOfWeek, format, startOfMonth } from "date-fns";

const DashboardPage = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [statisticType, setStatisticType] = useState("day");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountRes = await authService.getAllAccount();
        setTotalUsers(accountRes.data.length);

        const orderRes = await orderService.getListOrderAll();
        const orders = orderRes.data;

        const completedOrders = orders.filter((o) => o.status === "COMPLETED");
        const pendingOrders = orders.filter((o) => o.status === "PENDING");

        setTotalOrders(completedOrders.length);
        setPendingOrders(pendingOrders.length);

        const revenue = completedOrders.reduce(
          (sum, order) => sum + (order.totalPrice || 0),
          0
        );
        setTotalRevenue(revenue);

        const groupedData = groupOrdersByType(completedOrders, statisticType);

        const sortedTable = Object.entries(groupedData)
          .map(([date, info], idx) => ({
            key: idx + 1,
            date,
            orders: info.orders,
            revenue:
              info.revenue.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              }) || "₫0",
          }))
          .sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.includes("/")
              ? a.date.split("/").length === 3
                ? a.date.split("/")
                : ["01", ...a.date.split("/")] // "MM/yyyy" → "01/MM/yyyy"
              : ["01", "01", a.date]; // fallback
            const [dayB, monthB, yearB] = b.date.includes("/")
              ? b.date.split("/").length === 3
                ? b.date.split("/")
                : ["01", ...b.date.split("/")]
              : ["01", "01", b.date];

            const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
            const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
            return dateA - dateB;
          });

        setTableData(sortedTable);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [statisticType]);

  const groupOrdersByType = (orders, type) => {
    const result = {};

    orders.forEach((order) => {
      const createdAt = new Date(order.createdAt);
      let key = "";

      if (type === "day") {
        key = format(createdAt, "dd/MM/yyyy");
      } else if (type === "week") {
        key = format(startOfWeek(createdAt, { weekStartsOn: 1 }), "dd/MM/yyyy");
      } else if (type === "month") {
        key = format(startOfMonth(createdAt), "MM/yyyy");
      }

      if (!result[key]) {
        result[key] = { orders: 0, revenue: 0 };
      }

      result[key].orders += 1;
      result[key].revenue += order.totalPrice || 0;
    });

    return result;
  };

  const summaryData = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: <UserOutlined style={{ fontSize: 24, color: "#8c52ff" }} />,
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <ShoppingOutlined style={{ fontSize: 24, color: "#f7b500" }} />,
    },
    {
      title: "Total Revenue",
      value: totalRevenue,
      prefix: "₫",
      icon: <DollarOutlined style={{ fontSize: 24, color: "#4CAF50" }} />,
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: <ClockCircleOutlined style={{ fontSize: 24, color: "#FF7043" }} />,
    },
  ];

  const lineChartData = tableData.map((row) => ({
    name: row.date,
    revenue: Number(row.revenue.replace(/[^\d]/g, "")),
  }));

  const columns = [
    {
      title: "Time",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Number of Orders",
      dataIndex: "orders",
      key: "orders",
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
    },
  ];

  return (
    <AdminLayout>
      <div style={{ padding: 24 }}>
        <Row gutter={16}>
          {summaryData.map((item, index) => (
            <Col span={6} key={index}>
              <Card>
                <Statistic
                  title={item.title}
                  value={item.value}
                  prefix={item.prefix}
                  valueStyle={{ fontSize: 24 }}
                  suffix={item.icon}
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Row justify="end" style={{ marginBottom: 16 }}>
          <Select
            defaultValue="day"
            style={{ width: 200 }}
            onChange={(value) => setStatisticType(value)}
            options={[
              { value: "day", label: "By Date" },
              { value: "week", label: "By Week" },
              { value: "month", label: "By Month" },
            ]}
          />
        </Row>

        <Row gutter={16} style={{ marginTop: 24 }}>
          <Col span={14}>
            <Card title="Daily Revenue">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col span={10}>
            <Card title="Revenue Details">
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={false}
                size="small"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
