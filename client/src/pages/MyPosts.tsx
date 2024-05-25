import useGetMyPosts from "@/hooks/post/useGetMyPosts";
import PostListItem from "@/components/PostListItem";
import {
  Loading,
  NoPost,
  SomethingWentWrong,
} from "@/components/shared/Result";

const MyPosts = () => {
  const { data: posts, isLoading, isError } = useGetMyPosts();

  if (isLoading) return <Loading />;
  if (isError) return <SomethingWentWrong />;
  if (posts.length === 0) return <NoPost />;

  return (
    <>
      {/* guide */}
      Implement My Posts Here<br></br>
      {/* guide ends */}
      {posts.map((post: { id: string }) => (
        <PostListItem key={`postItem${post.id}`} post={post} />
      ))}
    </>
  );
};

export default MyPosts;
