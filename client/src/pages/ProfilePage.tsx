import { Button, Typography } from "antd";
import useAuth from "@/hooks/useAuth";
import UtilsService from "@/services/UtilsService";
import ContentCard from "@/components/shared/ContentCard";
import DescriptionCard from "@/components/shared/DescriptionCard";

const ProfilePage = () => {
  const { logout } = useAuth();

  const user = {
    firstName: "fnametest",
    lastName: ";nametest",
    tel: "0851234567",
    email: "test@email.com",
    dob: 1027354620,
    sex: 0, // 0male 1female
  };

  return (<> code here</>);
};

export default ProfilePage;
