import { Button, Typography } from "antd";
import UtilsService from "@/services/UtilsService";
import ContentCard from "@/components/shared/ContentCard";
import DescriptionCard from "@/components/shared/DescriptionCard";
import { useAuth } from "@/contexts/AuthContext";

const ProfilePage = () => {
  const { clearAuth } = useAuth();

  const user = {
    firstName: "fnametest",
    lastName: ";nametest",
    tel: "0851234567",
    email: "test@email.com",
    dob: 1027354620,
    sex: 0, // 0male 1female
  };

  return <> code here</>;
};

export default ProfilePage;
