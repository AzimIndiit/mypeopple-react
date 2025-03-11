import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import PrivateRoute from "./PrivateRoute";
import AuthPage from "@/pages/auth/Page";
import AuthClientPage from "@/pages/auth/client/Page";
import NotFound from "@/pages/NotFound"; // Create a proper 404 page
import SubscriptionPage from "@/pages/subscription/Page";
import DashboardPage from "@/pages/dashboard/Page";
import OrdersPage from "@/pages/orders/Page";
import UsersPage from "@/pages/hrbp/users/Page";
import ProfilePage from "@/pages/hrbp/users/profile/Page";
import CreateOrder from "@/pages/orders/CreateOrder";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔓 Public Routes */}
      <Route element={<AuthLayout />}>
        {/* Auth Routes */}
        <Route path="/auth">
          <Route index element={<AuthPage />} />
          <Route path="login" element={<AuthPage />} />
          <Route path="otp" element={<AuthPage />} />
          <Route path="register" element={<AuthPage />} />
          <Route path="forgot-password" element={<AuthPage />} />
        </Route>

        {/* Client Auth Routes */}x
        <Route path="/auth/client">
          <Route index element={<AuthClientPage />} />
          <Route path="register" element={<AuthClientPage />} />
          <Route path="login" element={<AuthClientPage />} />
          <Route path="otp" element={<AuthClientPage />} />
          <Route path="reset-password" element={<AuthClientPage />} />
          <Route path="forgot-password" element={<AuthClientPage />} />
        </Route>
      </Route>

      {/* 🔒 Protected Routes */}
      <Route element={<PrivateRoute />}>
      <Route path="/subscription" element={<SubscriptionPage/>} />
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
           
          <Route path="/users" element={<UsersPage showFilters={true} isDashboard={false}/>} />
          <Route path="/users/:id" element={<ProfilePage />} />
          <Route path="/orders" element={<OrdersPage showFilters={true}/>} />
          <Route path="/orders/create" element={<CreateOrder />} />
          <Route path="/settings" element={<div>Settings</div>} />
          <Route path="/inbox" element={<div>Inbox</div>} />
        </Route>
      </Route>

      {/* 🌍 404 - Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
