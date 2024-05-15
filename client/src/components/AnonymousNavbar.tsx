import { Button } from "antd";
import React from "react";
import Navbar from "./shared/Navbar";
import { useNavigate } from "react-router-dom";

type Props = {};

const AnonymousNavbar = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Navbar
      rightContentRender={
        <>
          <Button onClick={() => navigate("/signup")} type="primary">
            ลงทะเบียน
          </Button>
          <Button onClick={() => navigate("/login")}>เข้าสู่ระบบ</Button>
        </>
      }
    />
  );
};

export default AnonymousNavbar;
