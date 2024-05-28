import axios from "axios";
import { useQuery } from "react-query";
import { getPetTypesUrl } from "@/assets/api";

const useGetPetTypes = () => {
  return useQuery("petTypes", async () => {
    const { data } = await axios.get(getPetTypesUrl);
    return data;
  });
};

export default useGetPetTypes;
