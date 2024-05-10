import { Avatar, Button, Dropdown, Flex, Image } from "antd";

import {
  AppstoreAddOutlined,
  UserOutlined,
  SearchOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "@/services/AuthService";
import useAuth from "@/hooks/useAuth";
import logo from "@/assets/images/logo.svg";

type Props = {};

const Navbar = (props: Props) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const items = [
    {
      key: "1",
      label: <Link to="/profile">Profile Setting</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: <span onClick={logout}>Log out</span>,
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <nav className="container mx-auto px-4">
      <Flex align={"center"} justify={"space-between"} className="w-full py-4">
        <Link to={"/"}>
          <Image preview={false} src={logo} />
        </Link>
        <Flex align={"center"} gap={10}>
          <Button
            onClick={() => navigate("/search")}
            type="text"
            size="large"
            icon={<SearchOutlined />}
          >
            ค้นหาสัตว์เลี้ยง
          </Button>
          {AuthService.isAuthenticated() ? (
            <>
              <Button
                onClick={() => navigate("/owner-dashboard")}
                type="text"
                size="large"
                icon={<AppstoreAddOutlined />}
              >
                ประกาศของฉัน
              </Button>
              <Dropdown menu={{ items }} placement="bottomRight">
                <Avatar
                  icon={<UserOutlined />}
                  style={{ backgroundColor: "#3c6685" }}
                />
              </Dropdown>
            </>
          ) : (
            <>
              <Button onClick={() => navigate("/signup")} type="primary">
                ลงทะเบียน
              </Button>
              <Button onClick={() => navigate("/login")}>เข้าสู่ระบบ</Button>
            </>
          )}
        </Flex>
      </Flex>
    </nav>
  );
};

export default Navbar;
