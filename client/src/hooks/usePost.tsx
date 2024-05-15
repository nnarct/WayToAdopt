import { useEffect, useState } from "react";
import { PostDetailsType } from "@/assets/types";
import PostService from "@/services/PostService";

export function useGetPostDetails(postId: string) {
  const [post, setPost] = useState<PostDetailsType[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPostDetails = async () => {
    setLoading(true);
    try {
      const post = await PostService.getPostDetails(postId);
      if (!post) {
        setError(true);
      }
      setPost([]);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [postId]);

  return { post, error, loading };
}

export function usePostAdoptionForm() {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const post = async (values: any, postID: string, userID: string) => {
    setError("error ka")
    return
    setLoading(true);
    try {
      await PostService.postAdoptionForm(values, postID, userID);
      setSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return { success, error, loading, post };
}
