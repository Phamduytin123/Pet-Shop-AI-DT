// src/routes/route.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PetListPage from "../pages/PetListPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PetDetailListPage from "../pages/PetDetailListPage";
import PetDetailPage from "../pages/PetDetailPage";
import ShoppingCartPage from "../pages/Customer/ShoppingCartPage";
import PaymentInformationPage from "../pages/Customer/PaymentInformationPage";
import OrderPage from "../pages/Customer/OrderPage";
import OrderDetailPage from "../pages/Customer/OrderDetailPage";
import AccountInfoPage from "../pages/Customer/AccountInfoPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pets" element={<PetListPage />}></Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      <Route
        path="/pets/:breed"
        element={<PetDetailListPage></PetDetailListPage>}
      ></Route>
      <Route
        path="/pet-detail/:breed/:petDetailId"
        element={<PetDetailPage></PetDetailPage>}
      ></Route>
      <Route
        path="/shopping-carts"
        element={<ShoppingCartPage></ShoppingCartPage>}
      ></Route>
      <Route
        path="/payment/info"
        element={<PaymentInformationPage></PaymentInformationPage>}
      ></Route>
      <Route path="/orders" element={<OrderPage></OrderPage>}></Route>
      <Route
        path="/orders/:orderId"
        element={<OrderDetailPage></OrderDetailPage>}
      ></Route>
      <Route
        path="/profile"
        element={<AccountInfoPage></AccountInfoPage>}
      ></Route>
    </Routes>
  );
};

export default AppRoutes;
