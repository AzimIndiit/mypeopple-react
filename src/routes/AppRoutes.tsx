// import { Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import NotFound from "@/pages/NotFound";

import AuthRoutes from "./AuthRoutes";
import DashboardRoutes from "./DashboardRoutes";
import OrderRoutes from "./OrderRoutes";
import InboxRoutes from "./InboxRoutes";
import BillingRoutes from "./BillingRoutes";
import SettingsRoutes from "./SettingsRoutes";
import MeetingRoutes from "./MeetingRoutes";
import SubscriptionRoutes from "./SubscriptionRoutes";
import DashboardLayout from "@/layouts/DashboardLayout";
import UserRoutes from "./UserRoutes";
import ToolBoxRoutes from "./ToolBoxRoutes";

const AppRoutes = () => {
  

  return (
    <Routes>
      {/* Auth Routes */}

      {AuthRoutes()}

      {/* 🔒 Protected Routes */}
      <Route element={<PrivateRoute />}>
        {SubscriptionRoutes()}
        {MeetingRoutes()}

        <Route path="/" element={<DashboardLayout />}>
          {/* <Suspense fallback={<SuspenseLoader/>}> */}
          {DashboardRoutes()}
          {UserRoutes()}
          {OrderRoutes()}
          {InboxRoutes()}
          {ToolBoxRoutes()}
          {BillingRoutes()}
          {SettingsRoutes()}
          {/* </Suspense> */}
        </Route>
      </Route>

      {/* 🌍 404 - Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
