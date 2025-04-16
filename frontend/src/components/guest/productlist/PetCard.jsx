// components/PetCard.js
import React from "react";
import { Card } from "antd";

const PetCard = ({ pet }) => {
  return (
    <Card
      hoverable
      cover={<img alt={pet.name} src={pet.image} />}
      style={{ width: 240 }}
    >
      <Card.Meta title={pet.name} description={`Giá: ${pet.price} VND`} />
    </Card>
  );
};

export default PetCard;
