import { Button, Empty, Flex, Result, Spin, Typography } from "antd";
import { useNavigate } from "react-router-dom";

export const SomethingWentWrong = () => {
  return (
    <Flex align="center" justify="center" className="mt-[25vh]">
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
      />
    </Flex>
  );
};

export const Loading = () => {
  return (
    <Flex align="center" justify="center" className="mt-[25vh] mb-[25vh]">
      <Spin size="large" />
    </Flex>
  );
};

export const NoPost = () => {
  const navigate = useNavigate()
  return (
    <Flex align="center" justify="center" className="mt-[25vh]">
      <Empty
        description={
          <Typography.Title level={2}>
            ขออภัยในขณะนี้ไม่มีโพสต์ของคุณแสดงอยู่
          </Typography.Title>
        }
      >
        <Button type="primary" onClick={() => navigate("/myposts/create")}>สร้างโพสต์ของคุณเลย</Button>
      </Empty>
    </Flex>
  );
};
