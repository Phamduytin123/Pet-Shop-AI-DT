// pages/PetListPage.js
import React from "react";
import { Button, Layout } from "antd";
import Sidebar from "../components/guest/productlist/Sidebar";
import PetList from "../components/guest/productlist/PetList";
import MainLayout from "../layout/MainLayout";
import Title from "antd/es/skeleton/Title";
import Search from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;
import { useEffect, useState } from "react";
import "../assets/scss/PetList.scss";
import petService from "../service/petService";
// import { Modal, Upload, message, Card, Spin } from "antd";
import { Modal, Upload, message, Card, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const PetListPage = () => {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  const [breeds, setBreeds] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);

  //AI method state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [predictedPet, setPredictedPet] = useState(null);
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

  //AI
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    setFileList([]);
    setPredictedPet(null);
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList.slice(-1)); // chỉ giữ 1 ảnh
  };
  const handleSearchImage = async () => {
    if (!fileList.length) {
      message.warning("Vui lòng chọn một ảnh để tìm kiếm!");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileList[0].originFileObj);

    try {
      const res = await petService.searchPetByImage(formData);
      setPredictedPet(res.data); // gán pet vào state
    } catch (err) {
      message.error("Không thể tìm kiếm bằng hình ảnh!");
      console.error(err);
    }
  };
  const handleClickCardPredict = (breed) => {
    navigate(`/pets/${breed}`);
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
                placeholder="Find pet by name"
                onSearch={async (value) => {
                  try {
                    if (!value || value.trim() === "") {
                      setFilteredPets(pets); // reset về tất cả nếu không có keyword
                      return;
                    }
                    const data = await petService.searchPet(value);
                    setFilteredPets(data.data);
                  } catch (err) {
                    message.error("Tìm kiếm thất bại!");
                    console.error(err);
                  }
                }}
                style={{ width: "700px" }}
                className="search-bar"
              />
              <Button className="btn" onClick={showModal}>
                Find by image
              </Button>
              {/* Modal */}
              <Modal
                title="Find cat pet by image"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                  <Button key="cancel" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button
                    key="search"
                    type="primary"
                    onClick={handleSearchImage}
                  >
                    Find
                  </Button>,
                ]}
              >
                <Upload.Dragger
                  beforeUpload={() => false}
                  accept=".png,.jpg,.jpeg,.webp"
                  multiple={false}
                  fileList={fileList}
                  onChange={handleUploadChange}
                  showUploadList={false} //
                >
                  {fileList.length > 0 ? (
                    <Image
                      src={URL.createObjectURL(fileList[0].originFileObj)}
                      alt="Ảnh đã chọn"
                      style={{ maxHeight: 200, objectFit: "contain" }}
                    />
                  ) : (
                    <>
                      <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Drop or click to select image
                      </p>
                      <p className="ant-upload-hint">
                        Only support for PNG, JPG, JPEG, WEBP
                      </p>
                    </>
                  )}
                </Upload.Dragger>
                {predictedPet && (
                  <Card
                    title={`Kết quả: ${predictedPet.name}`}
                    style={{ marginTop: 24 }}
                    cover={
                      <Image src={predictedPet.image} alt={predictedPet.name} />
                    }
                    onClick={() => handleClickCardPredict(predictedPet.breed)}
                  >
                    <p>
                      <strong>Breed:</strong> {predictedPet.breed}
                    </p>
                    <p>
                      <strong>Difficulty:</strong> {predictedPet.difficulty}
                    </p>
                    <p>
                      <strong>Behavior:</strong> {predictedPet.behavior}
                    </p>
                    <p>
                      <strong>Description:</strong> {predictedPet.description}
                    </p>
                  </Card>
                )}
              </Modal>
            </div>
          </div>
          <Content style={{ background: "#fff", padding: 24 }}>
            <Title level={3}>Pet list</Title>
            <PetList pets={filteredPets} />
          </Content>
        </Layout>
      </Layout>
    </MainLayout>
  );
};

export default PetListPage;
