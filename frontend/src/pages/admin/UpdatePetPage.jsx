import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Typography,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layout/AdminLayout";
import petService from "../../service/petService";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../utils/commonUtils";

const { Title } = Typography;

const UpdatePetPage = () => {
  const [form] = Form.useForm();
  const { breed } = useParams();
  const [pet, setPet] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  //   const [fileUploadRef, setFileUploadRef] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await petService.getPetInfoByBreed(breed);
        const pet = res.data;
        console.log("fetch pet update", pet);

        form.setFieldsValue(pet);
        setPet(pet);
        if (pet.image) setImageUrl(pet.image);
      } catch (err) {
        showErrorNotification("Error", "Failed to load pet information");
      }
    };

    fetchPet();
  }, [form]);

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    const isSmallEnough = file.size / 1024 / 1024 < 2;
    if (!isImage) message.error("Only image files are allowed!");
    if (!isSmallEnough) message.error("Image must be smaller than 2MB!");
    return isImage && isSmallEnough;
  };

  const handleUploadChange = async (info) => {
    const file = info.file.originFileObj;
    if (!file) return;

    setUploading(true);
    try {
      const res = await petService.addPetImage(file, pet.id);
      if (res?.data?.image) {
        setImageUrl(res.data.image);
        showSuccessNotification(
          "Pet Image updated successfully",
          "Pet image has been uploaded"
        );
      } else {
        showErrorNotification("Upload Failed", "No image URL returned");
      }
    } catch (error) {
      showErrorNotification(
        "Update Pet Image Failed",
        "Could not upload image"
      );
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      const petData = {
        breedSearch: breed,
        ...values,
      };
      const res = await petService.updatePetInfo(petData);
      showSuccessNotification(
        "Success",
        "Pet Information updated successfully!"
      );
      navigate(`/admin/pets/update/${pet.breed}`);
    } catch (error) {
      showErrorNotification("Failed", "Failed to update pet");
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <Card
          style={{ maxWidth: 1300, width: "100%", backgroundColor: "#f2e2ff" }}
        >
          <Title level={4}>Update Pet</Title>
          <Row gutter={24}>
            {/* Upload image */}
            <Col span={6} style={{ textAlign: "center" }}>
              <img
                src={imageUrl || "https://i.imgur.com/WxNkKfa.png"}
                alt="Pet"
                style={{
                  width: 300,
                  height: 300,
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  marginBottom: 10,
                }}
              />
              <br />
              <Upload
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleUploadChange}
              >
                <Button icon={<UploadOutlined />} loading={uploading}>
                  Upload New Image
                </Button>
              </Upload>
            </Col>

            {/* Form fields */}
            <Col span={18}>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[{ required: true, message: "Please input name" }]}
                    >
                      <Input placeholder="Enter pet name" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Breed"
                      name="breed"
                      rules={[
                        { required: true, message: "Please input breed" },
                      ]}
                    >
                      <Input placeholder="Enter breed" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Difficulty"
                      name="difficulty"
                      rules={[
                        { required: true, message: "Please input difficulty" },
                      ]}
                    >
                      <InputNumber min={1} max={10} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Ferocious"
                      name="ferocious"
                      rules={[
                        {
                          required: true,
                          message: "Please input ferocious level",
                        },
                      ]}
                    >
                      <InputNumber min={1} max={10} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Space"
                      name="space"
                      rules={[
                        { required: true, message: "Please input space" },
                      ]}
                    >
                      <InputNumber min={1} max={10} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Group"
                      name="petGroup"
                      rules={[
                        { required: true, message: "Please input group" },
                      ]}
                    >
                      <InputNumber min={1} max={10} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="Behavior"
                      name="behavior"
                      rules={[
                        { required: true, message: "Please input behavior" },
                      ]}
                    >
                      <Input placeholder="e.g., calm, playful, aggressive" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item label="Description" name="description">
                      <Input.TextArea
                        rows={3}
                        placeholder="Describe your pet"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ background: "#3e0068" }}
                  >
                    Update Pet
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default UpdatePetPage;
