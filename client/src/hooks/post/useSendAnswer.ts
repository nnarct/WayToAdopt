import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { sendAnswerUrl } from "@/assets/api";
import { AnswersType } from "@/assets/types";

const sendAnswer = async ({
  postId,
  answers,
}: {
  postId: string;
  answers: AnswersType[];
}) => {
  try {
    const response = await axios.post(sendAnswerUrl, {
      postId,
      answers,
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log({error})
    return { data: { message: "useSendAnswer failed" }, status: 500 };
  }
};

const useSendAnswer = () => {
  const navigate = useNavigate();
  return useMutation(sendAnswer, {
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
  });
};

export default useSendAnswer;
