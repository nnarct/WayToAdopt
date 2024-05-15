import { useNavigate, Link } from "react-router-dom";
import { Button, Flex, Image } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import logo from "@/assets/images/logo.svg";

interface NavbarProps {
  rightContentRender: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ rightContentRender }) => {
  const navigate = useNavigate();

  return (
    <nav className="container mx-auto px-4">
      <Flex align="center" justify="space-between" className="w-full py-4">
        <Link to="/">
          <Image preview={false} src={logo} />
        </Link>
        <Flex align="center" gap={10}>
          <Button
            onClick={() => navigate("/search")}
            type="text"
            size="large"
            icon={<SearchOutlined />}
          >
            ค้นหาสัตว์เลี้ยง
          </Button>
          {rightContentRender}
        </Flex>
      </Flex>
    </nav>
  );
};

export default Navbar;
