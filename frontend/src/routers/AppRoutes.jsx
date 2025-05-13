// src/routes/route.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PetListPage from "../pages/PetListPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PetDetailListPage from "../pages/PetDetailListPage";
import PetDetailPage from "../pages/PetDetailPage";
import ShoppingCartPage from "../pages/Customer/ShoppingCartPage";

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
    </Routes>
  );
};

export default AppRoutes;
