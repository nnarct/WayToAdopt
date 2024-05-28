import { Avatar, List, Typography } from "antd";
import { PostListItemType } from "@/assets/types";
import UtilsService from "@/services/UtilsService";
import PostListItemAction from "@/components/features/myPosts/PostListItemAction";

const PostsList = ({ posts }: { posts: PostListItemType[] }) => {
  return (
    <>
      <List
        dataSource={posts}
        renderItem={(post) => {
          return (
            <List.Item
              className="!pl-3 cursor-pointer hover:bg-primary/5"
              actions={[
                <PostListItemAction id={post.id} status={post.status} />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={post.petPic}
                    className={
                      post.status ? "grayscale  h-12 w-12" : "h-12 w-12"
                    }
                  />
                }
                title={
                  <Typography.Text strong ellipsis>
                    <span className="text-gray-400">{post.postTitle} </span>
                    {post.status && (
                      <span className="text-gray-300">(ประการถูกปิด)</span>
                    )}
                  </Typography.Text>
                }
                description={`${post.petType}, ${UtilsService.formatAge(
                  post.petDob
                )}`}
              />
            </List.Item>
          );
        }}
      />
    </>
  );
};

export default PostsList;
