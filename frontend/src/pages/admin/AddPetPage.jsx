import React, { useState } from "react";
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
import petService from "../../service/petService";
import { useNavigate } from "react-router-dom";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../utils/commonUtils";
import AdminLayout from "../../layout/AdminLayout";

const { Title } = Typography;

const AddNewPetPage = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("https://i.imgur.com/WxNkKfa.png");
  const [fileUploadRef, setFileUploadRef] = useState(null);
  const navigate = useNavigate();

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Only image files are allowed!");
    }
    const isSmallEnough = file.size / 1024 / 1024 < 2;
    if (!isSmallEnough) {
      message.error("Image must be smaller than 2MB!");
    }
    return isImage && isSmallEnough;
  };
  const handleUploadChange = (info) => {
    console.log("Upload info: ", info);
    const file = info.file.originFileObj;
    if (!file) return;

    setFileUploadRef(file); // lưu file lại để dùng sau

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result); // chỉ hiển thị ảnh tạm
    };
    reader.readAsDataURL(file);
  };

  const onFinish = async (values) => {
    try {
      const petData = {
        ...values,
      };
      const res = await petService.addPetInfo(petData);

      const file = fileUploadRef;
      if (!file) {
        showErrorNotification(
          "Failed",
          "Please upload an image before submitting."
        );
      }

      await petService.addPetImage(file, res.data.id);

      showSuccessNotification("Success", "Pet added successfully!");
      navigate("/admin/pets");
    } catch (error) {
      showErrorNotification("Failed", "Failed to add pet");
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <Card
          style={{ maxWidth: 1300, width: "100%", backgroundColor: "#f2e2ff" }}
        >
          <Title level={4}>Add New Pet</Title>
          <Row gutter={24}>
            {/* Upload image */}
            <Col span={6} style={{ textAlign: "center" }}>
              <img
                src={imageUrl}
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
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Col>

            {/* Form fields */}
            <Col span={18}>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{}}
              >
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
                    Add Pet
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

export default AddNewPetPage;
