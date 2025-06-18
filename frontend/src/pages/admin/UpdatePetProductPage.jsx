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
  Select,
  Modal,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layout/AdminLayout";
import petDetailService from "../../service/petDetailService";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../utils/commonUtils";
import petProductService from "../../service/petProductService";

const { Title } = Typography;
const { Option } = Select;

const UpdatePetProductPage = () => {
  const [form] = Form.useForm();
  // Lấy breed và petProductId từ URL (đổi tên từ petDetailId)
  const { petProductId } = useParams();
  const [productDetail, setProductDetail] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await petProductService.getPetProductById(petProductId);
        const detail = res.data;
        form.setFieldsValue(detail);
        setProductDetail(detail);
        if (detail.image) setImageUrl(detail.image);
      } catch (err) {
        showErrorNotification(
          "Error",
          "Failed to load product detail information"
        );
      }
    };

    fetchProductDetail();
  }, [petProductId, form]);

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
      const res = await petProductService.addProductImage(file, petProductId);
      if (res?.data?.image) {
        setImageUrl(res.data.image);
        showSuccessNotification("Image updated", "Product image uploaded");
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
      const productData = {
        petProductId, // giữ ID sản phẩm
        ...values,
      };
      const res = await petProductService.updatePetProductInfo(productData);
      showSuccessNotification("Success", "Product updated successfully");
      navigate(`/admin/petProducts/update/${petProductId}`);
    } catch (error) {
      showErrorNotification("Failed", "Failed to update product detail");
      console.error(error);
    }
  };
  const handleDelete = async () => {
    try {
      // Hiển thị hộp thoại xác nhận
      Modal.confirm({
        title: "Are you sure you want to delete this pet product?",
        content: "This action cannot be undone.",
        okText: "Yes, delete it",
        okType: "danger",
        cancelText: "No, keep it",
        onOk: async () => {
          try {
            await petProductService.deletePetProductById(petProductId);
            showSuccessNotification(
              "Deleted",
              "Pet product deleted successfully"
            );
            navigate(`/admin/petProducts`);
          } catch (error) {
            showErrorNotification("Error", "Failed to delete pet product");
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
          <Title level={4}>Update Pet Product</Title>
          <Row gutter={24}>
            {/* Phần upload ảnh bên trái */}
            <Col span={6} style={{ textAlign: "center" }}>
              <img
                src={imageUrl || "https://i.imgur.com/WxNkKfa.png"}
                alt="Product"
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

            {/* Form cập nhật product bên phải */}
            <Col span={18}>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={16}>
                  {/* Tên sản phẩm */}
                  <Col span={12}>
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please input product name",
                        },
                      ]}
                    >
                      <Input placeholder="Enter product name" />
                    </Form.Item>
                  </Col>

                  {/* Loại sản phẩm */}
                  <Col span={12}>
                    <Form.Item
                      label="Type"
                      name="type"
                      rules={[
                        {
                          required: true,
                          message: "Please select product type",
                        },
                      ]}
                    >
                      <Select placeholder="Select product type">
                        <Option value="FOOD">Food</Option>
                        <Option value="TOY">Toy</Option>
                        <Option value="ACCESSORY">Accessory</Option>
                        {/* Thêm tùy chọn nếu cần */}
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* Mô tả sản phẩm */}
                  <Col span={24}>
                    <Form.Item
                      label="Description"
                      name="description"
                      rules={[
                        { required: true, message: "Please input description" },
                      ]}
                    >
                      <Input.TextArea
                        rows={4}
                        placeholder="Enter product description"
                      />
                    </Form.Item>
                  </Col>

                  {/* Giá sản phẩm */}
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

                  {/* Số lượng sản phẩm */}
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
                    Update Pet Product
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

export default UpdatePetProductPage;
