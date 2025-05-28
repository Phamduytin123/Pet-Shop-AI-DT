// components/PetCard.js
import React from "react";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
const AdminPetProductCard = ({ petProduct }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/petProducts/${petProduct.id}`);
  };
  const handleEditClick = (e) => {
    e.stopPropagation(); // Ngăn không cho card click bị kích hoạt
    navigate(`/admin/petProducts/update/${petProduct.id}`);
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
      <Card.Meta
        title={petProduct.name}
        description={`Giá: ${petProduct.price} VND`}
      />
    </Card>
  );
};

export default AdminPetProductCard;
