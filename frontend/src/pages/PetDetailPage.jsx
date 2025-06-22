import React, { useState, useEffect } from "react";
import {
  Button,
  InputNumber,
  Card,
  Descriptions,
  Space,
  DatePicker,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";
import petDetailService from "../service/petDetailService";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import MainLayout from "../layout/MainLayout";
import petService from "../service/petService";
import { useStateContext } from "../context/StateContext";
import { useNavigate } from "react-router-dom";
import shoppingCartService from "../service/shoppingCartService";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../utils/commonUtils";
import moment from "moment";

const { Text } = Typography;

const PetDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [petDetail, setPetDetail] = useState();
  const [pet, setPet] = useState();
  const { petDetailId, breed } = useParams();
  const [state, dispatch] = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGetPetDetailById = async () => {
      try {
        const res = await petDetailService.getById(petDetailId);
        const res2 = await petService.getPetInfoByBreed(breed);

        const data = res.data;
        const data2 = res2.data;

        // Format dateIn for display if it exists
        if (data.dateIn) {
          data.formattedDateIn = moment(data.dateIn).format("DD/MM/YYYY");
        }

        setPetDetail(data);
        setPet(data2);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetPetDetailById();
  }, [petDetailId]);

  const handleAddToCart = async () => {
    if (!state.account) {
      navigate("/login");
    } else {
      const request = {
        itemId: petDetail.id,
        quantity: quantity,
      };
      try {
        const res = await shoppingCartService.addToCart(request);
        showSuccessNotification(
          "Adding success",
          "Adding product to cart success"
        );
        navigate("/shopping-carts");
      } catch (error) {
        showErrorNotification("Adding Failed", error);
        console.error("Error adding to cart:", error);
      }
    }
  };

  const handleBuyNow = () => {
    console.log("Mua ngay:", { petDetail, quantity });
  };

  return (
    <MainLayout>
      {!petDetail ? (
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
              {/* Ảnh bên trái */}
              <div style={{ flex: "0 0 600px", marginRight: "24px" }}>
                <img
                  src={petDetail.image}
                  alt="Pet"
                  style={{
                    width: "400px",
                    height: "500px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </div>

              {/* Thông tin bên phải */}
              <div style={{ flex: "1" }}>
                <h1>{`${breed}-${petDetail.color}`}</h1>
                <Descriptions
                  title="Pet Information"
                  bordered
                  column={1}
                  size="middle"
                >
                  <Descriptions.Item label="Color">
                    {petDetail.color}
                  </Descriptions.Item>
                  <Descriptions.Item label="Date In">
                    {petDetail.formattedDateIn ? (
                      <Text>{petDetail.formattedDateIn}</Text>
                    ) : (
                      <DatePicker
                        format="DD/MM/YYYY"
                        style={{ width: "100%" }}
                        value={
                          petDetail.dateIn ? moment(petDetail.dateIn) : null
                        }
                        disabled
                      />
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Gender">
                    {petDetail.gender ? "Male" : "Female"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Heathy Status">
                    {petDetail.heathStatus}
                  </Descriptions.Item>
                  <Descriptions.Item label="Price">
                    {petDetail.price.toLocaleString()} VND
                  </Descriptions.Item>
                </Descriptions>
                <h2>Descriptions</h2>
                <p>{pet.description}</p>
                {/* Bộ đếm số lượng và nút */}
                <Space style={{ paddingTop: "20px" }}>
                  <Button
                    shape="circle"
                    icon={<MinusOutlined />}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  />
                  <InputNumber
                    min={1}
                    max={20}
                    value={quantity}
                    onChange={setQuantity}
                    style={{ width: "40px" }}
                    controls={false}
                  />
                  <Button
                    shape="circle"
                    icon={<PlusOutlined />}
                    onClick={() => setQuantity(quantity + 1)}
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
                  <Button
                    type="primary"
                    onClick={handleAddToCart}
                    style={{ background: "#3e0068" }}
                  >
                    Add to cart
                  </Button>
                  {/* <Button type="primary" onClick={handleBuyNow}>
                    Buy now
                  </Button> */}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </MainLayout>
  );
};

export default PetDetailPage;
