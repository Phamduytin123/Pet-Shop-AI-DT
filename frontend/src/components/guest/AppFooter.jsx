import { Layout } from "antd";
import {
  FacebookFilled,
  InstagramOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer
      style={{
        backgroundColor: "#001529",
        color: "white",
        padding: "40px 50px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h3 style={{ color: "#fff" }}>🐾 PETSHOP</h3>
          <p>Chăm sóc thú cưng tận tình và chuyên nghiệp.</p>
        </div>

        <div>
          <h4 style={{ color: "#fff" }}>Liên hệ</h4>
          <p>
            <PhoneOutlined /> 0123 456 789
          </p>
          <p>
            <MailOutlined /> contact@petshop.vn
          </p>
        </div>

        <div>
          <h4 style={{ color: "#fff" }}>Mạng xã hội</h4>
          <p>
            <FacebookFilled /> Facebook
          </p>
          <p>
            <InstagramOutlined /> Instagram
          </p>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: 30,
          borderTop: "1px solid #444",
          paddingTop: 10,
        }}
      >
        © 2025 Petshop. All rights reserved.
      </div>
    </Footer>
  );
};

export default AppFooter;
