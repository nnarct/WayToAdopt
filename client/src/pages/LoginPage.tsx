import { Navigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useLogin } from "@/hooks/useLogin";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/features/auth/LoginForm";

const LoginPage = () => {

  const [form] = useForm();
  const { token } = useAuth();
  const { login, isLoading, isError, error } = useLogin();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <LoginForm
      form={form}
      loading={isLoading}
      isError={isError}
      error={error}
      onFinish={login}
    />
  );
};

export default LoginPage;
