// src/components/ProductList.jsx
import { Card, Col, Row, Typography } from "antd";

const products = [
  { id: 1, name: "Thức ăn cho chó", price: "150.000đ" },
  { id: 2, name: "Sữa tắm cho mèo", price: "80.000đ" },
  { id: 3, name: "Chuồng cho hamster", price: "300.000đ" },
];

const ProductList = () => {
  return (
    <section style={{ padding: "40px 0" }}>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        Sản phẩm nổi bật
      </Typography.Title>
      <Row gutter={[16, 16]} justify="center">
        {products.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8}>
            <Card title={item.name} bordered={false}>
              <p>Giá: {item.price}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default ProductList;
