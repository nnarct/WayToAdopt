import { useNavigate } from "react-router-dom";
import { Button, Flex, Divider, Dropdown } from "antd";
import type { MenuProps } from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  MoreOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import useDeletePost from "@/hooks/post/useDeletePost";
import useClosePost from "@/hooks/post/useClosePost";

const PostListItemAction = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const { mutate: deletePost, isLoading: isDeleting } = useDeletePost();
  const { mutate: closePost, isLoading: isClosing } = useClosePost();

  const items: MenuProps["items"] = [
    { label: "ดูรายละเอียด", key: "0", icon: <TeamOutlined /> },
    { label: "ดูการตอบกลับ", key: "1", icon: <TeamOutlined /> },
    { label: "ปิดการประกาศ", key: "2", icon: <CloseOutlined /> },
    { label: "ลบ", key: "3", icon: <DeleteOutlined />, danger: true },
  ];
  const onClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "0":
        navigate(`/myposts/pdetail/${id}`);
        break;
      case "1":
        navigate(`/myposts/pdetail/${id}/answerslist`);
        break;
      case "2":
        closePost(id);
        break;
      case "3":
        deletePost(id);
        break;
    }
  };

  return (
    <>
      <Dropdown className="sm:!hidden" menu={{ items, onClick }}>
        <Button icon={<MoreOutlined />} />
      </Dropdown>
      <Flex align="center" className="hidden sm:flex">
        <Button onClick={() => navigate(`/myposts/pdetail/${id}`)}>
          ดูรายละเอียด
        </Button>
        <Divider type="vertical" />
        <Button
          type="primary"
          onClick={() => navigate(`/myposts/pdetail/${id}/answerslist`)}
        >
          ดูการตอบกลับ
        </Button>
        <Divider type="vertical" />
        <Button
          type="dashed"
          danger
          loading={isClosing}
          disabled={isClosing}
          onClick={() => closePost(id)}
        >
          ปิดการประกาศ
        </Button>
        <Divider type="vertical" />
        <Button
          danger
          loading={isDeleting}
          disabled={isDeleting}
          onClick={() => deletePost(id)}
        >
          ลบ
        </Button>
      </Flex>
    </>
  );
};

export default PostListItemAction;
