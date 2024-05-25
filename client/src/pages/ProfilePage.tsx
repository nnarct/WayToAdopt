
import React, { useState } from "react";
import { Button, Row, Col } from "antd";
import DescriptionCard from "@/components/shared/DescriptionCard";
import PageLayout from "../components/shared/PageLayout";
import useAuth from "@/hooks/useAuth";
import dayjs from "dayjs";
import EditableProfilePage from "./EditableProfilePage";

dayjs.locale("th");

interface User {
  firstName: string;
  lastName: string;
  tel: string;
  email: string;
  dob: number;
  sex: number;
const ProfilePage: React.FC = () => {
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User>({
    firstName: "fnametest",
    lastName: ";nametest",
    tel: "0851234567",
    email: "test@email.com",
    dob: 1027354620,
    sex: 0, // 0male 1female
  });

  const handleSave = (values: any) => {
    // Convert dob to timestamp
    const updatedUser = {
      ...values,
      dob: values.dob.unix(),
    };
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <PageLayout
      breadcrumbItems={[
        {
          title: "หน้าหลัก",
        },
        {
          title: "บัญชีผู้ใช้งาน",
        },
      ]}
      title={"ข้อมูลผู้ใช้งาน"}
      titleProps={{ style: { textAlign: "center" } }}
    >
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
          {isEditing ? (
            <EditableProfilePage
              user={user}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <Row gutter={[16, 16]} justify="space-between">
              <Col span={11}>
                <DescriptionCard title="ชื่อจริง">{user?.firstName}</DescriptionCard>
              </Col>
              <Col span={11}>
                <DescriptionCard title="นามสกุล">{user?.lastName}</DescriptionCard>
              </Col>
              <Col span={11}>
                <DescriptionCard title="วันเกิด (ค.ศ.)">{dayjs.unix(user?.dob).format('YYYY-MM-DD')}</DescriptionCard>
              </Col>
              <Col span={11}>
                <DescriptionCard title="เพศ">{user?.sex === 0 ? "ชาย" : "หญิง"}</DescriptionCard>
              </Col>
              <Col span={11}>
                <DescriptionCard title="เบอร์โทรศัพท์">{user?.tel}</DescriptionCard>
              </Col>
              <Col span={11}>
                <DescriptionCard title="Email">{user?.email}</DescriptionCard>
              </Col>
            </Row>
          )}
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
          <Button danger onClick={logout}>
            ออกจากระบบ
          </Button>
          
        </div>
      </div>
    </PageLayout>
  );

};

export default ProfilePage;