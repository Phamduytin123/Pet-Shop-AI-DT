// PetCard.js
import React from "react";
import { Card, Button } from "antd";
import "../assets/scss/AnimalTag.scss"; // import file css
import CatTagImage1 from "../assets/images/CatTag1.png";
import CatTagImage2 from "../assets/images/CatTag2.png";
const AnimalTag = () => {
  return (
    <div className="pet-card-wrapper">
      <Card className="pet-card">
        <div className="card-content">
          <h3>Physical checkup your pet</h3>
          <p>Regular physical checkups are essential for maintain...</p>
          <Button type="primary" className="read-more-btn">
            Read More
          </Button>
        </div>
        <img
          src={CatTagImage1} // ảnh con chó
          alt="pet"
          className="pet-image"
        />
      </Card>
    </div>
  );
};

export default AnimalTag;
