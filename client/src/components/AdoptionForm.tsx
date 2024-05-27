import {
  Button,
  Card,
  Flex,
  Form,
  FormInstance,
  FormProps,
  Input,
  Typography,
} from "antd";
import BackButton from "@/components/shared/BackButton";
import useGetQuestions from "@/hooks/post/useGetQuestions";
import { Loading, SomethingWentWrong } from "@/components/shared/Result";
import { useEffect, useState } from "react";
import { AnswersType, QuestionType } from "@/assets/types";
import useSendAnswer from "@/hooks/post/useSendAnswer";

const AdoptionForm = ({
  postID,
  className,
  props,
}: {
  postID: string;
  className?: string;
  props?: React.PropsWithChildren<FormProps> &
    React.RefAttributes<FormInstance>;
}) => {
  const { data: questions, isError, isLoading } = useGetQuestions(postID);

  const { mutate, isLoading: isSubmitting } = useSendAnswer();

  const [form] = Form.useForm();

  const [submittable, setSubmittable] = useState<boolean>(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values, questions]);

  if (isLoading) {
    if (className) {
      return (
        <div className={className}>
          <Loading />
        </div>
      );
    }
    return <Loading />;
  }
  if (isError) {
    return <SomethingWentWrong />;
  }

  const onFinish = (values: { [s: string]: string } | ArrayLike<string>) => {
    const qIds = Object.keys(values);
    const a = Object.values(values);
    const answers: AnswersType[] = [];
    for (let i = 0; i < a.length; i++) {
      answers.push({ questionId: qIds[i], answer: a[i] });
    }
    mutate({ postId: postID, answers });
  };

  // todo: verify user (cannot submit same adoption)

  return (
    <>
      <Form
        className={className}
        form={form}
        layout="vertical"
        onFinish={onFinish}
        {...props}
      >
        <Card className="mb-4">
          <Typography.Title level={4}>
            กรุณาตอบแบบสอบถามเพื่อรับเลี้ยงสัตว์เลี้ยง
          </Typography.Title>
          {questions.map((question: QuestionType) => {
            return (
              <Form.Item
                name={question.id}
                key={question.id}
                label={question.question}
                rules={[{ required: true }]}
              >
                <Input placeholder="ตอบคำถาม" />
              </Form.Item>
            );
          })}
        </Card>
        <Form.Item>
          <Flex className="w-full justify-between sm:justify-end" gap={16}>
            <BackButton />
            <Button
              type="primary"
              htmlType="submit"
              disabled={!submittable}
              loading={isSubmitting}
            >
              ส่งคำตอบ
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};

export default AdoptionForm;
