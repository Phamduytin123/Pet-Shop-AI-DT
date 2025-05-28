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
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../utils/commonUtils";
import AdminLayout from "../../layout/AdminLayout";
import petProductService from "../../service/petProductService";

const { Title } = Typography;
const { Option } = Select;

const AddPetProductPage = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("https://i.imgur.com/WxNkKfa.png");
  const [fileUploadRef, setFileUploadRef] = useState(null);
  const navigate = useNavigate();

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) message.error("Only image files are allowed!");
    const isSmallEnough = file.size / 1024 / 1024 < 2;
    if (!isSmallEnough) message.error("Image must be smaller than 2MB!");
    return isImage && isSmallEnough;
  };

  const handleUploadChange = (info) => {
    const file = info.file.originFileObj;
    if (!file) return;
    setFileUploadRef(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onFinish = async (values) => {
    try {
      const productData = { ...values };
      const file = fileUploadRef;

      if (!file) {
        showErrorNotification(
          "Failed",
          "Please upload an image before submitting."
        );
        return;
      }

      const res = await petProductService.addPetProduct(productData);
      await petProductService.addProductImage(file, res.data.id);

      showSuccessNotification("Success", "Product added successfully!");
      navigate("/admin/petProducts");
    } catch (error) {
      console.error(error);
      showErrorNotification("Failed", "Failed to add product");
    }
  };

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <Card
          style={{ maxWidth: 1300, width: "100%", backgroundColor: "#f2e2ff" }}
        >
          <Title level={4}>Add New Pet Product</Title>
          <Row gutter={24}>
            {/* Upload image */}
            <Col span={6} style={{ textAlign: "center" }}>
              <img
                src={imageUrl}
                alt="Pet Product"
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
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Product Name"
                      name="name"
                      rules={[{ required: true, message: "Please input name" }]}
                    >
                      <Input placeholder="Enter product name" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Product Type"
                      name="type"
                      rules={[
                        {
                          required: true,
                          message: "Please select product type",
                        },
                      ]}
                    >
                      <Select placeholder="Select a type">
                        <Option value="Food">Food</Option>
                        <Option value="Toy">Toy</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="Description"
                      name="description"
                      rules={[
                        { required: true, message: "Please input description" },
                      ]}
                    >
                      <Input.TextArea
                        rows={3}
                        placeholder="Enter description"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Price (VND)"
                      name="price"
                      rules={[
                        { required: true, message: "Please input price" },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/,/g, "")}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Quantity"
                      name="quantity"
                      rules={[
                        { required: true, message: "Please input quantity" },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        max={1000}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add Product
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

export default AddPetProductPage;
