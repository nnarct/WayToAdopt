import PetCard from "@/components/PetCard";
import UtilsService from "@/services/UtilsService";
import { Typography } from "antd";

const HomePage = () => {
  // Todo
  // get user's first [name]
  // get all [ID] post
  return (
    <>
      <>
        <Typography.Title className="!text-primary">
          สัตว์ตามหาบ้าน
          <span className="text-secondary-300 whitespace-nowrap">
            แนะนำสำหรับคุณ
          </span>
        </Typography.Title>
        {UtilsService.formatDate(1716010021)}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 sm:justify-between gap-y-8 gap-x-10 lg:gap-x-16">
          <PetCard id={1} />
          <PetCard id={2} />
          <PetCard id={3} />
          <PetCard id={4} />
          <PetCard id={5} />
        </div>
      </>
    </>
  );
};

export default HomePage;
