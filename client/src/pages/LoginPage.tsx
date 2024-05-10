import useLogin from "@/hooks/useAuth";
import {
  Form,
  Button,
  Input,
  Alert,
  Flex,
  Typography,
  Card,
  Image,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import logo from "@/assets/images/logo_white.svg";
// import type { FormProps } from "antd";
// type FieldType = {
//   email?: string;
//   password?: string;
// };

const LoginPage = () => {
  const { email, setEmail, password, setPassword, error, isLoading, login } =
    useLogin();

  return (
    <Flex
      vertical
      align="center"
      className="bg-[#2e4b5d] w-screen h-screen text-white lg:justify-center overflow-auto pb-20 px-6 "
    >
      <Image
        src={logo}
        style={{ maxWidth: 510 }}
        className="mt-10 sm:mt-20 md:mt-24 lg:mt-0"
      />
      <Typography.Title level={3} style={{ color: "white" }}>
        เข้าสู่ระบบ
      </Typography.Title>
      <Card className="max-w-lg w-full">
        <Form onFinish={login} layout="vertical">
          <Form.Item
            validateTrigger={"onSubmit"}
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: `Please include an '@' in the email address. ${email} missing an '@'.`,
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
              value={email}
              placeholder="email@example.com"
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            {/* Disable the button if form is submitting */}
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Login
            </Button>
          </Form.Item>
          {error && <Alert type="error" message={error} />}
        </Form>
      </Card>
    </Flex>
  );
};

export default LoginPage;
