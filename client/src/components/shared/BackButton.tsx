import { useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "antd";
import { LeftOutlined } from "@ant-design/icons";

const BackButton = (props: ButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button {...props} icon={<LeftOutlined />} onClick={() => navigate(-1)}>
      ย้อนกลับ
    </Button>
  );
};

export default BackButton;
