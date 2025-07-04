import MainLayout from "../../layout/MainLayout";
import React, { useState, useEffect } from "react";
import { Card, Row, Table, Image, Flex, Button, message, Modal } from "antd";
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
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [payLoading, setPayLoading] = useState(false);

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

  const handleCancelOrder = async () => {
    setLoading(true);
    try {
      const numericOrderId = Number(orderId);
      if (isNaN(numericOrderId)) {
        throw new Error("Invalid order ID");
      }
      const res1 = await orderService.cancelOrderById(numericOrderId);
      message.success("Order has been cancelled successfully");
      // Refresh order data
      const res = await orderService.getOrderDetailByOrderId(orderId);
      const data = res.data;
      const updatedOrder = data[0]?.order;
      setOrder(updatedOrder);
    } catch (error) {
      console.log(error);
      message.error("Failed to cancel order");
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  const showCancelConfirm = () => {
    setModalVisible(true);
  };

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
  const handlePayAgain = async () => {
    setPayLoading(true);
    try {
      const numericOrderId = Number(orderId);
      if (isNaN(numericOrderId)) {
        throw new Error("Invalid order ID");
      }
      console.log(orderId);

      const response = await orderService.createPaymentByOrder(numericOrderId);
      if (response.payUrl) {
        window.location.href = response.payUrl;
      }
    } catch (error) {
      message.error("Failed to process payment. Please try again.");
      console.error("Payment error:", error);
    } finally {
      setPayLoading(false);
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
              position: "relative", // Added for absolute positioning of button
            }}
            extra={
              order?.status === "PENDING" && (
                <Button
                  type="primary"
                  danger
                  onClick={showCancelConfirm}
                  style={{ backgroundColor: "#ff4d4f", borderColor: "#ffccc7" }}
                >
                  Cancel Order
                </Button>
              )
            }
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
                  backgroundColor: "#FBF6FF",
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
                {order?.paymentMethod === "MOMO" && !order?.paid && (
                  <div
                    style={{
                      position: "absolute",
                      right: 48,
                      bottom: 48,
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={handlePayAgain}
                      loading={payLoading}
                      style={{
                        backgroundColor: "#410075",
                        color: "#fff",
                        fontWeight: "bold",
                        padding: "0 24px",
                        height: 40,
                      }}
                    >
                      Pay Again
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>
        </Row>
      </div>

      {/* Cancel Order Confirmation Modal */}
      <Modal
        title="Confirm Cancellation"
        visible={modalVisible}
        onOk={handleCancelOrder}
        onCancel={() => setModalVisible(false)}
        confirmLoading={loading}
      >
        <p>Are you sure you want to cancel this order?</p>
      </Modal>
    </MainLayout>
  );
};

export default OrderDetailPage;
