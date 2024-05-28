import axios from "axios";
import { useQuery } from "react-query";
import { useAuth } from "@/contexts/AuthContext";
import { getPostDetailsUrl } from "@/assets/api";

const useGetPostDetail = (postID: string) => {
  const { token } = useAuth(); // Assuming useAuth is a hook that returns the authentication token
  return useQuery(`postDetails${postID}`, async () => {
    const { data } = await axios.post(getPostDetailsUrl, { postID , token });
    return data;
  });
};

export default useGetPostDetail;
