import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user?.token) {
    return <Outlet />;
  }

  return (
    <Navigate
      to={
        location.pathname.startsWith("/auth/client") ? "/auth/client" : "/auth"
      }
    />
  );
};

export default PrivateRoute;
