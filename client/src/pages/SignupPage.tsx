import Axios from "axios";
import dayjs from "dayjs";
import PhoneInput from "antd-phone-input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  DatePicker,
  Flex,
  Form,
  Image,
  Input,
  Select,
  Typography,
} from "antd";

import logo from "@/assets/images/logo_white.svg";

import { useAuth } from "@/contexts/AuthContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [SignupPageForm] = Form.useForm();

  const validateMessages = {
    required: "กรุณากรอก${label}",
    types: {
      email: "ที่อยู่อีเมลไม่ถูกต้อง",
      number: "ตัวเลขไม่ถูกต้อง",
    },
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const now = dayjs();
  const date150yearAgo = now.subtract(150, "year");

  const [alert, setAlert] = useState({ status: false, message: "" });
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  const onFinish = async () => {
    setAuth("ignin", "tesst");
  };
  // const onFinish = async (values) => {
  //   setLoading(true);
  //   try {
  //     const checkEmailResponse = await Axios.post(
  //       "https://waytoadoptood.web.app//check-email",
  //       {
  //         userEmail: values.userEmail,
  //       }
  //     );
  //     if (!checkEmailResponse.data.success) {
  //       SignupPageForm.setFields([
  //         {
  //           name: "userEmail",
  //           errors: [
  //             "This email has been SignupPageed. Please use different email.",
  //           ],
  //         },
  //       ]);
  //       return;
  //     }
  //   } catch (error) {
  //     setAlert({
  //       status: true,
  //       message: "Unknown error during verifying email. Please contact admin",
  //     });
  //   }

  //   const submittedData = {
  //     userFirstName: values.userFirstName,
  //     userLastName: values.userLastName,
  //     userDOB: values.userDOB,
  //     userGender: values.userGender,
  //     userPhone: `0${values.userPhone.areaCode}${values.userPhone.phoneNumber}`,
  //     userEmail: values.userEmail,
  //     userPassword: values.userPassword,
  //     confirmPassword: values.confirmPassword,
  //   };

  //   try {
  //     const response = await Axios.post(
  //       "https://waytoadoptood.web.app//SignupPage",
  //       submittedData
  //     );
  //     if (response.data.success) {
  //       setLoading(false);
  //       navigate(`/Login`, { state: "1" });
  //     } else {
  //       setAlert({
  //         status: true,
  //         message: "Unknown error during posting data. Please contact admin.",
  //       });
  //     }
  //   } catch (error) {
  //     setAlert({
  //       status: true,
  //       message: "Unknown error during registration. Please contact admin.",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
          {alert.status && (
            <Alert
              message={alert.message}
              type="error"
              showIcon
              style={{ width: "100%", marginBottom: 16, maxWidth: 900 }}
            />
          )}
          <Card className="rounded-3xl p-6 pb-0 w-full max-w-[900px]">
            <Form
              onChange={() => setAlert({ status: false, message: "" })}
              onFinish={onFinish}
              form={SignupPageForm}
              validateMessages={validateMessages}
              layout="vertical"
              autoComplete="off"
            >
              <Flex gap={24} wrap="wrap">
                <Form.Item
                  className="flex-1"
                  name={"userFirstName"}
                  label="ชื่อจริง (ไม่ต้องมีคำนำหน้า)"
                  rules={[{ required: true, message: "กรุณากรอกชื่อจริง" }]}
                >
                  <Input placeholder="First name" />
                </Form.Item>
                <Form.Item
                  className="flex-1"
                  name={"userLastName"}
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
                  name={"userDOB"}
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    popupClassName="w-56"
                    maxDate={now}
                    minDate={date150yearAgo}
                    format="DD MMM YYYY"
                    placeholder="DD MMM YYYY"
                  />
                </Form.Item>
                <Form.Item
                  name={"userGender"}
                  label="เพศ"
                  style={{ flex: 1, width: "50%" }}
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Gender"
                    // onChange={}
                    allowClear
                  >
                    <Select.Option value="M">male</Select.Option>
                    <Select.Option value="F">female</Select.Option>
                  </Select>
                </Form.Item>
              </Flex>
              <Form.Item
                name={"userPhone"}
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
                name={"userEmail"}
                label="อีเมล"
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="example@mail.com" />
              </Form.Item>
              <Form.Item
                name={"userPassword"}
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
                      if (!value || getFieldValue(["userPassword"]) === value) {
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

export default SignupPage;
