import MainLayout from "../../layout/MainLayout";
import React, { useState, useEffect } from "react";
import { Card, Row, Table, Image, Flex } from "antd";
import { useStateContext } from "../../context/StateContext";
import { useParams } from "react-router-dom";
import OrderStatus from "../../components/customer/OrderStatus";
import orderService from "../../service/orderService";
import { formatDateTime, formatPrice } from "../../utils/formatUtils";

const OrderDetailPage = () => {
  const [state] = useStateContext();
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [order, setOrder] = useState();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await orderService.getOrderDetailByOrderId(orderId);
        const data = res.data;
        const order = data[0]?.order;
        const formatted = data.map((detail, index) => ({
          key: index,
          stt: index + 1,
          product: {
            name: detail.item.name,
            image: detail.item.image,
          },
          price: detail.item.price,
          quantity: detail.quantity,
          total: detail.item.price * detail.quantity,
        }));
        setOrderDetails(formatted);
        setOrder(order);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      align: "center",
      render: (product) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image src={product.image} alt={product.name} width={50} />
          <span>{product.name}</span>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (value) => `${value.toLocaleString()} VND`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Total Price",
      dataIndex: "total",
      key: "total",
      align: "center",
      render: (value) => `${value.toLocaleString()} VND`,
    },
  ];
  const getStepFromStatus = (status) => {
    switch (status) {
      case "PENDING":
        return 0; // Wait for confirm
      case "CONFIRMED":
      case "PREPARING":
        return 1; // Packaging
      case "DELIVERING": // On the road
        return 2;
      case "DELIVERED":
        return 3;
      case "COMPLETED":
        return 4; // Done
      case "CANCELLED":
        return -1; // Optional: handle cancel separately
      default:
        return 0;
    }
  };

  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 24,
          marginTop: 80,
        }}
      >
        <Row
          style={{
            width: "100%",
            maxWidth: 1200,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            title="ORDER DETAILS"
            style={{
              width: "100%",
              maxWidth: 1200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Order Summary */}
            {order && (
              <Flex
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: 16,
                  marginBottom: 50,
                  padding: 25,
                  background: "#f2e2ff",
                  borderRadius: "3px",
                }}
              >
                <div style={{ textAlign: "left" }}>
                  <h2>#{order.orderCode}</h2>
                  <p>
                    {orderDetails.length} Product ・ Order placed in{" "}
                    {formatDateTime(order.createdAt)}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <h1>{formatPrice(order.totalPrice)}</h1>
                </div>
              </Flex>
            )}
            {/* order status */}
            {order && order.status !== "CANCELLED" && (
              <OrderStatus currentStep={getStepFromStatus(order.status)} />
            )}
            {order?.status === "CANCELLED" && (
              <div
                style={{
                  textAlign: "center",
                  marginTop: 24,
                  padding: 16,
                  backgroundColor: "#fff0f0",
                  color: "#cf1322",
                  borderRadius: 8,
                  fontWeight: "bold",
                }}
              >
                This order has been cancelled.
              </div>
            )}
            {/* table product */}
            <Table
              columns={columns}
              dataSource={orderDetails}
              pagination={false}
              style={{ marginTop: 24 }}
              bordered
            />
            {/* shipping address */}
            {order?.account && (
              <div
                style={{
                  marginTop: 40,
                  padding: 24,
                  backgroundColor: "#f9f9f9",
                  borderRadius: 8,
                  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h2 style={{ marginBottom: 16 }}>Shipping Address</h2>
                <p>
                  <strong>{order.account.fullName}</strong>
                </p>
                <p>
                  <strong>Address:</strong> {order.account.address}
                </p>
                <p>
                  <strong>Phone Number:</strong> {order.account.phoneNumber}
                </p>
                <p>
                  <strong>Email:</strong> {order.account.email}
                </p>
              </div>
            )}
          </Card>
        </Row>
      </div>
    </MainLayout>
  );
};

export default OrderDetailPage;
