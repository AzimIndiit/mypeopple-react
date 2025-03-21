import { lazy } from "react";
import { Route } from "react-router-dom";

const UsersPage = lazy(() => import("@/pages/users/hrbp/Page"));
const UserProfilePage = lazy(() => import("@/pages/users/hrbp/UserProfile"));

const UserRoutes = () => (
  <>
    <Route
      path="/users"
      element={<UsersPage showFilters isDashboard={false} />}
    />
    <Route path="/users/:id" element={<UserProfilePage />} />
  </>
);

export default UserRoutes;
