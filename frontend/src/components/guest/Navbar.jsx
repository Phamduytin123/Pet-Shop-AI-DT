import { Menu } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import "../../assets/scss/Navbar.scss";
// import { ReactComponent as LogoIcon } from "../../assets/svgs/logo.svg";
import logoUrl from "../../assets/svgs/logo.svg";

const Navbar = () => {
  return (
    <Header className="header">
      <div className="logo">
        {/* <h1>🐾 PETSHOP</h1> */}
        {/* <LogoIcon style={{ width: 32, height: 32, marginRight: "8px" }} /> */}
        <img src={logoUrl} alt="Logo" />;<h1>PETSHOP</h1>
      </div>
      <div className="menu-container">
        <Menu
          className="custom-menu"
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["about"]}
          items={[
            { key: "about", label: "About" },
            { key: "discovery", label: "Discovery" },
            { key: "shop", label: "Shop" },
            { key: "contact", label: "Contact" },
            { key: "course", label: "Course" },
            { key: "cart", icon: <ShoppingCartOutlined /> },
            { key: "register", icon: <UserOutlined />, label: "Register" },
            {
              key: "divider",
              disabled: true,
              label: <span style={{ color: "#999" }}>/</span>,
            },
            { key: "login", label: "Login" },
          ]}
        />
      </div>
    </Header>
  );
};

export default Navbar;
