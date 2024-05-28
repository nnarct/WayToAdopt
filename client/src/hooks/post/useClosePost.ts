import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { notification } from "antd";

const closePost = async (postID: string) => {
  await axios.put(`/post`, { id: postID });
};

const useClosePost = () => {
  const queryClient = useQueryClient();

  return useMutation(closePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("myPosts");
      notification.success({ message: "Close post successfully" });
    },
    onError: (error) => {
      console.log({ error });
      notification.error({ message: "Close post failed. Contact Admin" });
    },
  });
};

export default useClosePost;
