import { Navigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import useLogin from "@/hooks/useLogin";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/features/auth/LoginForm";
import { LoginCredentialsType } from "@/assets/types";

const LoginPage = () => {
  const [form] = useForm();
  const { token } = useAuth();
  const { mutate, isLoading } = useLogin();
  if (token) {
    return <Navigate to="/" />;
  }

  const onFinish = async (values: LoginCredentialsType) => {
    mutate(values);
  };

  return <LoginForm form={form} loading={isLoading} onFinish={onFinish} />;
};

export default LoginPage;
