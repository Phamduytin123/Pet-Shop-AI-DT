// pages/PetListPage.js
import React from "react";
import { Button, Layout } from "antd";
import Sidebar from "../components/guest/productlist/Sidebar";
import PetList from "../components/guest/productlist/PetList";
import MainLayout from "../layout/MainLayout";
import Title from "antd/es/skeleton/Title";
import Search from "antd/es/input/Search";
const { Sider, Content } = Layout;
import axios from "axios";
import { useEffect, useState } from "react";
import "../assets/scss/PetList.scss";
import petService from "../service/petService";

const PetListPage = () => {
  const [pets, setPets] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  useEffect(() => {
    const fetchGetListPet = async () => {
      try {
        const res = await petService.getAllPet();
        const breedRes = await petService.getAllBreedsPet();
        const data = res.data;
        console.log(data);
        console.log(breedRes.data);
        setPets(data);
        setFilteredPets(data);
        setBreeds(breedRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetListPet();
  }, []);

  const handleFilterChange = (selectedBreeds) => {
    if (selectedBreeds.length === 0) {
      setFilteredPets(pets); // all
    } else {
      const filtered = pets.filter((pet) => selectedBreeds.includes(pet.breed));
      setFilteredPets(filtered);
    }
  };
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
          <Sidebar breeds={breeds} onFilterChange={handleFilterChange} />
        </Sider>

        <Layout style={{ padding: 24, backgroundColor: "#F2E2FF" }}>
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
            <PetList pets={filteredPets} />
          </Content>
        </Layout>
      </Layout>
    </MainLayout>
  );
};

export default PetListPage;
