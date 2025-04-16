import React from "react";
import { Menu } from "antd";
import "../../../assets/scss/Sidebar.scss";

const Sidebar = () => {
  return (
    <Menu
      mode="inline"
      style={{ height: "100%", borderRight: 2, background: "F2E2FF" }}
      defaultSelectedKeys={["all"]}
      className="custom-sidebar"
    >
      <Menu.Item key="all">Tất cả thú cưng</Menu.Item>
      <Menu.Item key="dog">Chó</Menu.Item>
      <Menu.Item key="cat">Mèo</Menu.Item>
    </Menu>
  );
};

export default Sidebar;
