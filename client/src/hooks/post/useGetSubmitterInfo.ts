import { useQuery } from "react-query";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { getSubmitterInfoUrl } from "@/assets/api";

const useGetSubmitterInfo = (userId: string, postId: string) => {
  const { token } = useAuth();
  return useQuery(`submitterInfo${userId}`, async () => {
    const { data } = await axios.post(getSubmitterInfoUrl, {
      token,
      userId,
      postId,
    });
    return data;
  });
};

export default useGetSubmitterInfo;
