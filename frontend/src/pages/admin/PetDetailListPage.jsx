import PetDetailList from "../../components/admin/petdetaillist/PetDetailList";
import AdminLayout from "../../layout/AdminLayout";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import "../../assets/scss/PetList.scss";
import petService from "../../service/petService";
import { useParams, useNavigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import { Button } from "antd";

const AdminPetDetailListPage = () => {
  const [petDetails, setPetDetails] = useState([]);
  const { breed } = useParams();
  const navigate = useNavigate();

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
  }, [breed]);

  const handleAddNewPet = () => {
    navigate(`/admin/pets/${breed}/add`);
  };

  return (
    <AdminLayout>
      <Content
        style={{
          background: "#fff",
          padding: 50,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: 1500, width: "100%", paddingLeft: "8%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <h1>Breed - {breed}</h1>
            <Button
              type="primary"
              onClick={handleAddNewPet}
              style={{ background: "#3e0068" }}
            >
              Add New Pet
            </Button>
          </div>

          {/* <Title level={3}>Pet Detail List</Title> */}
          <PetDetailList petDetails={petDetails} breed={breed} />
        </div>
      </Content>
    </AdminLayout>
  );
};

export default AdminPetDetailListPage;
