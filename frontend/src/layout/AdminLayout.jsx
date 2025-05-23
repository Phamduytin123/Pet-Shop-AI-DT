import React from "react";
import AdminMenu from "../components/admin/AdminMenu";
import { Layout } from "antd";
import AdminNavbar from "../components/admin/Navbar";

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
  return (
    <Layout>
      {/* Header */}
      <Header style={{ background: "#fff", padding: 0 }}>
        <AdminNavbar />
      </Header>

      {/* Sidebar and Content */}
      <Layout>
        <Sider width={200} style={{ background: "#fff", paddingTop: 60 }}>
          <AdminMenu />
        </Sider>
        <Content
          style={{
            // margin: "24px 16px",
            padding: 24,
            background: "#fff",
            minHeight: "100vh",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
