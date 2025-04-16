// src/routes/route.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PetListPage from "../pages/PetListPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pets" element={<PetListPage />}></Route>
    </Routes>
  );
};

export default AppRoutes;
