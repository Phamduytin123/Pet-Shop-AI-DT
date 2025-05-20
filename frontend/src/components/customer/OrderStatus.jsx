import React from "react";
import { Steps } from "antd";
import {
  FileTextOutlined,
  GiftOutlined,
  CarOutlined,
  SmileOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "../../assets/scss/OrderStatus.scss";

const { Step } = Steps;

const OrderStatus = ({ currentStep = 1 }) => {
  const steps = [
    {
      title: "Wait for confirmation",
      icon: <FileTextOutlined style={{ color: "green" }} />,
    },
    {
      title: "Packaging",
      icon: <GiftOutlined style={{ color: "#fa8c16" }} />,
    },
    {
      title: "On The Road",
      icon: <CarOutlined style={{ color: "#40a9ff" }} />,
    },
    {
      title: "Delivered",
      icon: <SmileOutlined style={{ color: "#fadb14" }} />,
    },
    {
      title: "Done",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
    },
  ];

  return (
    <Steps
      current={currentStep}
      direction="horizontal"
      size="small"
      labelPlacement="vertical"
    >
      {steps.map((step, index) => (
        <Step key={index} title={step.title} icon={step.icon} />
      ))}
    </Steps>
  );
};

export default OrderStatus;
