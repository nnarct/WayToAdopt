import useGetMyPosts from "@/hooks/post/useGetMyPosts";
import PostsList from "@/components/PostsList";
import {
  Loading,
  NoPost,
  SomethingWentWrong,
} from "@/components/shared/Result";

const MyPosts = () => {
  const { data: posts, isLoading, isError } = useGetMyPosts();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <SomethingWentWrong />;
  }
  if (posts.length === 0) {
    return <NoPost />;
  }

  return <PostsList posts={posts} />;
};

export default MyPosts;
