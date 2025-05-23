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
  Radio,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import petService from "../../service/petService";
import { useNavigate, useParams } from "react-router-dom";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../utils/commonUtils";
import AdminLayout from "../../layout/AdminLayout";
import petDetailService from "../../service/petDetailService";

const { Title } = Typography;

const AddPetDetailPage = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("https://i.imgur.com/WxNkKfa.png");
  const [fileUploadRef, setFileUploadRef] = useState(null);
  const navigate = useNavigate();
  const { breed } = useParams();

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
      const petDetailData = {
        ...values,
        breed,
      };

      const file = fileUploadRef;
      if (!file) {
        showErrorNotification(
          "Failed",
          "Please upload an image before submitting."
        );
        return;
      }

      const res = await petDetailService.addPetDetailInfo(petDetailData); // Giả định có hàm này trong petService
      console.log(res);

      const res2 = await petDetailService.addPetDetailImage(file, res.data.id); // Giả định có hàm này
      console.log(res2);

      showSuccessNotification("Success", "Pet detail added successfully!");
      navigate(`/admin/pets/${breed}`);
    } catch (error) {
      showErrorNotification("Failed", "Failed to add pet detail");
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <Card
          style={{ maxWidth: 1300, width: "100%", backgroundColor: "#f2e2ff" }}
        >
          <Title level={4}>Add New Pet - {breed}</Title>
          <Row gutter={24}>
            {/* Upload image */}
            <Col span={6} style={{ textAlign: "center" }}>
              <img
                src={imageUrl}
                alt="Pet Detail"
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
                initialValues={{ gender: true }}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Color"
                      name="color"
                      rules={[
                        { required: true, message: "Please input color" },
                      ]}
                    >
                      <Input placeholder="Enter color" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Age"
                      name="age"
                      rules={[{ required: true, message: "Please input age" }]}
                    >
                      <InputNumber min={0} max={50} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Gender"
                      name="gender"
                      rules={[
                        { required: true, message: "Please select gender" },
                      ]}
                    >
                      <Radio.Group>
                        <Radio value={true}>Male</Radio>
                        <Radio value={false}>Female</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Health Status"
                      name="heathStatus"
                      rules={[
                        {
                          required: true,
                          message: "Please input health status",
                        },
                      ]}
                    >
                      <Input placeholder="e.g., healthy, injured, sick" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Price"
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
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
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
                    Add Pet Detail
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

export default AddPetDetailPage;
