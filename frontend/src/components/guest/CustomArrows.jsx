// CustomArrows.jsx
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export const NextArrow = ({ onClick }) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      right: 0,
      zIndex: 1,
      transform: "translateY(-50%)",
      cursor: "pointer",
      fontSize: 24,
      color: "#000",
    }}
    onClick={onClick}
  >
    <RightOutlined />
  </div>
);

export const PrevArrow = ({ onClick }) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: 0,
      zIndex: 1,
      transform: "translateY(-50%)",
      cursor: "pointer",
      fontSize: 24,
      color: "#000",
    }}
    onClick={onClick}
  >
    <LeftOutlined />
  </div>
);
