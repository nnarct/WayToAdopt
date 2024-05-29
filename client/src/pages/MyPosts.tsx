import { useNavigate } from "react-router-dom";
import { Button, Flex, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useGetMyPosts from "@/hooks/post/useGetMyPosts";
import PostsList from "@/components/PostsList";
import {
  Loading,
  NoPost,
  SomethingWentWrong,
} from "@/components/shared/Result";

const MyPosts = () => {
  const navigate = useNavigate();
  const { data: posts, isLoading, isError } = useGetMyPosts();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <SomethingWentWrong />;
  }
  if (posts?.length === 0) {
    return <NoPost myposts />;
  }

  return (
    <>
      <Flex align="center" justify="space-between">
        <Typography.Title level={2}>ประกาศของฉัน</Typography.Title>
        <Button
          onClick={() => navigate("create")}
          type="primary"
          icon={<PlusOutlined />}
        >
          สร้างโพสต์
        </Button>
      </Flex>
      <PostsList posts={posts} />
    </>
  );
};

export default MyPosts;
