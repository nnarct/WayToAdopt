import PetCard from "@/components/PetCard";
import { PostCard } from "@/assets/types";

const PostsGrid = ({ posts }: { posts: PostCard[] }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 sm:justify-between gap-y-8 gap-x-10 lg:gap-x-16">
        {posts.map((post) => (
          <PetCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default PostsGrid;
