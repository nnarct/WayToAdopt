import { useQuery } from "react-query";
import axios from "axios";
import { getSubmitterInfoUrl } from "@/assets/api";

const useGetSubmitterInfo = (userId: string, postId: string) => {
  return useQuery(`submitterInfo${userId}${postId}`, async () => {
    const { data } = await axios.post(getSubmitterInfoUrl, {
      userId,
      postId,
    });
    return data;
  });
};

export default useGetSubmitterInfo;
