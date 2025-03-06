import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"; // Custom hook for authentication

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth(); // Check if user is logged in

  return !isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;