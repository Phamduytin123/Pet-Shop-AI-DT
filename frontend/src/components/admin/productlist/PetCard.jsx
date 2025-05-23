// components/PetCard.js
import React from "react";
import { Card, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const AdminPetCard = ({ pet }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/pets/${pet.breed}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); // Ngăn không cho card click bị kích hoạt
    navigate(`/admin/pets/update/${pet.breed}`);
  };

  return (
    <Card
      hoverable
      onClick={handleClick}
      style={{ width: 240, position: "relative" }}
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
      {/* Nút Edit nằm ở góc trên bên phải */}
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={handleEditClick}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 10,
          padding: 4,
        }}
      />
      <Card.Meta title={pet.name} description={`Giá: ${pet.breed} VND`} />
    </Card>
  );
};

export default AdminPetCard;
