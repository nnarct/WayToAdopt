import { Button, Flex, Image, Typography } from "antd";
import { Link } from "react-router-dom";
import DescriptionCard from "@/components/shared/DescriptionCard";
import pawIcon from "@/assets/images/paw.svg";

const PetCard = ({ id }: { id?: number }) => {
  // get [postTitle,petPic, petType, petBreed, age] from post {id}

  const mock = {
    postTitle: "หาบ้านให้น้องค่ะ ",
    petPic:
      "https://static.vecteezy.com/system/resources/thumbnails/005/857/332/small/funny-portrait-of-cute-corgi-dog-outdoors-free-photo.jpg",
    petType: "หมา",
    petBreed: "คอร์กี้",
    petAge: 4,
  };

  return (
    <>
      <div style={{ minWidth: 400, padding: "2rem 0" }}>
        <Image
          className="image object-cover"
          src={mock.petPic}
          style={{ width: "100%", height: 300, borderRadius: 16 }}
        />
        <Typography.Title
          level={2}
          ellipsis
          className="py-4"
          style={{ color: "#3c6685", fontSize: 24, fontWeight: 500 }}
        >
          {mock.postTitle}
        </Typography.Title>
        <div className="p-6 border-2 border-[#9f9f9f] rounded-[16px]">
          <Flex className="px-1 mb-5" gap={12}>
            <Flex vertical>
              <img src={pawIcon} alt="paw-icon" />
            </Flex>
            <Flex className="flex-1" vertical>
              <DescriptionCard title="ประเภทสัตว์เลี้ยง">
                {mock.petType}
              </DescriptionCard>
              <DescriptionCard title="พันธุ์สัตว์เลี้ยง">
                {mock.petBreed}
              </DescriptionCard>
              <DescriptionCard title="อายุ">{mock.petAge}</DescriptionCard>
            </Flex>
          </Flex>
          <Link to={`/Adoption`} state={{ postIi: id }}>
            <Button
              type="primary"
              className="h-16 w-full mx-auto rounded-[16px] text-xl"
            >
              ดูรายละเอียดทั้งหมด
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PetCard;
