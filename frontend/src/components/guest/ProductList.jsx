// src/components/ProductList.jsx
import { Typography } from "antd";
import Slider from "react-slick";
import PetCard from "./productlist/PetCard";
import { PrevArrow, NextArrow } from "./CustomArrows"; // 👈
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PetProductCard from "./productlist/PetProductCard";
// import "../../assets/scss/PetCarousel.scss";
const products = [
  { id: 1, name: "Thức ăn cho chó", price: "150.000đ" },
  { id: 2, name: "Sữa tắm cho mèo", price: "80.000đ" },
  { id: 3, name: "Chuồng cho hamster", price: "300.000đ" },
];

const ProductList = ({ products }) => {
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
        Care For Your Pet
      </Typography.Title>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} style={{ padding: "0 8px" }}>
            <PetProductCard petProduct={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductList;
