// PetCarousel.jsx
import Slider from "react-slick";
import PetCard from "./productlist/PetCard";
import { PrevArrow, NextArrow } from "./CustomArrows"; // 👈
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "../../assets/scss/PetCarousel.scss";
import { Card, Col, Row, Typography } from "antd";
const PetCarousel = ({ pets }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
      <Typography.Title
        level={2}
        style={{
          textAlign: "center",
          marginBottom: "5%",
          marginTop: "5%",
          color: "#410075",
        }}
      >
        Discover Our Cat Collections
      </Typography.Title>
      <Slider {...settings}>
        {pets.map((pet) => (
          <div key={pet.id} style={{ padding: "0 8px" }}>
            <PetCard pet={pet} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PetCarousel;
