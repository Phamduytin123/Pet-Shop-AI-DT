import PetDetailList from "../components/guest/petdetaillist/PetDetailList";
import MainLayout from "../layout/MainLayout";
import Title from "antd/es/skeleton/Title";
import React from "react";
import { useEffect, useState } from "react";
import "../assets/scss/PetList.scss";
import petService from "../service/petService";
import { useParams } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
const PetDetailListPage = () => {
  const [petDetails, setPetDetails] = useState([]);
  const { breed } = useParams();

  useEffect(() => {
    const fetchGetListPetDetail = async () => {
      try {
        const res = await petService.getListPetDetailByBreed(breed);
        const data = res.data;
        setPetDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetListPetDetail();
  }, []);

  return (
    <>
      <MainLayout>
        <Content
          style={{
            background: "#fff",
            padding: 50,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: 1500, width: "100%", paddingLeft: "8%" }}>
            <h1>{breed}</h1>
            <Title level={3}>Pet Detail List</Title>
            <PetDetailList petDetails={petDetails} breed={breed} />
          </div>
        </Content>
      </MainLayout>
    </>
  );
};
export default PetDetailListPage;
