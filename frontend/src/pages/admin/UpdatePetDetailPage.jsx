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
  Modal,
  DatePicker,
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
import moment from "moment";

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
      try {
        const res = await petDetailService.getById(petDetailId);
        const detail = res.data;

        // Format dateIn for the form if it exists
        if (detail.dateIn) {
          detail.dateIn = moment(detail.dateIn);
        }

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
      // Format dateIn before sending to API
      const petDetailData = {
        petDetailId,
        ...values,
        dateIn: values.dateIn ? values.dateIn.format("YYYY-MM-DD") : null,
      };

      const res = await petDetailService.updatePetDetailInfo(petDetailData);
      showSuccessNotification("Success", "Pet detail updated successfully");
      navigate(`/admin/pets/${breed}/${petDetailId}/update`);
    } catch (error) {
      showErrorNotification("Failed", "Failed to update pet detail");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      Modal.confirm({
        title: "Are you sure you want to delete this pet detail?",
        content: "This action cannot be undone.",
        okText: "Yes, delete it",
        okType: "danger",
        cancelText: "No, keep it",
        onOk: async () => {
          try {
            await petDetailService.deletePetDetailById(petDetailId);
            showSuccessNotification(
              "Deleted",
              "Pet detail deleted successfully"
            );
            navigate(`/admin/pets/${breed}`);
          } catch (error) {
            showErrorNotification("Error", "Failed to delete pet detail");
            console.error(error);
          }
        },
      });
    } catch (error) {
      console.error("Error showing confirmation:", error);
    }
  };

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <Card
          style={{
            maxWidth: 1300,
            width: "100%",
            backgroundColor: "#f2e2ff",
            position: "relative",
          }}
        >
          <Button
            type="primary"
            danger
            onClick={handleDelete}
            style={{ position: "absolute", top: 16, right: 16 }}
          >
            Delete
          </Button>
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
                      label="Date In"
                      name="dateIn"
                      rules={[
                        { required: true, message: "Please select date" },
                      ]}
                    >
                      <DatePicker
                        format="DD/MM/YYYY"
                        style={{ width: "100%" }}
                        placeholder="Select date"
                      />
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
