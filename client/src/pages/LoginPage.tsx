import {
  Form,
  Button,
  Input,
  Flex,
  Typography,
  Card,
  Image,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import useAuth from "@/hooks/useAuth";
import logo from "@/assets/images/logo_white.svg";
import ErrorAlert from "@/components/shared/ErrorAlert";

type FieldType = {
  email?: string;
  password?: string;
};

const LoginPage = () => {
  const { login, errorLogin, isLoggingIn } = useAuth();
  const [form] = Form.useForm<FieldType>();

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
        <Form<FieldType>
          form={form}
          onFinish={() =>
            login(form.getFieldValue("email"), form.getFieldValue("password"))
          }
          layout="vertical"
        >
          <Form.Item
            validateTrigger={"onSubmit"}
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: `Please include an '@' in the email address. ${form.getFieldValue(
                  "email"
                )} missing an '@'.`,
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
              Login
            </Button>
          </Form.Item>
          <ErrorAlert text={errorLogin}/>
        </Form>
      </Card>
    </Flex>
  );
};

export default LoginPage;
