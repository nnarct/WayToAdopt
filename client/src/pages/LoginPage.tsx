import { Form, Button, Input, Flex, Typography, Card, Image } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import logo from "@/assets/images/logo_white.svg";
import ErrorAlert from "@/components/shared/ErrorAlert";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";

type FieldType = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { token, setAuth } = useAuth();
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const login = async (values: FieldType) => {
    setIsLoggingIn(true);
    setAuth(values.email, values.password);
    setIsLoggingIn(false);
    if (token) {
      navigate("/");
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);
  const [form] = Form.useForm<FieldType>();

  return (
    <Flex
      vertical
      align="center"
      className="bg-gradient-to-l to-secondary from-sky-200 w-screen h-screen text-white lg:justify-center overflow-auto pb-20 px-6 "
    >
      <Image
        onClick={() => {
          navigate("/");
        }}
        src={logo}
        style={{ maxWidth: 510 }}
        className="mt-10 sm:mt-20 md:mt-24 lg:mt-0"
        preview={false}
      />
      <Typography.Title level={3} style={{ color: "white" }}>
        เข้าสู่ระบบ
      </Typography.Title>
      <Card className="max-w-lg w-full">
        <Form form={form} onFinish={login} layout="vertical">
          <Form.Item
            validateTrigger={"onSubmit"}
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: `Please include an '@' in the email address.`,
              },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            {/* Use Input component from antd */}
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="email@example.com"
            />
          </Form.Item>
          <Form.Item
            validateTrigger={"onSubmit"}
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            {/* Use Input.Password component from antd for password */}
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="password"
            />
          </Form.Item>
          <Form.Item className="flex justify-center">
            {/* Disable the button if form is submitting */}
            <Button type="primary" htmlType="submit" loading={isLoggingIn}>
              เข้าสู่ระบบ
            </Button>
          </Form.Item>
          {/* <ErrorAlert text={errorLogin} /> */}
        </Form>
        <Flex align="center" justify="center">
          <Typography.Text
            style={{
              fontSize: 18,
              paddingRight: 12,
              fontWeight: 500,
            }}
          >
            หากยังไม่มีบัญชีผู้ใช้งานโปรด
          </Typography.Text>
          <Typography.Link
            onClick={() => navigate("/signup")}
            style={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            ลงทะเบียน
          </Typography.Link>
        </Flex>
      </Card>
    </Flex>
  );
};

export default LoginPage;
