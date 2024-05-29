import { useQuery } from "react-query";
import axios from "axios";
import { getMyPostsUrl } from "@/assets/api";
import { useAuth } from "@/contexts/AuthContext";


const useGetMyPosts = () => {
  const { token} = useAuth()
  const getPosts = async () => {
  const res = await axios.post(getMyPostsUrl, {token});
  return res.data.posts;
};
  return useQuery("myPosts", getPosts);
};

export default useGetMyPosts;
