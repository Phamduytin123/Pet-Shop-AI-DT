import { Menu, Dropdown, Avatar } from "antd";
import {
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import "../../assets/scss/Navbar.scss";
// import { ReactComponent as LogoIcon } from "../../assets/svgs/logo.svg";
import logoUrl from "../../assets/svgs/logo.svg";
import { clearTokensFromStorage } from "../../utils/storageUtils";
import { useNavigate, useLocation } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";

const AdminNavbar = () => {
  const [state, dispatch] = useStateContext();
  const navigate = useNavigate();
  const account = state?.account;
  const pathToKeyMap = {
    "/register": "register",
    "/login": "login",
    "/profile": "user",
  };

  const selectedKey = pathToKeyMap[location.pathname] || "";

  const handleLogout = () => {
    // localStorage.clear(); // hoặc clear chỉ token nếu bạn dùng key riêng
    clearTokensFromStorage();
    dispatch({ type: "SET_ACCOUNT_INFO", data: null });
    navigate("/login");
  };
  const userMenu = (
    <Menu
      items={[
        ...(account?.role === "SELLER"
          ? [
              {
                key: "profile",
                label: "My Profile",
                onClick: () => navigate("/seller/profile"),
              },
            ]
          : []),
        {
          key: "logout",
          label: "Logout",
          icon: <LogoutOutlined />,
          onClick: handleLogout,
        },
      ]}
    />
  );
  const menuItems = [
    !account && {
      key: "register",
      icon: <UserOutlined />,
      label: "Register",
      onClick: () => navigate("/register"),
    },
    !account && {
      key: "divider",
      disabled: true,
      label: <span style={{ color: "#999" }}>/</span>,
    },
    !account && {
      key: "login",
      label: "Login",
      onClick: () => navigate("/login"),
    },
    account && {
      key: "user",
      label: (
        <Dropdown overlay={userMenu} trigger={["click"]}>
          <Avatar
            style={{ backgroundColor: "#87d068", cursor: "pointer" }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      ),
    },
  ].filter(Boolean); // lọc null nếu chưa đăng nhập

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
          selectedKeys={[selectedKey]}
          items={menuItems}
        />
      </div>
    </Header>
  );
};

export default AdminNavbar;
