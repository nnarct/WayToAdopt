// /components/PostListItem.tsx
import React from "react";
import { Avatar, List, Button } from "antd";
import { Link } from "react-router-dom";

const data = [
  {
    title: "My Announcement Title 1",
  },
  {
    title: "My Announcement Title 2",
  },
  {
    title: "My Announcement Title 3",
  },
  {
    title: "My Announcement Title 4",
  },
];

interface PostListItemProps {
  postID: string;
}

const PostListItem: React.FC<PostListItemProps> = ({ postID }) => {
  if (!postID) {
    return null;
  }

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Link
                key="view-announcement-result"
                to={`/myposts/pdetail/answerslist/${postID}`}
              >
                View announcement result
              </Link>,
              <Button key="end-announcement" type="link">
                End of announcement
              </Button>,
              <Button key="delete-announcement" type="link">
                Delete announcement
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={<a href="https://ant.design">{item.title}</a>}
              description="Announcement Description"
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default PostListItem;
