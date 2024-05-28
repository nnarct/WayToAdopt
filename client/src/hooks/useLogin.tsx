import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { LoginCredentialsType } from "@/assets/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebaseConfig";
import { useAuth } from "@/contexts/AuthContext";
import dayjs from "dayjs";
// Function to handle login API call
const login = async (data: LoginCredentialsType) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredential.user;
    const idTokenResult = await user.getIdTokenResult(); // Get the ID token result
    const token = idTokenResult.token;
    const expirationTime = dayjs(idTokenResult.expirationTime).valueOf();
    return {
      data: { message: "Login successfully" },
      status: 201,
      token,
      expirationTime,
    };
  } catch (error) {
    const errorCode = error.code;
    if (errorCode && errorCode === "auth/invalid-credential") {
      return { data: { message: "Incorrect email or password" }, status: 200 };
    }
    if (errorCode && errorCode === "auth/too-many-requests") {
      return {
        data: { message: "Too many request, try again later" },
        status: 200,
      };
    }
    return { data: { message: "Something went wrong" }, status: 500 };
  }
};

const useLogin = () => {
  const navigator = useNavigate();
  const { setAuth } = useAuth();
  return useMutation(login, {
    onSuccess: (res) => {
      if (res.status === 200)
        return notification.error({ message: res.data.message });
      if (res.status === 500)
        return notification.error({ message: res.data.message });
      if (!(res.status === 201 && res.token)) {
        return;
      }
      setAuth(res.token, res.expirationTime.toString());
      notification.success({ message: "Login successfully !" });
      navigator("/");
    },
    onError: (error) => {
      notification.error({ message: `Login failed: ${error}` });
    },
  });
};
export default useLogin;
