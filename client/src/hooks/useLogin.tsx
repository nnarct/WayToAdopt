import axios from "axios";
import { LoginCredentialsType } from "@/assets/types";
import { useAuth } from "@/contexts/AuthContext";
import { notification } from "antd";
import { loginUrl } from "@/assets/api";
import { UseMutateFunction, useMutation, useQueryClient } from "react-query";

interface User {
  name: string;
}

// Function to handle login API call
async function login(
  email: string,
  password: string
): Promise<{ token: string; expires: string }> {
  try {
    const response = await axios.post(loginUrl, { email, password });

    // return response.json();
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("Incorrect email or password.");
    }
    throw new Error("Login failed.");
  }
}

type IUseSignIn = {
  login: UseMutateFunction<
    LoginCredentialsType,
    { message: string },
    LoginCredentialsType
  >;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
};

export function useLogin(): IUseSignIn {
  const queryClient = useQueryClient();
  const { setAuth } = useAuth();

  const {
    mutate: loginMutation,
    isLoading,
    isError,
    error,
  } = useMutation<
    LoginCredentialsType,
    { message: string },
    { email: string; password: string }
  >(({ email, password }) => login(email, password), {
    onSuccess: (data) => {
      // Save the user in the state
      setAuth(data.token, data.expires);
      // Invalidate and refetch queries that could be affected by the login
      queryClient.invalidateQueries("user");
    },
    onError: (error) => {
      notification.error({
        message: error.message,
        placement: "bottom",
      });
    },
  });

  return {
    login: loginMutation,
    isLoading,
    isError,
    error,
  };
}
