import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Table } from "antd";
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

const DashboardPage = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

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

        const revenueByDate = {};
        completedOrders.forEach((order) => {
          const date = new Date(order.createdAt).toLocaleDateString("en-GB");
          if (!revenueByDate[date]) {
            revenueByDate[date] = { orders: 0, revenue: 0 };
          }
          revenueByDate[date].orders += 1;
          revenueByDate[date].revenue += order.totalPrice || 0;
        });

        // const table = Object.entries(revenueByDate).map(
        //   ([date, info], idx) => ({
        //     key: idx + 1,
        //     date,
        //     orders: info.orders,
        //     revenue:
        //       info.revenue.toLocaleString("en-US", {
        //         style: "currency",
        //         currency: "VND",
        //       }) || "₫0",
        //   })
        // );

        // setTableData(table);
        const sortedTable = Object.entries(revenueByDate)
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
          // Sắp xếp theo ngày, vì date ở dạng "dd/mm/yyyy" nên chuyển thành Date để so sánh đúng
          .sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.split("/");
            const [dayB, monthB, yearB] = b.date.split("/");
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
  }, []);

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
      title: "Date",
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
