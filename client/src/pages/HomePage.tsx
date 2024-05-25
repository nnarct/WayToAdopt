import { Typography } from "antd";
import useGetAllPosts from "@/hooks/post/useGetAllPosts";
import PostsGrid from "@/components/features/homepage/PostsGrid";
import {
  Loading,
  NoPost,
  SomethingWentWrong,
} from "@/components/shared/Result";

const HomePage = () => {
  const { data, error, isLoading } = useGetAllPosts();

  const renderContent = () => {
    if (isLoading) return <Loading />;
    if (error) return <SomethingWentWrong />;
    if (!data || data?.length === 0) return <NoPost />;
    return <PostsGrid posts={data} />;
  };

  return (
    <>
      <Typography.Title level={2} className="!text-primary">
        สัตว์ตามหาบ้าน
        <span className="text-secondary-300 whitespace-nowrap">
          แนะนำสำหรับคุณ
        </span>
      </Typography.Title>
      {renderContent()}
    </>
  );
};

export default HomePage;
