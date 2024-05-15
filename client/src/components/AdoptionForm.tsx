import { usePostAdoptionForm } from "@/hooks/usePost";
import {
  Button,
  Flex,
  Form,
  FormInstance,
  FormProps,
  Input,
  Typography,
} from "antd";
import React from "react";
import BackButton from "./shared/BackButton";

const AdoptionForm = ({
  onFinish,
  props,
}: {
  onFinish?: ((values: any) => void) | undefined;
  props?: React.PropsWithChildren<FormProps> &
    React.RefAttributes<FormInstance>;
}) => {
  const questions = [
    { id: "1", name: "เอาชาไทยมั้ย" },
    { id: "2", name: "เอากาแฟมั้ย" },
    { id: "3", name: "เอาชานมมั้ย" },
    { id: "4", name: "เอาชาเย็นมั้ย" },
  ];

  const [form] = Form.useForm();

  const [submittable, setSubmittable] = React.useState<boolean>(false);

  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish} {...props}>
        <div className="border-2 border-[#9f9f9f] rounded-[16px] pt-6 pb-2 px-4 mb-4">
          <Typography.Title level={4}>
            กรุณาตอบแบบสอบถามเพื่อรับเลี้ยงสัตว์เลี้ยง
          </Typography.Title>
          {questions.map((question, index) => {
            return (
              <Form.Item
                name={question.name}
                key={`${question}${index}`}
                label={question.name}
                rules={[{ required: true }]}
              >
                <Input placeholder="ตอบคำถาม" />
              </Form.Item>
            );
          })}
        </div>
        <Form.Item>
          <Flex className="w-full justify-between md:justify-end" gap={16}>
            <BackButton />
            <Button type="primary" htmlType="submit" disabled={!submittable}>
              ส่งคำตอบ
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};

export default AdoptionForm;
