import axios from "axios";
import { useQuery } from "react-query";

const fetchPosts = async () => {
  const response = await axios.get("/posts");
  return response.data.posts;
};

const usePosts = () => {
  return useQuery("posts", fetchPosts);
};

export default usePosts;
