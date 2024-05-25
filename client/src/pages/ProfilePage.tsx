import { Button, Row, Col, Flex, Typography } from "antd";
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
    <>
      {/* {isEditing && (
             <EditableProfilePage
               user={user}
               onSave={handleSave}
               onCancel={handleCancel}
             />)} */}
      <Typography.Title level={2}>ข้อมูลผู้ใช้งาน</Typography.Title>
      <div className="border-2 border-[#9F9F9F] mx-auto p-8 max-w-xl rounded-xl grid grid-cols-2 gap-4">
        <DescriptionCard vertical title="ชื่อจริง">
          {user.firstName}
        </DescriptionCard>

        <DescriptionCard vertical title="นามสกุล">
          {user.lastName}
        </DescriptionCard>

        <DescriptionCard vertical title="วันเกิด (ค.ศ.)">
          {dayjs(user.dob).format("DD MMM YYYY")}
        </DescriptionCard>

        <DescriptionCard vertical title="เพศ">
          {user.gender === 0 && "ชาย"}
          {user.gender === 1 && "หญิง"}
          {user.gender === 2 && "อื่นๆ"}
        </DescriptionCard>

        <DescriptionCard vertical title="เบอร์โทรศัพท์">
          {user.tel}
        </DescriptionCard>

        <DescriptionCard vertical title="Email">
          {user.email}
        </DescriptionCard>
      </div>
      <Flex gap={30} justify="center" className="p-5">
        <Button onClick={() => {}} type="primary">
          แก้ไขโปรไฟล์
        </Button>
        <Button danger onClick={clearAuth}>
          ออกจากระบบ
        </Button>
      </Flex>
    </>
  );
};

export default ProfilePage;
