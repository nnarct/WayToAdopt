import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PostIDforDetailTest = () => {
  const { postID } = useParams<{ postID: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (postID) {
      // Navigate to the /petdetails URL without postID in the URL
      navigate("/petdetails", { state: { postID: Number(postID) } });
    }
  }, [postID, navigate]);

  return null; // ไม่ต้องแสดงอะไรตรงนี้
};

export default PostIDforDetailTest;
