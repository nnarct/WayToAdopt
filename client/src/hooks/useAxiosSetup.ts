import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

const useAxiosSetup = () => {
  const { token } = useAuth();
  axios.defaults.baseURL = "http://localhost:3001";

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // console.error("Request error:", error);
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);
};

export default useAxiosSetup;
