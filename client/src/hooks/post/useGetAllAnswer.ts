import { useQuery } from "react-query";
import axios from "axios";
import { getAllAnswerUrl, getAnswersUserId } from "@/assets/api";
import { useAuth } from "@/contexts/AuthContext";

const useGetAnswer = (postId: string, userId: string) => {
  const { token } = useAuth();
  return useQuery(`getAnswers${userId}`, async () => {
    const { data } = await axios.post(getAllAnswerUrl, {
      postId,
      token,
      userId,
    });
    return data;
  });
};
export const useGetAnswersUserId = (postId: string) => {
  const { token } = useAuth();
  return useQuery(`answerUserId${postId}`, async () => {
    const { data } = await axios.post(getAnswersUserId, { postId, token });
    return data;
  });
};

export default useGetAnswer;
