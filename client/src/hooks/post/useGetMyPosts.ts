import { useQuery } from "react-query";
import axios from "axios";
import { getMyPostsUrl } from "@/assets/api";

const getPosts = async () => {
  const res = await axios.get(getMyPostsUrl);
  return res.data.posts;
};
const useGetMyPosts = () => {
  return useQuery("myPosts", getPosts);
};

export default useGetMyPosts;
