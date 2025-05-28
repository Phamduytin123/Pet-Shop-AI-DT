import PetProductList from "../../components/admin/productlist/PetProductList";
import AdminLayout from "../../layout/AdminLayout";
import petProductService from "../../service/petProductService";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const AdminPetProductListPage = () => {
  const [petDetails, setPetDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGetListPetProduct = async () => {
      try {
        const res = await petProductService.getAllPetProduct();
        const data = res.data;
        setPetDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetListPetProduct();
  }, []);

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
        <div
          style={{
            maxWidth: 1500,
            width: "100%",
            paddingLeft: "5%",
            background: "#f2e2ff",
          }}
        >
          {/* Header with button */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <div>
              <h1>Pet Products</h1>
              {/* <Title level={3}>Pet Products List</Title> */}
            </div>
            <Button
              type="primary"
              onClick={() => navigate("/admin/petProducts/add")}
              style={{ marginRight: "8%", background: "#3e0068" }}
            >
              Add New Pet Product
            </Button>
          </div>

          {/* List Component */}
          <PetProductList petDetails={petDetails} />
        </div>
      </Content>
    </AdminLayout>
  );
};

export default AdminPetProductListPage;
