// src/components/Testimonials.jsx
import { Carousel, Typography } from "antd";

const testimonials = [
  "Dịch vụ tuyệt vời, nhân viên rất thân thiện!",
  "Sản phẩm chất lượng, giá hợp lý.",
  "Mèo nhà tôi rất thích đồ chơi ở đây.",
];

const Testimonials = () => {
  return (
    <section style={{ padding: "40px 0", background: "#fafafa" }}>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        Khách hàng nói gì?
      </Typography.Title>
      <Carousel autoplay>
        {testimonials.map((text, index) => (
          <div key={index}>
            <Typography.Paragraph
              style={{ textAlign: "center", padding: "0 100px" }}
            >
              "{text}"
            </Typography.Paragraph>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Testimonials;
