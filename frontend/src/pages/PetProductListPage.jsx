import PetProductList from "../components/guest/productlist/PetProductList";
import MainLayout from "../layout/MainLayout";
import petProductService from "../service/petProductService";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import Title from "antd/es/skeleton/Title";
const PetProductListPage = () => {
  const [petDetails, setPetDetails] = useState([]);

  useEffect(() => {
    const fetchGetListPetProduct = async () => {
      try {
        console.log("ok11");

        const res = await petProductService.getAllPetProduct();
        console.log("ok22");

        const data = res.data;
        setPetDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetListPetProduct();
  }, []);
  return (
    <MainLayout>
      <Content
        style={{
          background: "#fff",
          padding: 50,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: 1500,
            width: "100%",
            paddingLeft: "5%",
            background: "#f2e2ff",
          }}
        >
          <h1>Pet Products</h1>
          <Title level={3}>Pet Products List</Title>
          <PetProductList petDetails={petDetails} />
        </div>
      </Content>
    </MainLayout>
  );
};
export default PetProductListPage;
