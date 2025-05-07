// src/routes/route.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PetListPage from "../pages/PetListPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pets" element={<PetListPage />}></Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
    </Routes>
  );
};

export default AppRoutes;
