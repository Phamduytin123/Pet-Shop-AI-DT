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
import AdminOrderPage from "../pages/admin/OrderPage";
import AdminAccountsPage from "../pages/admin/AccountPage";
import PetProductListPage from "../pages/PetProductListPage";
import PetProductPage from "../pages/PetProductPage";
import AdminPetProductListPage from "../pages/admin/PetProductListPage";
import AddPetProductPage from "../pages/admin/AddPetProductPage";
import UpdatePetProductPage from "../pages/admin/UpdatePetProductPage";
import SellerAccountInfoPage from "../pages/admin/AccountInfoPage";
import AdminOrderDetailPage from "../pages/admin/OrderDetailPage";
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
      <Route
        path="/petProducts"
        element={<PetProductListPage></PetProductListPage>}
      ></Route>
      <Route
        path="/petProducts/:petProductId"
        element={<PetProductPage></PetProductPage>}
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
      <Route
        path="/admin/orders"
        element={<AdminOrderPage></AdminOrderPage>}
      ></Route>
      <Route
        path="/admin/orders/:orderId"
        element={<AdminOrderDetailPage></AdminOrderDetailPage>}
      ></Route>
      <Route
        path="/admin/accounts"
        element={<AdminAccountsPage></AdminAccountsPage>}
      ></Route>
      <Route
        path="/admin/petProducts"
        element={<AdminPetProductListPage></AdminPetProductListPage>}
      ></Route>
      <Route
        path="/admin/petProducts/add"
        element={<AddPetProductPage></AddPetProductPage>}
      ></Route>
      <Route
        path="/admin/petProducts/update/:petProductId"
        element={<UpdatePetProductPage></UpdatePetProductPage>}
      ></Route>
      <Route
        path="/seller/profile"
        element={<SellerAccountInfoPage></SellerAccountInfoPage>}
      ></Route>
    </Routes>
  );
};

export default AppRoutes;
