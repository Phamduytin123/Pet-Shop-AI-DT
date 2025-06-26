import React, { useState } from "react";
import { Form, Input, Button, message, Flex } from "antd";
import RegisterCat from "../../assets/images/catRegister.png";
import "../../assets/scss/FormRegister.scss";
import authService from "../../service/authService";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [formStep, setFormStep] = useState("register");
  const [email, setEmail] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Validation rules
  const passwordRules = [
    { required: true, message: "Please input your password!" },
    { min: 8, message: "Password must be at least 8 characters!" },
    {
      pattern:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      message:
        "Password must contain at least one uppercase, one lowercase, one number and one special character!",
    },
  ];

  const emailRules = [
    { required: true, message: "Please input your email!" },
    {
      type: "email",
      message: "Please enter a valid email address!",
    },
  ];

  const handleRegister = async (values) => {
    await form.validateFields();
    const { email, fullName, password, confirmPassword } = values;
    const credentials = {
      email: email,
      fullName: fullName,
      password: password,
      confirmPassword: confirmPassword,
    };

    setLoading(true);
    try {
      const response = await authService.register(credentials);
      if (!response.is_success) throw new Error("Register failed");
      message.success("OTP has been sent to your email");
      setEmail(values.email);
      setFormStep("otp");
    } catch (error) {
      message.error("Registration failed");
      // if (!error.errorFields) {
      //   message.error("Registration failed" || "Registration failed");
      // }
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
      navigate("/login");
    } catch (err) {
      message.error(err.message || "OTP verification failed");
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
          form={form}
          className="dynamic_form"
          name="dynamic_form"
          onFinish={formStep === "register" ? handleRegister : handleOtpSubmit}
          onFinishFailed={() =>
            message.error("Please fill all required fields correctly")
          }
          validateTrigger={["onChange", "onBlur"]}
          validateMessages={{ required: "'${name}' is required!" }}
        >
          {formStep === "register" ? (
            <>
              <Form.Item
                name="fullName"
                rules={[
                  { required: true, message: "Please enter your fullname!" },
                  {
                    min: 2,
                    message: "Fullname must be at least 2 characters!",
                  },
                ]}
              >
                <Input placeholder="Fullname" />
              </Form.Item>

              <Form.Item name="email" rules={emailRules}>
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={passwordRules}
                validateTrigger={["onChange", "onBlur"]}
                validateFirst
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
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
              rules={[
                { required: true, message: "Please enter OTP code!" },
                { len: 6, message: "OTP must be 6 characters!" },
              ]}
            >
              <Input
                placeholder="Enter OTP code from your email"
                maxLength={6}
              />
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
          alt="Register Illustration"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        />
      </div>
    </Flex>
  );
}
