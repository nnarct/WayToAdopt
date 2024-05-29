import axios from "axios";
import { useQuery } from "react-query";
import { getProfileUrl } from "@/assets/api";

const useGetProfile = () => {
  return useQuery("myProfile", async () => {
    const { data } = await axios.get(getProfileUrl);
    return data;
  });
};

export default useGetProfile;
