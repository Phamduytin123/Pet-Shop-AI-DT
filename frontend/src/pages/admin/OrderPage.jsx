import React, { useEffect, useState } from "react";
import { Card, Table, Tag, Button, Select, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout/AdminLayout";
import orderService from "../../service/orderService";
import { formatDateTime } from "../../utils/formatUtils";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../utils/commonUtils";

const { Option } = Select;

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState(null);
  const navigate = useNavigate();

  const orderStatusOptions = [
    "PENDING",
    "CONFIRMED",
    "PREPARING",
    "DELIVERING",
    "DELIVERED",
    "COMPLETED",
    "CANCELLED",
  ];

  const statusColors = {
    PENDING: "orange",
    CONFIRMED: "blue",
    PREPARING: "purple",
    DELIVERING: "cyan",
    DELIVERED: "gold",
    COMPLETED: "green",
    CANCELLED: "red",
  };

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await orderService.getListOrderAll();
        const data = res.data;
        const formattedOrders = data.map((order, index) => ({
          key: index,
          id: order.id,
          orderCode: "#" + order.orderCode,
          status: order.status,
          date: formatDateTime(order.createdAt),
          totalPrice: order.totalPrice,
          paymentMethod: order.paymentMethod,
          isPaid: order.paid,
        }));
        setOrders(formattedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchAllOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const data = { orderId, status: newStatus };
      await orderService.updateOrderStatus(data);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      showSuccessNotification(
        "Update Success",
        "Order status updated successfully"
      );
    } catch (error) {
      console.error("Update failed:", error);
      showErrorNotification("Update failed", "Failed to update status");
    }
  };

  const handlePaymentStatusChange = async (orderId, isPaid) => {
    try {
      const data = { orderId, paid: isPaid };
      await orderService.updatePaymentStatus(data);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, isPaid } : order
        )
      );
      showSuccessNotification(
        "Update Success",
        "Payment status updated successfully"
      );
    } catch (error) {
      console.error("Update failed:", error);
      showErrorNotification("Update failed", "Failed to update payment status");
    }
  };

  const filteredOrders = filteredStatus
    ? orders.filter((order) => order.status === filteredStatus)
    : orders;

  const columns = [
    {
      title: "Order Code",
      dataIndex: "orderCode",
      key: "orderCode",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record.id, value)}
          style={{ width: 160 }}
        >
          {orderStatusOptions.map((option) => (
            <Option key={option} value={option}>
              <Tag color={statusColors[option]}>{option}</Tag>
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method) => (
        <Tag color={method === "MOMO" ? "purple" : "blue"}>
          {method === "MOMO" ? "MOMO" : "COD"}
        </Tag>
      ),
    },
    {
      title: "Payment Status",
      key: "paymentStatus",
      render: (_, record) => (
        <Select
          value={record.isPaid ? "PAID" : "UNPAID"}
          onChange={(value) =>
            handlePaymentStatusChange(record.id, value === "PAID")
          }
          style={{ width: 120 }}
        >
          <Option value="PAID">
            <Tag color="green">PAID</Tag>
          </Option>
          <Option value="UNPAID">
            <Tag color="red">UNPAID</Tag>
          </Option>
        </Select>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (value) => `${value.toLocaleString()} VND`,
    },
    {
      title: "Activity",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => navigate(`/admin/orders/${record.id}`)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <MainLayout>
      <div
        style={{
          padding: 24,
          marginTop: 80,
          maxWidth: 1200,
          marginInline: "auto",
        }}
      >
        <Card
          title="All Orders"
          extra={
            <Select
              allowClear
              placeholder="Filter by Status"
              style={{ width: 200 }}
              onChange={(value) => setFilteredStatus(value)}
              value={filteredStatus}
            >
              {orderStatusOptions.map((status) => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              ))}
            </Select>
          }
        >
          <Table
            columns={columns}
            dataSource={filteredOrders}
            pagination={{ pageSize: 20, position: ["bottomCenter"] }}
            style={{ width: "100%" }}
            rowKey="orderCode"
          />
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminOrderPage;
