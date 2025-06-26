import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Divider,
  Avatar,
  Upload,
  message,
  Select,
  DatePicker,
} from "antd";
import {
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AdminLayout from "../../layout/AdminLayout";
import { useStateContext } from "../../context/StateContext";
import { useNavigate } from "react-router-dom";
import authService from "../../service/authService";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../utils/commonUtils";

const { Title } = Typography;

const SellerAccountInfoPage = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [state] = useStateContext();
  if (!state.account) navigate("/login");
  const [account, setAccount] = useState(state.account);
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState("https://i.imgur.com/WxNkKfa.png");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      const res = await authService.getAccountInfo();
      console.log("fetch info", res.data);

      setAccount(res.data);
      setAvatarUrl(res.data.avatar || avatarUrl);

      form.setFieldsValue({
        dateofbirth: res.data.birth_date ? moment(res.data.birth_date) : null,
        fullName: res.data.full_name,
        email: res.data.email,
        address: res.data.address,
        phone: res.data.phone_number,
        gender: res.data.gender === true ? "Male" : "Female",
      });
    };
    fetchAccount();
  }, []);

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

  const handleChange = async (info) => {
    const file = info.file.originFileObj;
    if (!file) return;

    setUploading(true);
    try {
      const res = await authService.updateAvatar(file);
      if (res && res.data && res.data.avatarUrl) {
        setAvatarUrl(res.data.avatarUrl); // giả sử API trả về URL mới
      } else {
        // Nếu không trả về avatarUrl, đọc file trực tiếp
        const reader = new FileReader();
        reader.onload = () => setAvatarUrl(reader.result);
        reader.readAsDataURL(file);
      }
      showSuccessNotification(
        "Avatar updated successfully",
        "Avatar updated successfully"
      );
    } catch (error) {
      showErrorNotification("Update Avatar Failed", "Update Avatar Failed!");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const onFinishInfo = async (values) => {
    try {
      const formattedValues = {
        gender: values.gender === "Male",
        birthDate: values.dateofbirth
          ? values.dateofbirth.format("YYYY-MM-DD")
          : null,
        phoneNumber: values.phone,
        accountId: account.id,
        fullName: values.fullName,
        address: values.address,
        email: values.email,
      };
      console.log("Account Info:", formattedValues);
      // call api
      const res = await authService.updateInfo(formattedValues);
      showSuccessNotification(
        "Update Success",
        "Update Account Information Success"
      );
      console.log("update", res.data);
    } catch (error) {
      showErrorNotification("Update Account Failed", error.message);
    }
  };

  const onFinishPassword = async (values) => {
    try {
      // console.log("Password Change:", values);
      const req = {
        accountId: account.id,
        password: values.currentPassword,
        confirmPassword: values.confirmPassword,
        newPassword: values.newPassword,
      };
      console.log("Password Change:", req);
      const res = await authService.updatePassword(req);
      console.log("update pass", res.data);
      showSuccessNotification(
        "Update Password Success",
        "Update Account Password Success"
      );
    } catch (error) {
      showErrorNotification(
        "Update Account Failed",
        error.message ? error.message : "Update Account Password Failed!!"
      );
      console.log(error.data);
    }
  };

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <Card style={{ maxWidth: 900, width: "100%" }}>
          <Title level={4}>Account Settings</Title>
          <Row gutter={24} align="middle">
            <Col span={6} style={{ textAlign: "center" }}>
              <Avatar size={120} src={avatarUrl} style={{ marginBottom: 10 }} />
              <Upload
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                <Button icon={<UploadOutlined />} loading={uploading}>
                  Change Avatar
                </Button>
              </Upload>
            </Col>
            <Col span={18}>
              <Form layout="vertical" form={form} onFinish={onFinishInfo}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="dateofbirth" label="Date of birth">
                      <DatePicker
                        format="DD/MM/YYYY"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="gender" label="Gender">
                      <Select placeholder="Select gender">
                        <Select.Option value="Male">Male</Select.Option>
                        <Select.Option value="Female">Female</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="fullName" label="Full Name">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="email" label="Email">
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="address" label="Address">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="phone" label="Phone Number">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>

          <Divider />

          <Title level={5}>Change Password</Title>
          <Form
            layout="vertical"
            form={passwordForm}
            onFinish={onFinishPassword}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="currentPassword" label="Current Password">
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="newPassword" label="New Password">
                  <Input.Password placeholder="8+ characters" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="confirmPassword" label="Confirm Password">
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default SellerAccountInfoPage;
