import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Flex, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import RegisterCat from "../../assets/images/catRegister.png";
import "../../assets/scss/FormRegister.scss";
import { useStateContext } from "../../context/StateContext";
import authService from "../../service/authService";
import { useNavigate } from "react-router-dom";
export default function RegisteForm() {
  const [formStep, setFormStep] = useState("register");
  const [email, setEmail] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    const { email, fullName, password, confirmPassword } = values;
    const credentials = {
      email: email,
      fullName: fullName,
      password: password,
      confirmPassword: confirmPassword,
    };
    console.log(credentials);
    setLoading(true);
    try {
      const response = await authService.register(credentials);
      if (!response.is_success) throw new Error("Register failed");
      message.success("OTP has been sent to your email");
      setEmail(values.email);
      setFormStep("otp");
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (values) => {
    const request = { email: email, otp: values.otp };
    setLoading(true);
    try {
      const response = await authService.confirmOtp(request);
      if (!response.is_success) throw new Error("Authorize OTP code failed!");
      message.success("Authorize OTP code success!");
      console.log(response.data);

      navigate("/login");
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex style={{ marginTop: "5%" }} justify="center" align="center" gap="2em">
      <div
        className="left-form"
        style={{
          width: 500,
          height: 600,
          padding: 50,
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: 8,
          background: "#FBF6FF",
        }}
      >
        <h1 style={{ color: "#410075" }}>
          {formStep === "register" ? "REGISTER" : "ENTER OTP"}
        </h1>

        <Form
          // name="register_form"
          // initialValues={{ remember: true }}
          // onFinish={onFinish}
          form={form}
          className="dynamic_form"
          name="dynamic_form"
          onFinish={formStep === "register" ? handleRegister : handleOtpSubmit}
        >
          {formStep === "register" ? (
            <>
              <Form.Item
                name="fullName"
                rules={[
                  { required: true, message: "Please enter your fullname!" },
                ]}
              >
                <Input placeholder="Fullname" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[{ required: true, message: "Please enter email!" }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please enter password!" }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[
                  { required: true, message: "Please enter confirm password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Confirm password incorrect!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
            </>
          ) : (
            <Form.Item
              name="otp"
              rules={[{ required: true, message: "Please enter OTP code!" }]}
            >
              <Input placeholder="Enter OTP code from your email" />
            </Form.Item>
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ backgroundColor: "#410075", marginTop: "35px" }}
              loading={loading}
            >
              {formStep === "register" ? "Sign up" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div
        className="right-image"
        style={{
          width: 500,
          height: 600,
        }}
      >
        <img
          src={RegisterCat}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        ></img>
      </div>
    </Flex>
  );
}
