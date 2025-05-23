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

const { Item } = Menu;

const AdminMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Map key tương ứng với các đường dẫn (bạn có thể tùy chỉnh theo route app bạn)
  // Ví dụ: /admin/dashboard => key "dashboard", /admin/pets => "pets", ...
  // Nếu url phức tạp hơn thì có thể parse location.pathname
  const pathToKeyMap = {
    "/admin/dashboard": "dashboard",
    "/admin/pets": "pets",
    // "/admin/pets/add": "pets",
    "/admin/pet-products": "pet-products",
    "/admin/accounts": "accounts",
    "/admin/orders": "orders",
    "/admin/venue": "venue",
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
      <Item key="pet-products" icon={<ShoppingOutlined />}>
        Pet Products
      </Item>
      <Item key="accounts" icon={<UserOutlined />}>
        Accounts
      </Item>
      <Item key="orders" icon={<ShoppingCartOutlined />}>
        Orders
      </Item>
      <Item key="venue" icon={<EnvironmentOutlined />}>
        Venue
      </Item>
    </Menu>
  );
};

export default AdminMenu;
