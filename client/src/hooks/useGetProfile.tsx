import axios from "axios";
import { useQuery } from "react-query";
import { useAuth } from "@/contexts/AuthContext";
import { getProfileUrl } from "@/assets/api";

const useGetProfile = () => {
  const { token } = useAuth(); // Assuming useAuth is a hook that returns the authentication token
  return useQuery("myProfile", async () => {
    const { data } = await axios.post(getProfileUrl, { token });
    return data;
  });
};

export default useGetProfile;
