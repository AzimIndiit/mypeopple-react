// import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import PrivateRoute from "./PrivateRoute";
// import Login from "@/pages/Auth/Login";
import AuthPage from "@/pages/Auth/Page";

// Lazy-loaded pages


const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔓 Public Routes */}
      <Route element={<AuthLayout />}>
      <Route path="/" element={<AuthPage/>} />
      <Route path="/reset-password" element={<AuthPage/>} />
      </Route>

      {/* 🔒 Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="/users" element={<div>user</div>} />
        </Route>
      </Route>

      {/* 🌍 404 - Not Found */}
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  );
};

export default AppRoutes;