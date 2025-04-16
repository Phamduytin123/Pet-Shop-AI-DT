import { Layout } from "antd";
import Navbar from "../components/guest/Navbar";
import AppFooter from "../components/guest/AppFooter";
import StyledFooter from "../components/guest/StyledFooter";

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout>
      <Navbar />
      <Content
        style={{ padding: "0px", minHeight: "100vh", background: "#fff" }}
      >
        {children}
      </Content>
      {/* <AppFooter /> */}
      <StyledFooter />
    </Layout>
  );
};

export default MainLayout;
