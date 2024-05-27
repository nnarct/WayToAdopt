import { useNavigate } from "react-router-dom";
import { Avatar, Button, Collapse, Flex, Skeleton, Typography } from "antd";
import { SomethingWentWrong } from "@/components/shared/Result";
import useGetAnswer from "@/hooks/post/useGetAllAnswer";
import UtilsService from "@/services/UtilsService";

const AnswerDescription = ({
  index,
  question,
  answer,
}: {
  index: number;
  question: string;
  answer: string;
}) => {
  return (
    <Flex gap={4}>
      {index}.<Typography.Text>{question}</Typography.Text> :
      <Typography.Text strong>{answer}</Typography.Text>
    </Flex>
  );
};

const AnswerCollapse = ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAnswer(postId, userId);
  if (isLoading) {
    return <Skeleton.Input style={{ height: 50, width: "100%" }} active />;
  }
  if (isError) {
    return <SomethingWentWrong />;
  }

  return (
    <Collapse
      expandIconPosition={"end"}
      items={[
        {
          key: userId,
          label: (
            <Flex gap={6}>
              <Avatar
                style={{
                  backgroundColor: UtilsService.getRandomColor(),
                  verticalAlign: "middle",
                  fontSize: 12,
                }}
                size={"small"}
              >
                {data.user.firstName[0].toUpperCase()}
                {data.user.lastName[0].toUpperCase()}
              </Avatar>
              <span>{data.user.firstName}</span>
              <span>{data.user.lastName}</span>
            </Flex>
          ),
          children: (
            <Flex vertical>
              {data.answers.map(
                (answer: { question: string; answer: string }, i: number) => (
                  <AnswerDescription
                    key={`${answer}${i}`}
                    index={i + 1}
                    question={answer.question}
                    answer={answer.answer}
                  />
                )
              )}
            </Flex>
          ),
          extra: (
            <Button
              onClick={() => navigate(`profile/${userId}`)}
              size="small"
              style={{ fontSize: 12 }}
            >
              ดูข้อมูลผู้ใช้
            </Button>
          ),
        },
      ]}
    />
  );
};

export default AnswerCollapse;
