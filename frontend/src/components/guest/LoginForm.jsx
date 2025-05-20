import React from "react";
import { Form, Input, Button, Checkbox, Flex, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import LoginCat from "../../assets/images/catLogin.png";
import { useNavigate } from "react-router-dom";
import authService from "../../service/authService";
import { ReducerCases } from "../../constants/ReducerCases";
import { useStateContext } from "../../context/StateContext";
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_SELLER } from "../../constants/Role";
// import "antd/dist/reset.css";
import "../../assets/scss/FormRegister.scss";
import { useEffect } from "react";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../utils/commonUtils";
const LoginForm = () => {
  const [state, dispatch] = useStateContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (state?.account) {
      navigate("/"); // nếu đã đăng nhập thì redirect
    }
  }, [state, navigate]);
  const onFinish = async (values) => {
    console.log("Form values: ", values);
    // Gửi dữ liệu login đến server tại đây (fetch/axios)
    try {
      const { email, password } = values;
      const credentials = {
        email: email,
        password: password,
      };
      console.log(credentials);

      const { is_success } = await authService.login(credentials);
      if (is_success) {
        const { data } = await authService.getAccountInfo();
        console.log(data);
        showSuccessNotification("Login success", "Login success");
        dispatch({ type: ReducerCases.SET_ACCOUNT_INFO, data });

        switch (data?.role) {
          case ROLE_CUSTOMER:
            navigate("/");
            break;
          case ROLE_SELLER:
            navigate("/");
            break;
          case ROLE_ADMIN:
            navigate("/");
            break;
        }

        navigate("/");
      }
    } catch (error) {
      showErrorNotification(
        "Login Failed",
        "Please check again your password or email !!"
      );
    }
  };

  return (
    <Flex style={{ marginTop: "5%" }} justify="center" align="center" gap="2em">
      <div
        className="left-form"
        style={{
          width: 500,
          height: 600,
          padding: 24,
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: 8,
          background: "#FBF6FF",
        }}
      >
        <h1 style={{ color: "#410075" }}>WELCOME TO</h1>
        <h1 style={{ color: "#A1BE97", marginTop: 0 }}>PET PARADISE</h1>
        <p style={{ color: "#595959", marginBottom: "45px" }}>
          We offer expert pet training, high-quality food, and everything your
          pet needs to stay happy and healthy.
        </p>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="dynamic_form"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox style={{ font: "#595959" }}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ backgroundColor: "#410075" }}
            >
              Sign in
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
          src={LoginCat}
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
};

export default LoginForm;
