import { useQuery } from "react-query";
import axios from "axios";
import { getAllAnswerUrl, getAnswersUserId } from "@/assets/api";

const useGetAnswer = (postId: string, userId: string) => {
  return useQuery(`getAnswers${userId}`, async () => {
    const { data } = await axios.post(getAllAnswerUrl, {
      postId,
      userId,
    });
    return data;
  });
};

export const useGetAnswersUserId = (postId: string) => {
  return useQuery(`answerUserId${postId}`, async () => {
    const { data } = await axios.post(getAnswersUserId, { postId });
    return data;
  });
};

export default useGetAnswer;
