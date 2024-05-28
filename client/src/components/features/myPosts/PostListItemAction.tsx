import { useNavigate } from "react-router-dom";
import { Button, Flex, Divider, Dropdown } from "antd";
import type { MenuProps } from "antd";
import {
  ArrowUpOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
  MoreOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import useDeletePost from "@/hooks/post/useDeletePost";
import { useClosePost, useOpenPost } from "@/hooks/post/useStatusPost";

const PostListItemAction = ({ id, status }: { id: string; status: 0 | 1 }) => {
  const navigate = useNavigate();
  const { mutate: deletePost, isLoading: isDeleting } = useDeletePost();
  const { mutate: closePost, isLoading: isClosing } = useClosePost();
  const { mutate: openPost, isLoading: isOpening } = useOpenPost();

  const items: MenuProps["items"] = [
    { label: "ดูรายละเอียด", key: "0", icon: <InfoCircleOutlined /> },
    { label: "ดูการตอบกลับ", key: "1", icon: <TeamOutlined /> },
    {
      label: status ? "เปิดประกาศ" : "ปิดการประกาศ",
      key: "2",
      icon: status ? <ArrowUpOutlined /> : <CloseOutlined />,
    },
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
        if (status) {
          openPost(id);
        } else {
          closePost(id);
        }
        break;
      case "3":
        deletePost(id);
        break;
    }
  };

  return (
    <>
      <Dropdown className="md:!hidden" menu={{ items, onClick }}>
        <Button icon={<MoreOutlined />} />
      </Dropdown>
      <Flex align="center" className="hidden md:flex">
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
        {status ? (
          <Button
            type="dashed"
            loading={isOpening}
            disabled={isOpening}
            onClick={() => openPost(id)}
          >
            เปิดประกาศ
          </Button>
        ) : (
          <Button
            type="dashed"
            danger
            loading={isClosing}
            disabled={isClosing}
            onClick={() => closePost(id)}
          >
            ปิดการประกาศ
          </Button>
        )}
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
