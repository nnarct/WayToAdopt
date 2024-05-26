// src/hooks/usePosts.ts
import { useQuery } from "react-query";
import axios from "axios";
import { getAllPostUrl } from "@/assets/api";
import { PostCard } from "@/assets/types";

const fetchPosts = async (): Promise<PostCard[]> => {
  return axios.get(getAllPostUrl).then((response) => {
    return response.data.data;
  });
};

const useGetAllPosts = () => {
  return useQuery("posts", fetchPosts);
};

export default useGetAllPosts;
