import { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());
  const [errorLogin, setErrorLogin] = useState< string>("");
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [errorLogout, setErrorLogout] = useState< string>("");
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setIsLoggingIn(true);
    setErrorLogin("");
    try {
      // const isLoggedIn = await AuthService.login(email, password);
      // if (isLoggedIn) {
      if (true) {
        console.log("Login successful");
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setErrorLogin("Invalid email or password");
        return false;
      }
    } catch (error) {
      setErrorLogin("An error occurred during login");
      console.error(error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    setIsLoggingOut(true);
    setErrorLogout("");
    try {
      const isLoggedOut = await AuthService.logout();
      if (isLoggedOut) {
        console.log("Logout successful");
        setIsAuthenticated(false);
        navigate("/");
      } else {
        setErrorLogout("Failed to logout");
      }
    } catch (error) {
      setErrorLogout("An error occurred during logout");
      console.error(error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    isAuthenticated,
    errorLogin,
    isLoggingIn,
    isLoggingOut,
    errorLogout,
    login,
    logout,
  };
};

export default useAuth;
