// components/PetCard.js
import React from "react";
import { Card, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { formatPrice } from "../../../utils/formatUtils";
import { useNavigate } from "react-router-dom";
const PetDetailCard = ({ petDetail, breed }) => {
  const navigate = useNavigate();
  const handleClick = (breed, id) => {
    // navigate(`/pet-detail/${breed}/${id}`);
    navigate(`/admin/pets/${breed}/${id}/update`);
  };
  const handleEditClick = (e, breed, id) => {
    e.stopPropagation();
    navigate(`/admin/pets/${breed}/${id}/update`);
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
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={(e) => {
          handleEditClick(e, breed, petDetail.id);
        }}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 10,
          padding: 4,
        }}
      />
      <Card.Meta
        title={petDetail.color}
        description={`Giá: ${formatPrice(petDetail.price)}`}
      />
    </Card>
  );
};

export default PetDetailCard;
