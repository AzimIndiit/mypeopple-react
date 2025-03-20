import { lazy } from "react";
import { Route } from "react-router-dom";

const UsersPage = lazy(() => import("@/pages/hrbp/users/Page"));
const UserProfilePage = lazy(() => import("@/pages/hrbp/users/UserProfile"));

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
