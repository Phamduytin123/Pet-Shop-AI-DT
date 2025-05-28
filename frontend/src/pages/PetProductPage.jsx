import React, { useState, useEffect } from "react";
import { Button, Card, Descriptions, Space, InputNumber } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../service/apiClient"; // axios baseURL client
import MainLayout from "../layout/MainLayout";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../utils/commonUtils";
import shoppingCartService from "../service/shoppingCartService";
import { useStateContext } from "../context/StateContext";
import petProductService from "../service/petProductService";

const PetProductPage = () => {
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const { petProductId } = useParams();
  const [state] = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await petProductService.getPetProductById(
          petProductId
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [petProductId]);

  const handleAddToCart = async () => {
    if (!state.account) {
      navigate("/login");
    } else {
      const request = {
        itemId: product.id,
        quantity: quantity,
      };

      try {
        await shoppingCartService.addToCart(request);
        showSuccessNotification("Adding success", "Product added to cart");
        navigate("/shopping-carts");
      } catch (error) {
        showErrorNotification("Adding Failed", error);
      }
    }
  };

  const handleBuyNow = () => {
    console.log("Buy now clicked", { product, quantity });
    // Handle buy now logic
  };

  return (
    <MainLayout>
      {!product ? (
        <h1>Loading...</h1>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "40px",
            flexDirection: "row",
          }}
        >
          <Card
            style={{
              display: "flex",
              width: "1400px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              paddingLeft: "20px",
              backgroundColor: "#F2E2FF",
            }}
          >
            <div style={{ display: "flex" }}>
              {/* Image left */}
              <div style={{ flex: "0 0 600px", marginRight: "24px" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "400px",
                    height: "500px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </div>

              {/* Info right */}
              <div style={{ flex: "1" }}>
                <h1>{product.name}</h1>
                <Descriptions title="Product Information" bordered column={1}>
                  <Descriptions.Item label="Name">
                    {product.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Type">
                    {product.type}
                  </Descriptions.Item>
                  <Descriptions.Item label="Price">
                    {product.price.toLocaleString()} VND
                  </Descriptions.Item>
                  <Descriptions.Item label="Available Quantity">
                    {product.quantity}
                  </Descriptions.Item>
                </Descriptions>

                <h2>Description</h2>
                <p>{product.description}</p>

                {/* Quantity selector */}
                <Space style={{ paddingTop: "20px" }}>
                  <Button
                    shape="circle"
                    icon={<MinusOutlined />}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  />
                  <InputNumber
                    min={1}
                    max={product.quantity}
                    value={quantity}
                    onChange={setQuantity}
                    style={{ width: "50px" }}
                    controls={false}
                  />
                  <Button
                    shape="circle"
                    icon={<PlusOutlined />}
                    onClick={() =>
                      setQuantity(Math.min(product.quantity, quantity + 1))
                    }
                  />
                </Space>

                <div
                  style={{
                    marginTop: "24px",
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                  }}
                >
                  <Button type="primary" onClick={handleAddToCart}>
                    Add to cart
                  </Button>
                  <Button type="primary" onClick={handleBuyNow}>
                    Buy now
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </MainLayout>
  );
};

export default PetProductPage;
