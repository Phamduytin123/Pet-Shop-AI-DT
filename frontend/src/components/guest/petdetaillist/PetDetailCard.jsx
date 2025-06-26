// components/PetCard.js
import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../utils/formatUtils";
const PetDetailCard = ({ petDetail, breed }) => {
  const navigate = useNavigate();
  const handleClick = (breed, id) => {
    navigate(`/pet-detail/${breed}/${id}`);
  };

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      onClick={() => handleClick(breed, petDetail.id)}
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
            alt={petDetail.color}
            src={petDetail.image}
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
        title={petDetail.color}
        description={`Giá: ${formatPrice(petDetail.price)}`}
      />
    </Card>
  );
};

export default PetDetailCard;
