import { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = async () => {
    setIsLoading(true);
    try {
      const isLoggedIn = await AuthService.login(email, password);
      if (isLoggedIn) {
        console.log("Login successful");
    
        // Redirect or perform further actions upon successful login
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred during login");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const isLoggedOut = await AuthService.logout();
      console.log(isLoggedOut)
      if (isLoggedOut) {
        console.log("Logout successful");
    
        // Redirect or perform further actions upon successful login
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred during login");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (AuthService.isAuthenticated()) navigate("/");
  }, [navigate, isLoading]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    login,
    logout
  };
};

export default useLogin;
