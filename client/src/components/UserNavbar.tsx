import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown } from "antd";
import {
  AppstoreAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import useAuth from "@/hooks/useAuth";
import Navbar from "./shared/Navbar";

const UserNavbar = () => {
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
    <>
      <Navbar
        rightContentRender={
          <>
            <Button
              onClick={() => navigate("/myposts")}
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
        }
      />
    </>
  );
};

export default UserNavbar;
