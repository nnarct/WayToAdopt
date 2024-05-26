import { useNavigate } from "react-router-dom";
import { Button, Flex, Divider, Dropdown } from "antd";
import type { MenuProps } from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  MoreOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const PostListItemAction = ({ id }: { id: string }) => {

  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    { label: "ดูการตอบกลับ", key: "1", icon: <TeamOutlined /> },
    { label: "ปิดการประกาศ", key: "2", icon: <CloseOutlined /> },
    { label: "ลบ", key: "3", icon: <DeleteOutlined />, danger: true },
  ];

  return (
    <>
      <Dropdown className="sm:!hidden" menu={{ items }}>
        <Button icon={<MoreOutlined />} />
      </Dropdown>
      <Flex align="center" className="hidden sm:flex">
        <Button
          type="primary"
          onClick={() => navigate(`/myposts/pdetail/answerslist/${id}`)}
        >
          ดูการตอบกลับ
        </Button>
        <Divider type="vertical" />
        <Button type="dashed" danger>
          ปิดการประกาศ
        </Button>
        <Divider type="vertical" />
        <Button danger>ลบ</Button>
      </Flex>
    </>
  );
};

export default PostListItemAction;
