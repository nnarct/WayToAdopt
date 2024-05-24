import { Button, Empty, Flex, Result, Spin, Typography } from "antd";

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
    <Flex align="center" justify="center" className="mt-[25vh]">
      <Spin size="large" />
    </Flex>
  );
};

export const NoPost = () => {
  return (
    <Flex align="center" justify="center" className="mt-[25vh]">
      <Empty
        description={
          <Typography.Title level={2}>
            Sorry, no post at this moment.
          </Typography.Title>
        }
      >
        <Button type="primary">Create your own post Now!</Button>
      </Empty>
    </Flex>
  );
};
