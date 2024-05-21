import { AuthContextType } from "@/assets/types";
import React, { createContext, useState, useEffect, ReactNode } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [expires, setExpires] = useState<string | null>(
    localStorage.getItem("expires")
  );

  const setAuth = (token: string, expires: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("expires", expires);
    setToken(token);
    setExpires(expires);
  };

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
    setToken(null);
    setExpires(null);
  };

  useEffect(() => {
    const storedExpires = localStorage.getItem("expires");
    if (storedExpires && Number(storedExpires) > new Date().valueOf()) {
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
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
