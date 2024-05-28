import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { notification } from "antd";

const deletePost = async (postID: string) => {
  await axios.delete(`/post`, { data: { id: postID } });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("myPosts");
      notification.success({ message: "Delete post successfully" });
    },
    onError: () => {
      notification.error({ message: "Delete post failed. Contact Admin" });
    },
  });
};

export default useDeletePost;
