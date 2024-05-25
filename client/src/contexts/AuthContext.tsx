import { AuthContextType } from "@/assets/types";
import React, { createContext, useState, useEffect, ReactNode } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [expires, setExpires] = useState<string | null>(
    localStorage.getItem("expires")
  );
  const [uid, setUid] = useState<string | null>(localStorage.getItem("uid"));
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  const setAuth = (
    uid: string,
    token: string,
    accessToken: string,
    expires: string
  ) => {
    clearAuth();
    // localStorage.setItem("token");
    localStorage.setItem("expires", expires);
    localStorage.setItem("uid", uid);
    localStorage.setItem("token", token);
    localStorage.setItem("accessToken", accessToken);
    // setToken(token);
    setExpires(expires);
    setUid(uid);
    setToken(token);
    setAccessToken(accessToken);
  };

  const clearAuth = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("expires");
    localStorage.removeItem("expires");
    localStorage.removeItem("uid");
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    setExpires(null);
    setUid(null);
    setToken(null);
    setAccessToken(null);
  };

  useEffect(() => {
    const storedExpires = localStorage.getItem("expires");
    const storedUid = localStorage.getItem("uid");
    const storedToken = localStorage.getItem("token");
    const storedAccessToken = localStorage.getItem("accessToken");

    if (
      !storedExpires ||
      !storedUid ||
      !storedToken ||
      !storedAccessToken ||
      Number(storedExpires) <= new Date().valueOf()
    ) {
      clearAuth();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ uid, token, accessToken, expires, setAuth, clearAuth }}
    >
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
