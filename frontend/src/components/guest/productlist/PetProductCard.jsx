// components/PetCard.js
import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
const PetProductCard = ({ petProduct }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/petProducts/${petProduct.id}`);
  };
  return (
    <Card
      hoverable
      onClick={handleClick}
      style={{ width: 240 }}
      cover={
        <div
          style={{
            height: 200,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            alt={petProduct.name}
            src={petProduct.image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      }
    >
      <Card.Meta
        title={petProduct.name}
        description={`Giá: ${petProduct.price} VND`}
      />
    </Card>
  );
};

export default PetProductCard;
