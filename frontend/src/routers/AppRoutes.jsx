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
import DashBoardPage from "../pages/admin/DashBoardPage";
import AdminPetListPage from "../pages/admin/PetListPage";
import AddNewPetPage from "../pages/admin/AddPetPage";
import UpdatePetPage from "../pages/admin/UpdatePetPage";
import AdminPetDetailListPage from "../pages/admin/PetDetailListPage";
import AddPetDetailPage from "../pages/admin/AddPetDetailPage";
import UpdatePetDetailPage from "../pages/admin/UpdatePetDetailPage";
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
      {/* admin */}
      <Route
        path="/admin/dashboard"
        element={<DashBoardPage></DashBoardPage>}
      ></Route>
      <Route
        path="/admin/pets"
        element={<AdminPetListPage></AdminPetListPage>}
      ></Route>
      <Route
        path="/admin/pets/add"
        element={<AddNewPetPage></AddNewPetPage>}
      ></Route>
      <Route
        path="/admin/pets/update/:breed"
        element={<UpdatePetPage></UpdatePetPage>}
      ></Route>
      <Route
        path="/admin/pets/:breed"
        element={<AdminPetDetailListPage></AdminPetDetailListPage>}
      ></Route>
      <Route
        path="/admin/pets/:breed/add"
        element={<AddPetDetailPage></AddPetDetailPage>}
      ></Route>
      <Route
        path="/admin/pets/:breed/:petDetailId/update"
        element={<UpdatePetDetailPage></UpdatePetDetailPage>}
      ></Route>
    </Routes>
  );
};

export default AppRoutes;
