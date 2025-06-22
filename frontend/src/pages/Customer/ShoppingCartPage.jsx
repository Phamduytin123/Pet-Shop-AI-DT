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
  message,
  Popconfirm,
} from "antd";
import MainLayout from "../../layout/MainLayout";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useStateContext } from "../../context/StateContext";
import { data, useNavigate } from "react-router-dom";
import shoppingCartService from "../../service/shoppingCartService";
const { Title, Text } = Typography;

const ShoppingCartPage = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [carts, setCarts] = useState([]);
  const [loadingItems, setLoadingItems] = useState({});
  const [deletingItems, setDeletingItems] = useState({}); // State để theo dõi item đang xóa
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
        const cartDatas = data
          .map((cart) => {
            const item = cart.item;
            return {
              cartId: cart.id,
              itemId: item.id,
              name: item.name,
              image: item.image,
              price: item.price,
              quantity: cart.quantity,
              createdAt: cart.createdAt,
            };
          })
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); //newest first a-b to oldest firts
        console.log(cartDatas);

        setCarts(cartDatas);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetCarts();
  }, []);

  const allSelected =
    carts.length > 0 &&
    carts.every((cart) => selectedItems.hasOwnProperty(cart.cartId));

  const handleSelectAll = (checked) => {
    const newSelected = {};
    if (checked) {
      carts.forEach((cart) => {
        newSelected[cart.cartId] = {
          ...cart,
          quantity: selectedItems[cart.cartId]?.quantity || cart.quantity || 1,
        };
      });
      setSelectedItems(newSelected);
    } else {
      setSelectedItems({});
    }
  };

  const handleSelect = (cartId, checked) => {
    setSelectedItems((prev) => {
      if (checked) {
        return {
          ...prev,
          [cartId]: {
            quantity: 1,
            ...carts.find((cart) => cart.cartId === cartId),
          },
        };
      } else {
        const newSelected = { ...prev };
        delete newSelected[cartId];
        return newSelected;
      }
    });
  };

  const updateCartItemQuantity = async (cartId, quantity) => {
    try {
      setLoadingItems((prev) => ({ ...prev, [cartId]: true }));

      // Call API to update quantity using cartId
      const req = {
        cartId: cartId,
        quantity: quantity,
      };
      const res = await shoppingCartService.updateCart(req);

      // Update local state only after API success
      setCarts((prevCarts) =>
        prevCarts.map((cart) =>
          cart.cartId === cartId ? { ...cart, quantity } : cart
        )
      );

      setSelectedItems((prev) => {
        if (!prev[cartId]) return prev;
        return {
          ...prev,
          [cartId]: { ...prev[cartId], quantity },
        };
      });

      message.success("Quantity updated successfully");
    } catch (error) {
      console.error("Failed to update quantity:", error);
      message.error("Failed to update quantity");
      // Revert to previous quantity in UI
      setCarts((prevCarts) =>
        prevCarts.map((cart) =>
          cart.cartId === cartId ? { ...cart, quantity: cart.quantity } : cart
        )
      );
    } finally {
      setLoadingItems((prev) => ({ ...prev, [cartId]: false }));
    }
  };

  const handleDeleteItem = async (cartId) => {
    try {
      setDeletingItems((prev) => ({ ...prev, [cartId]: true }));

      // Call API to delete cart item
      const res = await shoppingCartService.deleteCartById(cartId);

      // Update local state after successful deletion
      setCarts((prevCarts) =>
        prevCarts.filter((cart) => cart.cartId !== cartId)
      );

      // Remove from selected items if it was selected
      setSelectedItems((prev) => {
        const newSelected = { ...prev };
        delete newSelected[cartId];
        return newSelected;
      });

      message.success("Item removed from cart");
    } catch (error) {
      console.error("Failed to delete item:", error);
      message.error("Failed to delete item");
    } finally {
      setDeletingItems((prev) => ({ ...prev, [cartId]: false }));
    }
  };

  const handleQuantityChange = async (cartId, quantity) => {
    if (quantity < 1) return;
    await updateCartItemQuantity(cartId, quantity);
  };

  const totalAmount = Object.values(selectedItems).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleConfirmClick = () => {
    console.log("confirm:", carts);
    console.log("ohno", selectedItems);

    navigate("/payment/info", { state: { items: selectedItems } });
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
          gutter={16}
          style={{
            width: "100%",
            maxWidth: 1300,
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
                <div style={{ flex: 1, marginLeft: 25 }}>Item name</div>
                <div style={{ flex: 1, paddingLeft: 90 }}>Unit Price</div>
                <div style={{ flex: 1, marginLeft: 16 }}>Quantity</div>
                <div style={{ flex: 1, marginLeft: 16, textAlign: "right" }}>
                  Total Amount
                </div>
                <div style={{ width: 50 }}></div>{" "}
                {/* Space for delete button */}
              </div>
              <List
                itemLayout="horizontal"
                dataSource={carts}
                renderItem={(cart) => {
                  const selected = selectedItems[cart.cartId];
                  const isLoading = loadingItems[cart.cartId];
                  const isDeleting = deletingItems[cart.cartId];
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
                            handleSelect(cart.cartId, e.target.checked)
                          }
                          style={{ marginRight: 12 }}
                        />
                        <Image
                          src={cart.image}
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
                            <Text strong>{cart.name}</Text>
                          </div>
                          <div style={{ flex: 1 }}>
                            <Text>
                              Unit Price: {cart.price.toLocaleString()} VND
                            </Text>
                          </div>
                          <div style={{ flex: 1, marginLeft: 16 }}>
                            <Button
                              shape="circle"
                              icon={<MinusOutlined />}
                              disabled={!selected || isLoading}
                              onClick={() =>
                                handleQuantityChange(
                                  cart.cartId,
                                  Math.max(1, cart.quantity - 1)
                                )
                              }
                            />
                            <InputNumber
                              min={1}
                              value={cart.quantity}
                              disabled={!selected || isLoading}
                              onChange={(value) =>
                                handleQuantityChange(cart.cartId, value)
                              }
                              style={{ width: 40, margin: "0 8px" }}
                              loading={isLoading}
                            />
                            <Button
                              shape="circle"
                              icon={<PlusOutlined />}
                              disabled={!selected || isLoading}
                              onClick={() =>
                                handleQuantityChange(
                                  cart.cartId,
                                  cart.quantity + 1
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
                                ? (cart.price * cart.quantity).toLocaleString()
                                : "0"}{" "}
                              VND
                            </Text>
                          </div>
                        </div>
                        <div style={{ marginLeft: 16 }}>
                          <Popconfirm
                            title="Are you sure to delete this item?"
                            onConfirm={() => handleDeleteItem(cart.cartId)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button
                              type="text"
                              danger
                              icon={<DeleteOutlined />}
                              loading={isDeleting}
                              disabled={isDeleting}
                            />
                          </Popconfirm>
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
              {/* Header */}
              <div
                style={{ display: "flex", fontWeight: "bold", marginBottom: 8 }}
              >
                <div style={{ flex: 2 }}>Product</div>
                <div style={{ flex: 1, textAlign: "center" }}>Quantity</div>
                <div style={{ flex: 1, textAlign: "right" }}>Price</div>
              </div>

              {/* List Items */}
              <List
                dataSource={Object.values(selectedItems)}
                renderItem={(item) => (
                  <List.Item>
                    <div style={{ display: "flex", width: "100%" }}>
                      <div style={{ flex: 2 }}>{item.name}</div>
                      <div style={{ flex: 1, textAlign: "center" }}>
                        {item.quantity}x
                      </div>
                      <div style={{ flex: 1, textAlign: "right" }}>
                        {(item.quantity * item.price).toLocaleString()} VND
                      </div>
                    </div>
                  </List.Item>
                )}
              />
              <hr />
              <Title level={5}>Total: {totalAmount.toLocaleString()} VND</Title>
              <Button
                type="primary"
                block
                disabled={totalAmount === 0}
                onClick={handleConfirmClick}
              >
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
