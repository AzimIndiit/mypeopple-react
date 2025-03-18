import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user?.token) {
    return <Outlet />; // Allow access to protected routes if user is not logged in
  }

  // Handle redirection based on pathname
  return (
    <Navigate
      to={
        location.pathname.startsWith("/auth/client") ? "/auth/client" : "/auth"
      }
    />
  );
};

export default PrivateRoute;
