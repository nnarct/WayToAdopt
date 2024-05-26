import { useQuery } from "react-query";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { getMyPostsUrl } from "@/assets/api";

const useGetMyPosts = () => {
  const { token } = useAuth(); // Assuming useAuth is a hook that returns the authentication token
  return useQuery("myPosts", async () => {
    const { data } = await axios.post(getMyPostsUrl, { token });
    return data.data;
  });
};

export default useGetMyPosts;
