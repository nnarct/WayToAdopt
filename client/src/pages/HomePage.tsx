import { Typography } from "antd";
import PostsGrid from "@/components/features/homepage/PostsGrid";
import usePosts from "@/hooks/post/useGetAllPosts";
import { Loading, SomethingWentWrong } from "@/components/shared/Result";

const HomePage = () => {
  const { data, isLoading, isError } = usePosts();

  if (isLoading) return <Loading />;
  if (isError) return <SomethingWentWrong />;
  if (data)
    return (
      <>
        <Typography.Title level={2} className="!text-primary">
          สัตว์ตามหาบ้าน
          <span className="text-secondary-300 whitespace-nowrap">
            แนะนำสำหรับคุณ
          </span>
        </Typography.Title>
        <PostsGrid posts={data} />;
      </>
    );
  <Loading />;
};

export default HomePage;
