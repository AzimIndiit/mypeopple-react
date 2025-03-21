import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";

const ClientsPage = lazy(() => import("@/pages/users/client/Page"));
const ClientProfilePage = lazy(
  () => import("@/pages/users/client/UserProfile")
);
const CompanyDetails = lazy(() => import("@/pages/users/client/company/Page"));
const ClientRoutes = () => (
  <>
    <Route path="/clients" element={<Navigate to="/clients/users" replace />} />
    <Route
      path="/clients/users"
      element={<ClientsPage showFilters isDashboard={false} />}
    />
    <Route
      path="/clients/companies"
      element={<ClientsPage showFilters isDashboard={false} />}
    />
    <Route path="/clients/users/:id" element={<ClientProfilePage />} />
    <Route path="/clients/companies/:id" element={<CompanyDetails />} />
  </>
);

export default ClientRoutes;
