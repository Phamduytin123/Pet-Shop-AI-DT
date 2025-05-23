// components/PetCard.js
import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
const PetCard = ({ pet }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pets/${pet.breed}`);
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
            alt={pet.name}
            src={pet.image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      }
    >
      <Card.Meta title={pet.name} description={`Giá: ${pet.breed} VND`} />
    </Card>
  );
};

export default PetCard;
