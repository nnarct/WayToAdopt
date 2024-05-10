import PetCard from "@/components/PetCard";
import { Flex } from "antd";

const HomePage = () => {
  // get user's first [name]
  // get all [ID] post
  return (
    <>
      <div>
        HomePage
        <div className="igrid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 sm:justify-between gap-24">
          <PetCard />
          <PetCard />
          <PetCard />
          <PetCard />
          <PetCard />
        </div>
      </div>
    </>
  );
};

export default HomePage;
