import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { notification } from "antd";

const changePostStatus = async (postID: string, status: 0 | 1) => {
  await axios.put(`/post`, { id: postID, status });
};

export const useClosePost = () => {
  const queryClient = useQueryClient();

  return useMutation((data: string) => changePostStatus(data, 1), {
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

export const useOpenPost = () => {
  const queryClient = useQueryClient();

  return useMutation((data: string) => changePostStatus(data, 0), {
    onSuccess: () => {
      queryClient.invalidateQueries("myPosts");
      notification.success({ message: "Open post successfully" });
    },
    onError: (error) => {
      console.log({ error });
      notification.error({ message: "Open post failed. Contact Admin" });
    },
  });
};
