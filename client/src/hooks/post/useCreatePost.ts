import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { createPostUrl } from "@/assets/api";
import { useAuth } from "@/contexts/AuthContext";

const createPost = async ({
  file,
  post,
  token,
}: {
  file: File;
  post: any;
  token: string | null;
}) => {
  if (!token) return { data: { message: "You are unauthorized" }, status: 401 };
  const formData = new FormData();
  formData.append("file", file);
  formData.append("post", JSON.stringify(post));
  formData.append("token", token);
  try {
    const response = await axios.post(createPostUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    return {
      data: { message: "Create Post failed: Axios Error" },
      status: 500,
    };
  }
};

const useCreatePost = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  return useMutation(
    (data: { file: File; post: any }) => createPost({ ...data, token }),
    {
      onSuccess: (res) => {
        if (res.status === 200)
          return notification.error({ message: res.data.message });
        if (res.status === 500)
          return notification.error({ message: res.data.message });
        if (res.status === 201) {
          notification.success({
            message: `Create Post successfully ! : ${res.data}`,
          });
          navigate("/submitSuccess",{ state: { message: 'สร้างประกาศใหม่' ,postId: res.data} });
        }
      },
      onError: (error) => {
        notification.error({ message: `Create Post failed: ${error}` });
      },
    }
  );
};

export default useCreatePost;
