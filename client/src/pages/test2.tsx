import React from "react";
import { Avatar, List, Button } from "antd";

const data = [
  {
    title: "Announcement Title 1",
  },
  {
    title: "Announcement Title 2",
  },
  {
    title: "Announcement Title 3",
  },
  {
    title: "Announcement Title 4",
  },
];

const App: React.FC = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item
        actions={[
          <a key="list-loadmore-edit">View answer from the announcement</a>,
          <a key="list-loadmore-edit">End of announcement</a>,
          <a key="list-loadmore-more">Delete announcement</a>,
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
);

export default App;
