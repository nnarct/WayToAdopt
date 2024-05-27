import { Avatar, Button, Collapse, Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";

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

const answers = [
  { question: "asdasd", answer: "scasetc" },
  { question: "loredf", answer: "sfdg" },
  { question: "adsfasdf", answer: "sfdgsfg" },
  { question: "gfcvb", answer: "sfdgss" },
  { question: "yuioyp", answer: "dfey " },
];

const user = { firstName: "Nan", lastName: "int", id: "asd" };

const AnswerCollapse = () => {
  const navigate = useNavigate();
  return (
    <Collapse
      expandIconPosition={"end"}
      items={[
        {
          key: "1",
          label: (
            <Flex gap={6}>
              <Avatar
                style={{
                  backgroundColor: "#f56a00",
                  verticalAlign: "middle",
                  fontSize: 12,
                }}
                size={"small"}
              >
                {user.firstName[0].toUpperCase()}
                {user.lastName[0].toUpperCase()}
              </Avatar>
              <span>{user.firstName}</span>
              <span>{user.lastName}</span>
            </Flex>
          ),
          children: (
            <Flex vertical>
              {answers.map((answer, i) => (
                <AnswerDescription
                  key={`${answer}${i}`}
                  index={i + 1}
                  question={answer.question}
                  answer={answer.answer}
                />
              ))}
            </Flex>
          ),
          extra: (
            <Button
              onClick={() => navigate(`profile/${user.id}`)}
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
