import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { sendAnswerUrl } from "@/assets/api";
import { useAuth } from "@/contexts/AuthContext";
import { AnswersType } from "@/assets/types";

const sendAnswer = async ({
  postId,
  answers,
  token,
}: {
  postId: string;
  answers: AnswersType[];
  token: string | null;
}) => {
  try {
    const response = await axios.post(sendAnswerUrl, {
      postId,
      answers,
      token,
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    return { data: { message: "useSendAnswer failed" }, status: 500 };
  }
};

const useSendAnswer = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  return useMutation(
    (data: { postId: string; answers: AnswersType[] }) =>
      sendAnswer({ ...data, token }),
    {
      onSuccess: (res) => {
        if (res.status === 201) {
          // notification.success({ message: "Answer submitted successfully!" });
          navigate("/submitSuccess");
        } else {
          notification.error({ message: res.data.message });
        }
      },
      onError: (error) => {
        notification.error({
          message: `useSendAnswer failed: ${error.message}`,
        });
      },
    }
  );
};

export default useSendAnswer;
