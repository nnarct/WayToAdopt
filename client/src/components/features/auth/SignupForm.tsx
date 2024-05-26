import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import PhoneInput from "antd-phone-input";
import {
  Button,
  Card,
  DatePicker,
  Flex,
  Input,
  Typography,
  Form,
  Image,
  FormInstance,
  Select,
} from "antd";
import logo from "@/assets/images/logo_white.svg";

const validateMessages = {
  required: "กรุณากรอก${label}",
  types: {
    email: "ที่อยู่อีเมลไม่ถูกต้อง",
    number: "ตัวเลขไม่ถูกต้อง",
  },
};
const SignupForm = ({
  onFinish,
  form,
  loading,
}: {
  form: FormInstance;
  onFinish: (values) => void;
  loading?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        vertical
        align="center"
        className="bg-gradient-to-r to-secondary from-sky-300 w-screen h-screen text-white lg:justify-center overflow-auto pb-1 px-6 "
      >
        <Image
          onClick={() => {
            navigate("/");
          }}
          src={logo}
          style={{ maxWidth: 500 }}
          className="mt-10 sm:mt-20 md:mt-24 lg:mt-26"
          preview={false}
        />
        <Typography.Title level={3} style={{ color: "#fff" }}>
          ลงทะเบียน
        </Typography.Title>
        <div className="pb-7 w-full flex flex-col items-center justify-center">
          <Card className="rounded-3xl p-6 pb-0 w-full max-w-[900px]">
            <Form
              onFinish={onFinish}
              form={form}
              validateMessages={validateMessages}
              layout="vertical"
              autoComplete="off"
            >
              <Flex gap={24} wrap="wrap">
                <Form.Item
                  className="flex-1"
                  name={"firstName"}
                  label="ชื่อจริง (ไม่ต้องมีคำนำหน้า)"
                  rules={[{ required: true, message: "กรุณากรอกชื่อจริง" }]}
                >
                  <Input placeholder="First name" />
                </Form.Item>
                <Form.Item
                  className="flex-1"
                  name={"lastName"}
                  label="นามสกุล"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Last name" />
                </Form.Item>
              </Flex>
              <Flex gap={24}>
                <Form.Item
                  style={{ flex: 1, width: "50%" }}
                  label="วันเกิด"
                  name={"dob"}
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    popupClassName="w-56"
                    maxDate={dayjs()}
                    minDate={dayjs().subtract(150, "year")}
                    format="DD MMM YYYY"
                    placeholder="DD MMM YYYY"
                  />
                </Form.Item>
                <Form.Item
                  name={"gender"}
                  label="เพศ"
                  style={{ flex: 1, width: "50%" }}
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Gender" allowClear>
                    <Select.Option value={0}>ชาย</Select.Option>
                    <Select.Option value={1}>หญิง</Select.Option>
                    <Select.Option value={2}>อื่นๆ</Select.Option>
                  </Select>
                </Form.Item>
              </Flex>
              <Form.Item
                name={"tel"}
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <PhoneInput
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
              <Form.Item
                name={"email"}
                label="อีเมล"
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="example@mail.com" />
              </Form.Item>
              <Form.Item
                name={"password"}
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters!",
                  },
                  {
                    pattern: /.*[A-Z].*/,
                    message: "Password must have at least one uppercase letter",
                  },
                  {
                    pattern: /.*\d.*/,
                    message: "Password must have at least one number",
                  },
                  {
                    pattern: /.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*/,
                    message:
                      "Password must have at least one special character",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue(["password"]) === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                  ลงทะเบียน
                </Button>
              </Form.Item>
            </Form>
            <Flex align="center" justify="center">
              <Typography.Text
                style={{
                  fontSize: 18,
                  paddingRight: 12,
                  fontWeight: 500,
                }}
              >
                หากมีบัญชีผู้ใช้งานแล้วโปรด
              </Typography.Text>
              <Typography.Link
                onClick={() => navigate("/login")}
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                }}
              >
                เข้าสู่ระบบ
              </Typography.Link>
            </Flex>
          </Card>
        </div>
      </Flex>
    </>
  );
};

export default SignupForm;
