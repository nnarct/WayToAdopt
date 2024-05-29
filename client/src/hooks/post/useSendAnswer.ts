import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { sendAnswerUrl } from "@/assets/api";
import { AnswersType } from "@/assets/types";
import { useAuth } from "@/contexts/AuthContext";

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
    console.log({ error });
    return { data: { message: "useSendAnswer failed" }, status: 500 };
  }
};

const useSendAnswer = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  return useMutation(
    ({ postId, answers }: { postId: string; answers: AnswersType[] }) =>
      sendAnswer({ postId, answers, token }),
    {
      onSuccess: (res) => {
        if (res.status === 201) {
          navigate("/submitSuccess", {
            state: { message: "ส่งคำขอร้องรับเลี้ยงสัตว์" },
          });
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
