/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import { Card, Descriptions, Typography } from "antd";
import PostDetail from "@/components/PostDetail";
import DescriptionCard from "@/components/shared/DescriptionCard";
import { Loading, SomethingWentWrong } from "@/components/shared/Result";
import useGetAnswer from "@/hooks/post/useGetAllAnswer";
import useGetSubmitterInfo from "@/hooks/post/useGetSubmitterInfo";


const SubmitterInfo = () => {
  const { postID, userID } = useParams();
  if (!postID || !userID) {
    return <SomethingWentWrong />;
  }

  const {
    data: user,
    isError,
    isLoading,
  } = useGetSubmitterInfo(userID, postID);
  const {
    data,
    isError: isErrorAnswer,
    isLoading: isLoadingAnswer,
  } = useGetAnswer(postID, userID);
  if (isLoading || isLoadingAnswer) {
    return <Loading />;
  }
  if (isError || isErrorAnswer) {
    return <SomethingWentWrong />;
  }
  return (
    <>
      <Typography.Title level={2}>ข้อมูลผู้สนใจรับเลี้ยง</Typography.Title>
      <Card className="mb-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          <DescriptionCard gap={12} title="ชื่อจริง">
            {user.firstName}
          </DescriptionCard>
          <DescriptionCard gap={12} title="นามสกุล">
            {user.lastName}
          </DescriptionCard>
          <DescriptionCard gap={12} title="เบอร์โทร">
            {user.tel}
          </DescriptionCard>
          <DescriptionCard gap={12} title="อีเมลล์">
            {user.email}
          </DescriptionCard>
        </div>
      </Card>
      <Card className="mb-4">
        <Descriptions
          title="คำตอบ"
          column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2, xxl: 2 }}
        >
          {data.answers.map((d: { question: string; answer: string }) => {
            return (
              <Descriptions.Item
                label={d.question}
                className="whitespace-nowrap"
              >
                {d.answer}
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      </Card>
      <PostDetail postID={postID} />
    </>
  );
};

export default SubmitterInfo;
