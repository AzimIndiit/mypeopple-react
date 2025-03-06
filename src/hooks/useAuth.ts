import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check auth status from localStorage or API
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  return { isAuthenticated };
};