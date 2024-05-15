import PostListItem from "@/components/PostListItem";
import { useGetUserProfile } from "@/hooks/useUser";

import AuthService from "@/services/AuthService";
import { Button, List, Avatar } from "antd";
import React from "react";
import { Link, Navigate } from "react-router-dom";

const MyPosts = () => {
  // const { post, loading: loadingError, error: userError } = useGetpost();

  const posts = [{ id: "1" }, { id: "2" }, { id: "3" }];

  return (
    <>
      {/* guide */}
      Implement My Posts Here<br></br>
      {/* guide ends */}
      {posts.map((post, index) => (
        <PostListItem key={`postItem${index}`} postID={post.id} />
      ))}
    </>
  );
};

export default MyPosts;
