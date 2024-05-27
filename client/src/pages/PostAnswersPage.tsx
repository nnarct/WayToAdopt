import { Flex, Typography } from "antd";
import { useParams } from "react-router-dom";
import AnswerCollapse from "@/components/features/myPosts/AnswerCollapse";
import { Loading, SomethingWentWrong } from "@/components/shared/Result";
import { useGetAnswersUserId } from "@/hooks/post/useGetAllAnswer";

const PostAnswersPage = () => {
  const { postID } = useParams();

  if (!postID) {
    return <SomethingWentWrong />;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading, isError } = useGetAnswersUserId(postID);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <SomethingWentWrong />;
  }
  return (
    <div className="relative min-h-screen flex flex-col justify-between pb-8">
      <div>
        <Typography.Title level={2}>การตอบกลับ</Typography.Title>
        <Flex vertical className="gap-3">
          {data.map((id: string) => (
            <AnswerCollapse key={id} postId={postID} userId={id} />
          ))}
        </Flex>
      </div>
    </div>
  );
};

export default PostAnswersPage;
