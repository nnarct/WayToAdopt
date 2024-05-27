// /pages/PostAnswersPage.tsx
import PostList from "@/components/PostList";
import AnswerCollapse from "@/components/features/myPosts/AnswerCollapse";
import { Flex, Typography } from "antd";
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
  const postIDs = ["1", "3", "4"]; // Array of postIDs

  return (
    <div className="relative min-h-screen flex flex-col justify-between pb-8">
      <div>
        <Typography.Title level={2}>การตอบกลับ</Typography.Title>
        <Flex vertical className="gap-3">
          {postIDs.map((post) => (
            <AnswerCollapse key={post} />
          ))}
        </Flex>
      </div>
    </div>
  );
};

export default PostAnswersPage;
