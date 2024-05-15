import PostAnswerList from "@/components/PostAnswerList";
import React from "react";

type Props = {};

const PostAnswersPage = (props: Props) => {
  //  mock data of users

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
  return (
    <div>
      PostAnswersPage
      {users.map((user, index) => (
        <PostAnswerList user={user} />
      ))}
    </div>
  );
};

export default PostAnswersPage;
