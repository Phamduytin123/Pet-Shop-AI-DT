// components/PetCard.js
import React from "react";
import { Card, Progress, Typography, Divider } from "antd";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;
const PetCard = ({ pet }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pets/${pet.breed}`);
  };

  const renderStat = (label, value) => (
    <div style={{ marginBottom: 8 }}>
      <Text strong>{label}</Text>
      <Progress
        percent={value * 10}
        showInfo={false}
        strokeColor="#6a0dad"
        trailColor="#d9d9d9"
      />
    </div>
  );

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
      <Card.Meta title={pet.name} style={{ marginBottom: 15 }} />
      {/* <Card.Meta
        title="Information"
        style={{ marginTop: 12, marginBottom: 8 }}
      /> */}
      {renderStat("Difficulty in raise", pet.difficulty)}
      {renderStat("Ferocious", pet.ferocious)}
      {renderStat("Space", pet.space)}
      {renderStat("Group", pet.petGroup)}
    </Card>
  );
};

export default PetCard;
