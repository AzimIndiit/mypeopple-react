import { lazy } from "react";
import { Route } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";

const AuthPage = lazy(() => import("@/pages/auth/Page"));
const AuthClientPage = lazy(() => import("@/pages/auth/client/Page"));

const AuthRoutes = () => (
  <>
    <Route element={<AuthLayout />}>
      <Route path="/auth/*" element={<AuthPage />} />
      <Route path="/auth/client/*" element={<AuthClientPage />} />
    </Route>
  </>
);

export default AuthRoutes;
