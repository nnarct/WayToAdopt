import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.svg";
import { Flex, Image } from "antd";

interface NavbarProps {
  rightContentRender: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ rightContentRender }) => {
  return (
    <nav className="container mx-auto px-4">
      <Flex align="center" justify="space-between" className="w-full py-4">
        <Link to="/">
          <Image preview={false} src={logo} />
        </Link>
        <Flex align="center" gap={10}>
          {rightContentRender}
        </Flex>
      </Flex>
    </nav>
  );
};

export default Navbar;
