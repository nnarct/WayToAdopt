import { notification } from "antd";
import { signupUrl } from "@/assets/api";
import axios from "axios";
import { UseMutateFunction, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
interface User {
  firstName: string;
}
async function signUp(email: string, password: string): Promise<User> {
  try {
    const response = await axios.post(signupUrl, { email, password });

    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("Incorrect email or password.");
    }
    throw new Error("Login failed.");
  }
}

type IUseSignUp = UseMutateFunction<
  User,
  unknown,
  {
    email: string;
    password: string;
  },
  unknown
>;

export const useSignUp = (): IUseSignUp => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signUpMutation } = useMutation<
    User,
    unknown,
    { email: string; password: string },
    unknown
  >(({ email, password }) => signUp(email, password), {
    onSuccess: (data) => {
      navigate("/login");
    },
    onError: (error) => {
      notification.error({
        message: error.message,
        placement: "bottom",
      });
    },
  });

  return signUpMutation;
};
