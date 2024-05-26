import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { AuthContextType } from "@/assets/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [expires, setExpires] = useState<string | null>(
    localStorage.getItem("expires")
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const setAuth = (token: string, expires: string) => {
    clearAuth();
    localStorage.setItem("expires", expires);
    localStorage.setItem("token", token);
    setExpires(expires);
    setToken(token);
  };

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
    setExpires(null);
    setToken(null);
  };

  useEffect(() => {
    const storedExpires = localStorage.getItem("expires");
    const storedToken = localStorage.getItem("token");

    if (
      !storedExpires ||
      !storedToken ||
      Number(storedExpires) <= new Date().valueOf()
    ) {
      clearAuth();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, expires, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
