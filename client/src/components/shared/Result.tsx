import { Button, Empty, Flex, Result, Spin, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useAuth } from "@/contexts/AuthContext";

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

export const NoPost = ({ myposts }: { myposts?: boolean }) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  return (
    <Flex align="center" justify="center" className="mt-[25vh]">
      <Empty
        description={
          <Typography.Title level={2}>
            ขออภัยในขณะนี้ยังไม่มีโพสต์
            {myposts && "ของคุณแสดงอยู่"}
          </Typography.Title>
        }
      >
        <Button
          type="primary"
          onClick={() => {
            if (token) {
              navigate("/myposts/create");
            } else {
              navigate("/login");
            }
          }}
        >
          สร้างโพสต์ของคุณเลย
        </Button>
      </Empty>
    </Flex>
  );
};
export const NoAnswer = () => {
  return (
    <Flex align="center" justify="center" className="mt-[25vh]">
      <Empty
        description={
          <Typography.Title level={2}>
            ยังไม่มีการตอบกลับในขณะนี้
          </Typography.Title>
        }
      >
        <BackButton />
      </Empty>
    </Flex>
  );
};
