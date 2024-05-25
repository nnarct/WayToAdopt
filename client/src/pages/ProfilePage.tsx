import { Button, Row, Col } from "antd";
import DescriptionCard from "@/components/shared/DescriptionCard";

import dayjs from "dayjs";
import EditableProfilePage from "./EditableProfilePage";

import { useAuth } from "@/contexts/AuthContext";
import "dayjs/locale/th";
import useGetProfile from "@/hooks/useGetProfile";
import { Loading, SomethingWentWrong } from "@/components/shared/Result";

dayjs.locale("th");

const ProfilePage: React.FC = () => {
  const { clearAuth } = useAuth();
  const { data: user, isLoading, isError } = useGetProfile();

  // const handleSave = (values: any) => {
  //   // Convert dob to timestamp
  //   const updatedUser = {
  //     ...values,
  //     dob: values.dob.unix(),
  //   };
  //   setUser(updatedUser);
  //   setIsEditing(false);
  // };

  // const handleCancel = () => {
  //   setIsEditing(false);
  // };
  if (isLoading) return <Loading />;
  if (isError) return <SomethingWentWrong />;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        minHeight: "calc(80vh - 150px)",
        padding: "24px",
      }}
    >
      <div
        style={{
          border: "2px solid #9F9F9F",
          borderRadius: 20,
          background: "#D9D9D900",
          padding: "34px",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        {/* {isEditing && (
             <EditableProfilePage
               user={user}
               onSave={handleSave}
               onCancel={handleCancel}
             />)} */}

        <Row gutter={[16, 16]} justify="space-between">
          <Col span={11}>
            <DescriptionCard title="ชื่อจริง">{user.firstName}</DescriptionCard>
          </Col>
          <Col span={11}>
            <DescriptionCard title="นามสกุล">{user.lastName}</DescriptionCard>
          </Col>
          <Col span={11}>
            <DescriptionCard title="วันเกิด (ค.ศ.)">
              {dayjs(user.dob).format("DD MMM YYYY")}
            </DescriptionCard>
          </Col>
          <Col span={11}>
            <DescriptionCard title="เพศ">
              {user.gender === 0 && "ชาย"}
              {user.gender === 1 && "หญิง"}
              {user.gender === 2 && "อื่นๆ"}
            </DescriptionCard>
          </Col>
          <Col span={11}>
            <DescriptionCard title="เบอร์โทรศัพท์">{user.tel}</DescriptionCard>
          </Col>
          <Col span={11}>
            <DescriptionCard title="Email">{user.email}</DescriptionCard>
          </Col>
        </Row>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          padding: "20px",
        }}
      >
        <Button onClick={() => setIsEditing(true)} type="primary">
          แก้ไขโปรไฟล์
        </Button>
        <Button danger onClick={clearAuth}>
          ออกจากระบบ
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
