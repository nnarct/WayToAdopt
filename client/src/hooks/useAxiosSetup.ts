import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';

const useAxiosSetup = () => {
  const { token } = useAuth();

  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:3001';

    const requestInterceptor = axios.interceptors.request.use(
      config => {
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);
};

export default useAxiosSetup;
