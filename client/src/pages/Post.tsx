import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Flex, Typography } from "antd";
import useGetQuestions from "@/hooks/post/useGetQuestions";
import PostDetail from "@/components/PostDetail";
import BackButton from "@/components/shared/BackButton";
import { Loading, SomethingWentWrong } from "@/components/shared/Result";

const Post = () => {
  const { postID } = useParams();
  const navigate = useNavigate();
  const [isQuestion, setIsQuestion] = useState<boolean>(false);
  if (!postID) {
    return <SomethingWentWrong />;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: questions, isLoading } = useGetQuestions(postID);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Typography.Title level={2}>รายละเอียดโพสต์</Typography.Title>
      <PostDetail postID={postID} />
      <div className="sm:grid grid-cols-3 gap-4 mt-4">
        {isQuestion && (
          <Card className="sm:col-span-2 sm:!col-end-4">
            <Typography.Title level={3}>คำถาม</Typography.Title>
            {questions.map((q: { question: string }, i: number) => (
              <Typography.Paragraph>
                {i + 1}. {q.question}
              </Typography.Paragraph>
            ))}
          </Card>
        )}
        <Flex className="sm:col-span-2 sm:!col-end-4 justify-between sm:justify-end gap-4 pb-4">
          <BackButton />
          <Button onClick={() => navigate("answerslist")}>
            ดูคำตอบที่ถูกส่งเข้ามา
          </Button>
          <Button type="primary" onClick={() => setIsQuestion(!isQuestion)}>
            {isQuestion ? "ปิดคำถาม" : "ดูคำถาม"}
          </Button>
        </Flex>
      </div>
    </>
  );
};

export default Post;
