import { Button, Result } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

// todo - verify only access this page from submittion
const SubmitSuccess = () => {
  const navigate = useNavigate();
  // const location = useLocation()
  // const { } = location.state()
  // if(location.sta)
  return (
    <Result
      status="success"
      title="ส่งคำขอร้องรับเลี้ยงสัตว์เรียบร้อยแล้ว!"
      // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button onClick={() => navigate("/")} type="primary" key="console">
          กลับหน้าหลัก
        </Button>,
      ]}
    />
  );
};

export default SubmitSuccess;
