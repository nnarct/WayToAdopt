import axios from "axios";
import { useQuery } from "react-query";
import { useAuth } from "@/contexts/AuthContext";
import { getPostQuestions } from "@/assets/api";

const useGetQuestions = (postID: string) => {
  const { token } = useAuth(); // Assuming useAuth is a hook that returns the authentication token
  return useQuery(`postQuestions${postID}`, async () => {
    const { data } = await axios.post(getPostQuestions, { postID, token });
    return data;
  });
};

export default useGetQuestions;
