import axios from "axios";
import { useQuery } from "react-query";
import { useAuth } from "@/contexts/AuthContext";
import { getPostDetailsUrl } from "@/assets/api";

const useGetPostDetail = (postID: string) => {
  return useQuery(`postDetails${postID}`, async () => {
    try {
      const { data } = await axios.post(getPostDetailsUrl, { postID });
      return data;
    } catch (error) {
      console.log({ error });
    }
  });
};

export default useGetPostDetail;
