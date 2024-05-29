import axios from "axios";
import { useQuery } from "react-query";
import { getProfileUrl } from "@/assets/api";
import { useAuth } from "@/contexts/AuthContext";

const useGetProfile = () => {
  const { token } = useAuth();
  return useQuery("myProfile", async () => {
    try {
      const { data } = await axios.post(getProfileUrl, { token });
      return data;
    } catch (error) {
      console.log({ error });
    }
  });
};

export default useGetProfile;
