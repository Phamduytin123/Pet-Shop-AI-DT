import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
const { Item } = Menu;

const AdminMenu = () => {
  const [state, dispatch] = useStateContext();
  const account = state?.account;
  const navigate = useNavigate();
  const location = useLocation();

  const pathToKeyMap = {
    "/admin/dashboard": "dashboard",
    "/admin/pets": "pets",
    "/admin/petProducts": "petProducts",
    "/admin/accounts": "accounts",
    "/admin/orders": "orders",
  };

  // Lấy key theo path hiện tại, mặc định là dashboard
  const selectedKey = pathToKeyMap[location.pathname] || "dashboard";

  const onMenuClick = (e) => {
    // Dùng key để navigate đến đường dẫn tương ứng
    const keyToPathMap = Object.entries(pathToKeyMap).reduce(
      (acc, [path, key]) => {
        acc[key] = path;
        return acc;
      },
      {}
    );

    const path = keyToPathMap[e.key];
    if (path) {
      navigate(path);
    }
  };

  return (
    <Menu
      mode="vertical"
      theme="light"
      selectedKeys={[selectedKey]}
      onClick={onMenuClick}
      style={{ height: "100%", borderRight: 0 }}
    >
      <Item key="dashboard" icon={<DashboardOutlined />}>
        Dashboard
      </Item>
      <Item key="pets" icon={<AppstoreOutlined />}>
        Pets
      </Item>
      <Item key="petProducts" icon={<ShoppingOutlined />}>
        Pet Products
      </Item>
      {account?.role == "ADMIN" && (
        <Item key="accounts" icon={<UserOutlined />}>
          Accounts
        </Item>
      )}
      <Item key="orders" icon={<ShoppingCartOutlined />}>
        Orders
      </Item>
    </Menu>
  );
};

export default AdminMenu;
