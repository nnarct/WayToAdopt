// /pages/PostAnswersPage.tsx
import PostListItem from "@/components/PostListItem";
import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const PostAnswersPage: React.FC<Props> = (props: Props) => {
  // Mock data of users
  const users = [
    {
      id: "1",
      firstName: "Tom",
      lastName: "Jerry",
      createdAt: 1715770970,
    },
    {
      id: "2",
      firstName: "Doraemon",
      lastName: "Nobita",
      createdAt: 1715770970,
    },
    {
      id: "3",
      firstName: "Rimuru",
      lastName: "Tempest",
      createdAt: 1715770970,
    },
  ];

  // Mock data of postIDs
  const postIDs = ["1"]; // Array of postIDs

  return (
    <div className="relative min-h-screen flex flex-col justify-between pb-8">
      <div>
        <h1>Post Answers Page</h1>
        {postIDs.map((post) => (
          <PostListItem key={post} postID={post} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Link to="/create-ad">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create a new ad
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PostAnswersPage;
