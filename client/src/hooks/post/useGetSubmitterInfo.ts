import { useQuery } from "react-query";
import axios from "axios";
import { getSubmitterInfoUrl } from "@/assets/api";
import { useAuth } from "@/contexts/AuthContext";

const useGetSubmitterInfo = (userId: string, postId: string) => {
  const {token} = useAuth()

  return useQuery(`submitterInfo${userId}${postId}`, async () => {
    const { data } = await axios.post(getSubmitterInfoUrl, {
      userId,
      postId,
      token
    });
    return data;
  });
};

export default useGetSubmitterInfo;
