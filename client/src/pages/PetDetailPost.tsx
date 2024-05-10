import React, { useState } from "react";
import AdoptionForm from "@/components/AdoptionForm";
import PostDetail from "@/components/PostDetail";
import { Button, Flex } from "antd";
import { Navigate, useParams } from "react-router-dom";

const PetDetailPost: React.FC = () => {
  const [isOpenQuestion, setIsOpenQuestion] = useState<boolean>(false);
  const { postId } = useParams<{ postId: string }>();

  if (postId === undefined) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div>
        <PostDetail postId={Number(postId)} />
      </div>
      {isOpenQuestion && <AdoptionForm />}
      <Flex justify="end">
        <Button>Return</Button>
        {!isOpenQuestion && (
          <Button type="primary" onClick={() => setIsOpenQuestion(true)}>
            รับเลี้ยงเลย
          </Button>
        )}
        {isOpenQuestion && <Button type="primary">ส่งคำตอบ</Button>}
      </Flex>
    </>
  );
};

export default PetDetailPost;
