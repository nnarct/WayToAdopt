import { Avatar, List, Typography } from "antd";
import { PostListItemType } from "@/assets/types";
import UtilsService from "@/services/UtilsService";
import PostListItemAction from "@/components/features/myPosts/PostListItemAction";
import { useNavigate } from "react-router-dom";

const PostsList = ({ posts }: { posts: PostListItemType[] }) => {
  const navigate = useNavigate();
  return (
    <>
      <List
        dataSource={posts}
        renderItem={(post) => {
          return (
            <List.Item
              className="!pl-3 cursor-pointer hover:bg-primary/5"
              actions={[<PostListItemAction id={post.id} />]}
            >
              <List.Item.Meta
                avatar={<Avatar src={post.petPic} className="h-12 w-12" />}
                title={
                  <Typography.Title level={5} ellipsis>
                    {post.postTitle}
                  </Typography.Title>
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
