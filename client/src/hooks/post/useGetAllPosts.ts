import axios from "axios";
import { useQuery } from "react-query";

const fetchPosts = async () => {
  try {
    const response = await axios.get("/posts");
    return response.data.posts;
  } catch (error) {
    console.log({ error });
  }
};

const usePosts = () => {
  return useQuery("posts", fetchPosts);
};

export default usePosts;
