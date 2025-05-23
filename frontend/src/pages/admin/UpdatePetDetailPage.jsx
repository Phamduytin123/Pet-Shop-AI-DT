import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layout/AdminLayout";
import petService from "../../service/petService";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../utils/commonUtils";
import petDetailService from "../../service/petDetailService";

const { Title } = Typography;

const UpdatePetDetailPage = () => {
  const [form] = Form.useForm();
  const { breed, petDetailId } = useParams();
  const [petDetail, setPetDetail] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetDetail = async () => {
      //   console.log("enter fetch");

      try {
        const res = await petDetailService.getById(petDetailId);
        // console.log("Fetch petdetail", res);

        const detail = res.data;
        form.setFieldsValue(detail);
        setPetDetail(detail);
        if (detail.image) setImageUrl(detail.image);
      } catch (err) {
        showErrorNotification("Error", "Failed to load pet detail information");
      }
    };

    fetchPetDetail();
  }, []);

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
      const res = await petDetailService.addPetDetailImage(file, petDetailId);
      if (res?.data?.image) {
        setImageUrl(res.data.image);
        showSuccessNotification("Image updated", "Pet detail image uploaded");
      } else {
        showErrorNotification("Upload Failed", "No image URL returned");
      }
    } catch (error) {
      showErrorNotification("Upload Error", "Could not upload image");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      const petDetailData = {
        petDetailId,
        ...values,
      };
      const res = await petDetailService.updatePetDetailInfo(petDetailData);
      showSuccessNotification("Success", "Pet detail updated successfully");
      navigate(`/admin/pets/${breed}/${petDetailId}/update`);
    } catch (error) {
      showErrorNotification("Failed", "Failed to update pet detail");
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <Card
          style={{ maxWidth: 1300, width: "100%", backgroundColor: "#f2e2ff" }}
        >
          <Title level={4}>Update Pet Detail</Title>
          <Row gutter={24}>
            {/* Upload image */}
            <Col span={6} style={{ textAlign: "center" }}>
              <img
                src={imageUrl || "https://i.imgur.com/WxNkKfa.png"}
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
                      <InputNumber min={0} style={{ width: "100%" }} />
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
                      <Input placeholder="Enter health status" />
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
                        style={{ width: "100%" }}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/,/g, "")}
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
                      <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ background: "#3e0068" }}
                  >
                    Update Pet Detail
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

export default UpdatePetDetailPage;
