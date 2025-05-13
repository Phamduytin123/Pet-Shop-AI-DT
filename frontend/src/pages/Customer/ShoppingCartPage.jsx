import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  List,
  Checkbox,
  InputNumber,
  Button,
  Card,
  Image,
  Typography,
} from "antd";
import MainLayout from "../../layout/MainLayout";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useStateContext } from "../../context/StateContext";
import { data, useNavigate } from "react-router-dom";
import shoppingCartService from "../../service/shoppingCartService";
const { Title, Text } = Typography;

const mockItems = [
  {
    id: 1,
    color: "Item A",
    image:
      "http://res.cloudinary.com/duwta75bz/image/upload/v1746779567/c9caq7o1tyks9cpkqq1u.jpg",
    price: 100,
  },
  {
    id: 2,
    color: "Item B",
    image:
      "http://res.cloudinary.com/duwta75bz/image/upload/v1746779567/c9caq7o1tyks9cpkqq1u.jpg",
    price: 150,
  },
  {
    id: 3,
    color: "Item C",
    image:
      "http://res.cloudinary.com/duwta75bz/image/upload/v1746779567/c9caq7o1tyks9cpkqq1u.jpg",
    price: 200,
  },
];

const ShoppingCartPage = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [carts, setCarts] = useState([]);
  const [state, dispatch] = useStateContext();
  const navigate = useNavigate();
  if (!state.account) {
    navigate("/login");
  }
  useEffect(() => {
    const fetchGetCarts = async () => {
      console.log("fetch carts");
      try {
        const res = await shoppingCartService.getShoppingCart();
        console.log(res);
        const data = res.data;
        const cartDatas = data.map((cart) => {
          const item = cart.item;
          return {
            id: item.id,
            color: "item.color",
            image: item.image,
            price: item.price,
            quantity: cart.quantity,
          };
        });
        console.log(cartDatas);

        setCarts(cartDatas);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetCarts();
  }, []);
  const allSelected = carts.length === Object.keys(selectedItems).length;
  const handleSelectAll = (checked) => {
    const newSelected = {};
    if (checked) {
      carts.forEach((item) => {
        newSelected[item.id] = {
          quantity: selectedItems[item.id]?.quantity || 1,
          ...item,
        };
      });
    }
    setSelectedItems(newSelected);
  };

  const handleSelect = (itemId, checked) => {
    setSelectedItems((prev) => {
      if (checked) {
        return {
          ...prev,
          [itemId]: {
            quantity: 1,
            ...carts.find((item) => item.id === itemId),
          },
        };
      } else {
        const newSelected = { ...prev };
        delete newSelected[itemId];
        return newSelected;
      }
    });
  };

  const handleQuantityChange = (itemId, quantity) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], quantity },
    }));
  };

  const totalAmount = Object.values(selectedItems).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
          gutter={16}
          style={{
            width: "100%",
            maxWidth: 1200,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Left: Item List */}
          <Col span={14}>
            <Card
              title={`Item List (Selected: ${
                Object.keys(selectedItems).length
              })`}
            >
              {/* Header Row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 ",
                  marginBottom: 12,
                  fontWeight: "bold",
                  color: "#555",
                }}
              >
                <Checkbox
                  checked={allSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  style={{ marginRight: 12 }}
                />
                {/* <div style={{ width: 50, marginRight: 12 }} />{" "} */}
                {/* image placeholder */}
                <div style={{ flex: 1, marginLeft: 25 }}>Item color</div>
                {/* <div style={{ flex: 1, marginLeft: 25 }}>Item color</div> */}
                <div style={{ flex: 1, paddingLeft: 90 }}>Unit Price</div>
                <div style={{ flex: 1, marginLeft: 16 }}>Quantity</div>
                <div style={{ flex: 1, marginLeft: 16, textAlign: "right" }}>
                  Total Amount
                </div>
              </div>
              <List
                itemLayout="horizontal"
                dataSource={carts}
                renderItem={(item) => {
                  const selected = selectedItems[item.id];
                  return (
                    <List.Item>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Checkbox
                          checked={!!selected}
                          onChange={(e) =>
                            handleSelect(item.id, e.target.checked)
                          }
                          style={{ marginRight: 12 }}
                        />
                        <Image
                          src={item.image}
                          width={50}
                          height={50}
                          style={{ marginRight: 12 }}
                        />
                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ flex: 1, marginLeft: 25 }}>
                            <Text strong>{item.color}</Text>
                            {/* <br /> */}
                          </div>
                          <div style={{ flex: 1 }}>
                            <Text>
                              Unit Price: {item.price.toLocaleString()} VND
                            </Text>
                          </div>
                          <div style={{ flex: 1, marginLeft: 16 }}>
                            <Button
                              shape="circle"
                              icon={<MinusOutlined />}
                              disabled={!selected}
                              onClick={() =>
                                selected &&
                                handleQuantityChange(
                                  item.id,
                                  Math.max(1, selected.quantity - 1)
                                )
                              }
                            />
                            <InputNumber
                              min={1}
                              value={selected ? selected.quantity : 1}
                              disabled={!selected}
                              onChange={(value) =>
                                handleQuantityChange(item.id, value)
                              }
                              style={{ width: 40, margin: "0 8px" }}
                            />
                            <Button
                              shape="circle"
                              icon={<PlusOutlined />}
                              disabled={!selected}
                              onClick={() =>
                                selected &&
                                handleQuantityChange(
                                  item.id,
                                  selected.quantity + 1
                                )
                              }
                            />
                          </div>
                          <div
                            style={{
                              flex: 1,
                              textAlign: "right",
                              marginLeft: 16,
                            }}
                          >
                            <Text type="secondary">
                              Total:{" "}
                              {selected
                                ? (
                                    item.price * selected.quantity
                                  ).toLocaleString()
                                : "0"}{" "}
                              VND
                            </Text>
                          </div>
                        </div>
                      </div>
                    </List.Item>
                  );
                }}
              />
            </Card>
          </Col>

          {/* Right: Order Summary */}
          <Col span={10}>
            <Card title="Order Summary">
              <List
                dataSource={Object.values(selectedItems)}
                renderItem={(item) => (
                  <List.Item>
                    <div style={{ width: "100%" }}>
                      <Text>{item.color}</Text>
                      <br />
                      <Text>
                        Qty: {item.quantity} x {item.price.toLocaleString()} VND
                      </Text>
                      <br />
                      <Text type="secondary">
                        = {(item.quantity * item.price).toLocaleString()} VND
                      </Text>
                    </div>
                  </List.Item>
                )}
              />
              <hr />
              <Title level={5}>Total: {totalAmount.toLocaleString()} VND</Title>
              <Button type="primary" block disabled={totalAmount === 0}>
                Confirm Order
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default ShoppingCartPage;
