import { Button, Typography, Row, Col } from "antd";

const { Title, Paragraph } = Typography;

const HeroSection = () => {
  return (
    <Row
      align="middle"
      justify="center"
      style={{ padding: "80px 0", background: "#f0f2f5" }}
    >
      <Col span={20} style={{ textAlign: "center" }}>
        <Title>Chào mừng đến với PetShop</Title>
        <Paragraph>
          Cung cấp sản phẩm chất lượng và dịch vụ tốt nhất cho thú cưng của bạn.
        </Paragraph>
        <Button type="primary" size="large">
          Xem sản phẩm
        </Button>
      </Col>
    </Row>
  );
};

export default HeroSection;
