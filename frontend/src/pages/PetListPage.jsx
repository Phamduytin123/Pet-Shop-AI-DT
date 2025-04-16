// pages/PetListPage.js
import React from "react";
import { Button, Layout } from "antd";
import Sidebar from "../components/guest/productlist/Sidebar";
import PetList from "../components/guest/productlist/PetList";
import MainLayout from "../layout/MainLayout";
import Title from "antd/es/skeleton/Title";
import Search from "antd/es/input/Search";
const { Sider, Content } = Layout;
import "../assets/scss/PetList.scss";

const mockPets = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Thú cưng ${i + 1}`,
  image: `https://placedog.net/400/30${i % 10}`,
  price: 5000000 + i * 100000,
}));

const PetListPage = () => {
  return (
    <MainLayout>
      <Layout style={{ minHeight: "100vh", backgroundColor: "#F2E2FF" }}>
        <Sider
          width={300}
          style={{
            background: "#fff",
            padding: 16,
            height: "fit-content",
            margin: "100px 20px",
            borderRadius: "12px",
          }}
        >
          <Sidebar />
        </Sider>

        <Layout style={{ padding: 24 }}>
          <div
            style={{
              display: "flex",
              gap: 8,
              width: "100%",
              justifyContent: "flex-end",
              alignContent: "end",
              marginBottom: "40px",
              paddingRight: "80px",
            }}
          >
            <div style={{ display: "flex", gap: "5em" }}>
              <Search
                placeholder="Tìm kiếm thú cưng"
                onSearch={(value) => console.log("Search:", value)}
                style={{ width: "700px" }}
                className="search-bar"
              />
              <Button className="btn">Tìm kiếm bằng hình ảnh</Button>
            </div>
          </div>
          <Content style={{ background: "#fff", padding: 24 }}>
            <Title level={3}>Danh sách thú cưng</Title>
            <PetList pets={mockPets} />
          </Content>
        </Layout>
      </Layout>
    </MainLayout>
  );
};

export default PetListPage;
