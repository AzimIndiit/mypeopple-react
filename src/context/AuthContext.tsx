import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

// type LoginType = {
//   name?:string,
//   email: string;
//   password: string;
//   remember_me?: boolean;
// };

// Define the shape of the context
interface AuthContextType {
  user: any | null;
  login: (data: any) => void;
  logout: () => void;
  updateUser: (data: any) => void;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const randomAlphaNumeric = (length: number): string => {
  let s = "";
  while (s.length < length) {
    s += Math.random().toString(36).substring(2);
  }
  return s.slice(0, length);
};

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const storedInfo = localStorage.getItem("user");
  const parsedInfo = storedInfo ? JSON.parse(storedInfo) : null;

  const [user, setUser] = useState<any | null>(parsedInfo || null);
  const login = (data: any) => {
    const t = randomAlphaNumeric(50);
    setTimeout(() => {
      const obj = { ...data, token: t };
      setUser(obj);
      localStorage.setItem("user", JSON.stringify(obj));
      navigate("/");
    }, 1000);
  };

  const logout = () => {
    let nav = user.role === "lead" ? "/auth" : "/auth/client";
    setUser(null);
    localStorage.removeItem("user");
    localStorage.clear();
    console.log("nav,user", nav, user);
    navigate(nav);
  };

  useEffect(() => {
    const storedInfo = localStorage.getItem("user");
    if (storedInfo) {
      const parsed = JSON.parse(storedInfo);
      setUser(parsed);
    }
  }, []);

  const updateUser = (data: any) => {
    console.log("data", data);

    setUser((prev: any) => {
      console.log("prev", prev);
      const updatedUser = { ...prev, ...data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
