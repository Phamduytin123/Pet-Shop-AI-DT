import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table, Button, Tag, Flex } from "antd";
import { useStateContext } from "../../context/StateContext";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import orderService from "../../service/orderService";
import { formatDateTime } from "../../utils/formatUtils";
import totalOrderIcon from "../../assets/svgs/totalOrderLogo.svg";
import deliveringOrderIcon from "../../assets/svgs/deliveringLogo.svg";
import completedOrderIcon from "../../assets/svgs/completedLogo.svg";
import authService from "../../service/authService";
const OrderPage = () => {
  const [state] = useStateContext();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [account, setAccount] = useState(state.account);
  const [totalOrder, setTotalOrder] = useState(0);
  const [deliveringOrder, setDeliveringOrder] = useState(0);
  const [completedOrder, setCompletedOrder] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderService.getOrder();
        const data = res.data;
        const accountData = state.account;
        const formattedOrders = data.map((order, index) => ({
          key: index,
          id: order.id,
          orderCode: "#" + order.orderCode,
          status: order.status,
          date: formatDateTime(order.createdAt),
          totalPrice: order.totalPrice,
        }));
        setOrders(formattedOrders);
        setAccount(accountData);
        setTotalOrder(formattedOrders.length);
        setDeliveringOrder(
          formattedOrders.filter((o) => o.status === "DELIVERING").length
        );
        setCompletedOrder(
          formattedOrders.filter((o) => o.status === "COMPLETED").length
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

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
      render: (status) => {
        let color = "geekblue";
        if (status === "COMPLETED") color = "green";
        else if (status === "CANCELLED") color = "red";
        else if (status === "PENDING") color = "orange";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
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
        <Button type="link" onClick={() => navigate(`/orders/${record.id}`)}>
          View Details
        </Button>
      ),
    },
  ];

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
          {/* Account Info */}
          <Flex
            justify="space-between"
            align="stretch"
            style={{ width: "100%", marginBottom: 32 }}
            gap={35}
          >
            <Card title="Account Information" style={{ flex: 1 }}>
              <h3>{account?.full_name}</h3>
              <p>Email: {account?.email}</p>
              <p>Phone: {account?.phone_number}</p>
              <Button>Information update</Button>
            </Card>

            <Card title="Order Address" style={{ flex: 1 }}>
              <h3>{account?.full_name}</h3>
              <p>Address: {account?.address}</p>
              <p>Phone: {account?.phone_number}</p>
              <p>Email: {account?.email}</p>
              <Button>Address update</Button>
            </Card>

            <div
              style={{
                flex: 1,
                padding: 16,
                borderRadius: 8,
                background: "#fff",
                border: "1px solid #f0f0f0",
              }}
            >
              <Flex vertical gap={5}>
                <Flex
                  align="center"
                  gap={16}
                  style={{
                    background: "#EAF6FE",
                    padding: "12px",
                    borderRadius: 8,
                  }}
                >
                  <img src={totalOrderIcon} alt="" style={{ width: 40 }} />
                  <div>
                    <h3>{totalOrder}</h3>
                    <p style={{ margin: 0 }}>Total Order</p>
                  </div>
                </Flex>
                <Flex
                  align="center"
                  gap={16}
                  style={{
                    background: "#FFF3EB",
                    padding: "12px",
                    borderRadius: 8,
                  }}
                >
                  <img src={deliveringOrderIcon} alt="" style={{ width: 40 }} />
                  <div>
                    <h3>{deliveringOrder}</h3>
                    <p style={{ margin: 0 }}>Delivering Order</p>
                  </div>
                </Flex>
                <Flex
                  align="center"
                  gap={16}
                  style={{
                    background: "#EAF7E9",
                    padding: "12px",
                    borderRadius: 8,
                  }}
                >
                  <img src={completedOrderIcon} alt="" style={{ width: 40 }} />
                  <div>
                    <h3>{completedOrder}</h3>
                    <p style={{ margin: 0 }}>Completed order</p>
                  </div>
                </Flex>
              </Flex>
            </div>
          </Flex>

          <Col span={24}>
            <Card title="My Orders">
              <Table
                columns={columns}
                dataSource={orders}
                pagination={false}
                rowKey="orderCode"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default OrderPage;
