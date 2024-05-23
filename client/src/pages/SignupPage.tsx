import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import SignupForm from "@/components/features/auth/RegisterForm";
import { Form } from "antd";

const SignupPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

 
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
      <SignupForm form={form} onFinish={() => {}} />
    </>
  );
};

export default SignupPage;
