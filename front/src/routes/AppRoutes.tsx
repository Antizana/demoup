import React from "react";
import { Routes, Route } from "react-router-dom";
import Products from "../views/Products";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
    </Routes>
  );
}

export default AppRoutes;
