import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { signupUrl } from "@/assets/api";
import { SignupType } from "@/assets/types";

const registerUser = async (userData: SignupType) => {
  try {
    const response = await axios.post(signupUrl, userData);
    return { data: response.data, status: response.status };
  } catch (error) {
    if (
      error.response?.data &&
      error.response?.data === "The email address is improperly formatted."
    )
      return { data: { message: "Invalid email format" }, status: 500 };

    return { data: { message: "Registration failed" }, status: 500 };
  }
};

const useSignup = () => {
  const navigator = useNavigate();
  return useMutation(registerUser, {
    onSuccess: (res) => {
      if (res.status === 200)
        return notification.error({ message: res.data.message });
      if (res.status === 500)
        return notification.error({ message: res.data.message });
      if (res.status === 201) {
        notification.success({ message: "Sign up successfully !" });
        navigator("/login");
      }
    },
    onError: (error) => {
      notification.error({ message: `Registration failed: ${error}` });
    },
  });
};

export default useSignup;
