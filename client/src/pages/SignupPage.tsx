import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "antd";
import { useAuth } from "@/contexts/AuthContext";
import SignupForm from "@/components/features/auth/SignupForm";
import useSignup from "@/hooks/useSignup";
import { SignupFormType } from "@/assets/types";

const SignupPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const { mutate, isLoading } = useSignup();

  const onFinish = async (values: SignupFormType) => {
    values.dob = values.dob.valueOf() / 1000;
    values.tel = `0${values.tel.areaCode}${values.tel.phoneNumber}`;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...data } = values;
    mutate(data);
  };

  return <SignupForm form={form} onFinish={onFinish} loading={isLoading} />;
};

export default SignupPage;
