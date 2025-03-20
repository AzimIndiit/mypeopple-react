import TutorialPage from "@/pages/dashboard/tutorial/Page";
import { lazy } from "react";
import { Route, Navigate } from "react-router-dom";

const DashboardPage = lazy(() => import("@/pages/dashboard/Page"));

const DashboardRoutes = () => (
  <>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/tutorial" element={<TutorialPage />} />
  </>
);

export default DashboardRoutes;
