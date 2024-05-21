import {
  Button,
  Image,
  Card,
  Flex,
  Form,
  Input,
  Typography,
  FormInstance,
} from "antd";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginCredentialsType } from "@/assets/types";
import logo from "@/assets/images/logo_white.svg";
import ErrorAlert from "@/components/shared/ErrorAlert";

const LoginForm = ({
  onFinish,
  form,
  loading,
  isError,
  error
}: {
  onFinish: (values: LoginCredentialsType) => void;
  form: FormInstance;
  isError: boolean;
  loading: boolean;
  error: string;
}) => {
  const navigate = useNavigate();
  return (
    <>
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
          <Form form={form} onFinish={onFinish} layout="vertical">
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
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              {/* Use Input.Password component from antd for password */}
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="password"
              />
            </Form.Item>
            <Form.Item className="flex justify-center">
              {/* Disable the button if form is submitting */}
              <Button type="primary" htmlType="submit" loading={loading}>
                เข้าสู่ระบบ
              </Button>
            </Form.Item>
            {isError && <ErrorAlert text={error} />}
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
    </>
  );
};

export default LoginForm;
