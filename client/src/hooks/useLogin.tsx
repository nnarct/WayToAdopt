import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { LoginCredentialsType } from "@/assets/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebaseConfig";
import { useAuth } from "@/contexts/AuthContext";
// Function to handle login API call
const login = async (data: LoginCredentialsType) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredential.user;
    // console.log("User signed in:", user);
    return { data: { message: "Login usccessfully" }, status: 201, user };
  } catch (error) {
    const errorCode = error.code;
    // console.log({ error });
    if (errorCode && errorCode === "auth/invalid-credential") {
      return { data: { message: "Incorrect email or password" }, status: 200 };
    }
    if (errorCode && errorCode === "auth/too-many-requests") {
      return {
        data: { message: "Too many request, tru again later" },
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
      if (!(res.status === 201 && res.user)) {
        return;
      }
      const u = res.user;
      setAuth(
        u.uid,
        u.stsTokenManager.refreshToken,
        u.stsTokenManager.accessToken,
        u.stsTokenManager.expirationTime
      );
      notification.success({ message: "Login successfully !" });
      navigator("/");
    },
    onError: (error) => {
      // console.log("onError");
      notification.error({ message: `Login failed: ${error}` });
    },
  });
};
export default useLogin;
