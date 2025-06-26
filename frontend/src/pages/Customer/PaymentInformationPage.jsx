import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  List,
  Input,
  Modal,
  Select,
  Button,
  Checkbox,
} from "antd";
import MainLayout from "../../layout/MainLayout";
import { useStateContext } from "../../context/StateContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import orderService from "../../service/orderService";
const { Title, Text } = Typography;
const { Option } = Select;

const PaymentInformationPage = () => {
  const [state] = useStateContext();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState(
    state.account?.phone_number || ""
  );
  const [phoneError, setPhoneError] = useState("");
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [cityError, setCityError] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [detailAddressError, setDetailAddressError] = useState("");
  const [fullAddress, setFullAddress] = useState(state.account?.address || "");
  const [shippingMethod, setShippingMethod] = useState("SHIPCODE");
  const location = useLocation();
  const { items } = location.state || {};
  const hasExistingAddress = !!state.account?.address;
  // const hasExistingPhone = !!state.account?.phone_number;
  useEffect(() => {
    axios
      .get("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((res) => {
        // console.log("province", res.data.data);
        // console.log("carts: ", items);

        setProvinces(res.data.data); // data: {id, name}
      })
      .catch((err) => {
        console.error("Error fetching provinces:", err);
      });
  }, []);

  useEffect(() => {
    if (selectedProvinceId) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/2/${selectedProvinceId}.htm`)
        .then((res) => {
          //   console.log("city ", res.data.data);
          setCities(res.data.data); // data: {id, name}
        })
        .catch((err) => {
          console.error("Error fetching cities:", err);
        });
    } else {
      setCities([]); // reset nếu chưa chọn tỉnh
    }
  }, [selectedProvinceId]);

  const selectedItems = location.state.items || {};
  console.log("wwhy", selectedItems);

  const totalAmount = Object.values(selectedItems).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!state.account) {
    navigate("/login");
  }

  const handleOpenAddressModal = () => setAddressModalVisible(true);
  const handleCloseAddressModal = () => {
    clearAddressErrors();
    setAddressModalVisible(false);
  };

  const clearAddressErrors = () => {
    setProvinceError("");
    setCityError("");
    setDetailAddressError("");
  };
  // Validate phone number
  const validatePhoneNumber = () => {
    if (!phoneNumber) {
      setPhoneError("Phone number is required");
      return false;
    }
    if (!/^0\d{9}$/.test(phoneNumber)) {
      setPhoneError("Phone number must be 10 digits and start with 0");
      return false;
    }
    setPhoneError("");
    return true;
  };
  // Validate address modal fields
  const validateAddressFields = () => {
    if (hasExistingAddress) return true;
    let valid = true;
    if (!selectedProvinceId) {
      setProvinceError("Province is required");
      valid = false;
    } else {
      setProvinceError("");
    }
    if (!selectedCityId) {
      setCityError("City is required");
      valid = false;
    } else {
      setCityError("");
    }
    if (!detailAddress.trim()) {
      setDetailAddressError("Detail address is required");
      valid = false;
    } else {
      setDetailAddressError("");
    }
    return valid;
  };
  const handleAddressConfirm = () => {
    if (!validateAddressFields()) return;
    if (hasExistingAddress) {
      setAddressModalVisible(false);
      return;
    }
    const province = provinces.find((p) => p.id === selectedProvinceId);
    const provinceName = province ? province.name : "";
    const combinedAddress = `${provinceName}, ${selectedCityId}, ${detailAddress}`;
    setFullAddress(combinedAddress);
    setAddressModalVisible(false);
  };

  const handleConfirmOrder = async () => {
    const phoneValid = validatePhoneNumber();
    const addressValid =
      hasExistingAddress ||
      (fullAddress && selectedProvinceId && selectedCityId && detailAddress);
    if (!addressValid) {
      // Mở modal để người dùng chỉnh sửa nếu chưa nhập address
      setAddressModalVisible(true);
      if (!selectedProvinceId) setProvinceError("Province is required");
      if (!selectedCityId) setCityError("City is required");
      if (!detailAddress.trim())
        setDetailAddressError("Detail address is required");
      return;
    }
    if (!phoneValid) return;

    const itemList = Object.values(selectedItems);
    const items = itemList.map(({ itemId, quantity }) => ({
      itemId: itemId,
      quantity,
    }));

    const request = {
      phoneNumber,
      address: fullAddress,
      listItems: items,
      paymentMethod: shippingMethod,
    };
    console.log("hehehe", request);

    try {
      const response = await orderService.createOrder(request);
      console.log("short link", response.payUrl);
      if (shippingMethod === "SHIPCODE") {
        navigate("/pets");
      } else if (shippingMethod === "MOMO") {
        // navigate(response.shortLink);
        window.location.href = response.payUrl;
      }
    } catch (e) {
      console.log(e);
    }
    console.log("Confirm Order", {
      phoneNumber,
      fullAddress,
      shippingMethod,
      selectedItems,
    });
  };

  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 24,
          marginTop: 80,
        }}
      >
        <Row
          gutter={16}
          style={{
            width: "100%",
            maxWidth: 1200,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Left: Payment Information */}
          <Col span={14}>
            <Card title="Payment Information">
              <div style={{ marginBottom: 16 }}>
                <Text strong>Phone Number</Text>
                <Input
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onBlur={validatePhoneNumber}
                  maxLength={10}
                />
                {phoneError && (
                  <Text
                    type="danger"
                    style={{ marginTop: 4, display: "block" }}
                  >
                    {phoneError}
                  </Text>
                )}
              </div>

              <div style={{ marginBottom: 16 }}>
                <Text strong>Address</Text>
                <Input
                  readOnly
                  placeholder="Click to enter address"
                  value={fullAddress}
                  onClick={handleOpenAddressModal}
                />
                {!fullAddress && (
                  <Text
                    type="danger"
                    style={{ marginTop: 4, display: "block" }}
                  >
                    Address is required
                  </Text>
                )}
              </div>

              <Text strong>Shipping Method</Text>
              <div
                style={{
                  marginBottom: 16,
                  display: "flex",
                  gap: "5em",
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <label
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <Checkbox
                    checked={shippingMethod === "SHIPCODE"}
                    onChange={() => setShippingMethod("SHIPCODE")}
                  />
                  Ship CODE
                </label>

                <label
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <Checkbox
                    checked={shippingMethod === "MOMO"}
                    onChange={() => setShippingMethod("MOMO")}
                  />
                  Pay by Momo
                </label>
              </div>
            </Card>
          </Col>

          {/* Right: Order Summary */}
          <Col span={10}>
            <Card title="Order Summary">
              {/* Header */}
              <div
                style={{ display: "flex", fontWeight: "bold", marginBottom: 8 }}
              >
                <div style={{ flex: 2 }}>Product</div>
                <div style={{ flex: 1, textAlign: "center" }}>Quantity</div>
                <div style={{ flex: 1, textAlign: "right" }}>Price</div>
              </div>

              {/* List Items */}
              <List
                dataSource={Object.values(selectedItems)}
                renderItem={(item) => (
                  <List.Item>
                    <div style={{ display: "flex", width: "100%" }}>
                      <div style={{ flex: 2 }}>{item.name}</div>
                      <div style={{ flex: 1, textAlign: "center" }}>
                        {item.quantity}x
                      </div>
                      <div style={{ flex: 1, textAlign: "right" }}>
                        {(item.quantity * item.price).toLocaleString()} VND
                      </div>
                    </div>
                  </List.Item>
                )}
              />
              <hr />
              <Title level={5}>Total: {totalAmount.toLocaleString()} VND</Title>
              <Button
                type="primary"
                block
                disabled={totalAmount === 0}
                onClick={handleConfirmOrder}
              >
                Confirm Order
              </Button>
            </Card>
          </Col>
        </Row>

        {/* Modal for Address Input */}
        <Modal
          title="Enter Address"
          open={addressModalVisible}
          onOk={handleAddressConfirm}
          onCancel={handleCloseAddressModal}
          width={600}
        >
          <div style={{ marginBottom: 16 }}>
            <Text>Province</Text>
            <Select
              style={{ width: "100%" }}
              value={selectedProvinceId}
              onChange={(value) => setSelectedProvinceId(value)}
              placeholder="Select province"
              dropdownRender={(menu) => <>{menu}</>}
            >
              <option value="">-- Chọn tỉnh/thành --</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </Select>
            {provinceError && (
              <Text type="danger" style={{ marginTop: 4, display: "block" }}>
                {provinceError}
              </Text>
            )}
          </div>
          <div style={{ marginBottom: 16 }}>
            <Text>City</Text>
            <Select
              disabled={!selectedProvinceId}
              style={{ width: "100%" }}
              value={selectedCityId}
              onChange={(value) => setSelectedCityId(value)}
              placeholder="Select city"
            >
              <option value="">-- Chọn quận/huyện --</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </Select>
            {cityError && (
              <Text type="danger" style={{ marginTop: 4, display: "block" }}>
                {cityError}
              </Text>
            )}
          </div>
          <div>
            <Text>Detail Address</Text>
            <Input
              placeholder="Enter street, house number, etc."
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              onBlur={() => {
                if (!detailAddress.trim()) {
                  setDetailAddressError("Detail address is required");
                } else {
                  setDetailAddressError("");
                }
              }}
            />
            {detailAddressError && (
              <Text type="danger" style={{ marginTop: 4, display: "block" }}>
                {detailAddressError}
              </Text>
            )}
          </div>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default PaymentInformationPage;
