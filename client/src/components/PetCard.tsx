import { Link } from "react-router-dom";
import { Button, Flex, Image, Typography } from "antd";
import UtilsService from "@/services/UtilsService";
import pawIcon from "@/assets/images/paw.svg";
import DescriptionCard from "@/components/shared/DescriptionCard";
import { PostCard } from "@/assets/types";

const PetCard = ({ post }: { post: PostCard }) => {
  return (
    <>
      <Flex vertical align="center">
        <div style={{ maxWidth: 328 }}>
          <Image
            className="image object-cover"
            src={post.petPic}
            style={{ width: 328, height: 328, borderRadius: 16 }}
          />
          <Typography.Title
            level={2}
            ellipsis
            className="py-1"
            style={{ color: "#3c6685", fontSize: 24, fontWeight: 600 }}
          >
            {post.postTitle}
          </Typography.Title>
          <div className="p-2 border border-[#a5b1ba] rounded-md w-full">
            <Flex className="px-1 mb-5" gap={12}>
              <Flex vertical>
                <img src={pawIcon} alt="paw-icon" style={{width: 20, paddingTop: 6}}/>
              </Flex>
              <Flex className="flex-1" vertical>
                <DescriptionCard
                  justify="space-between"
                  title="ประเภทสัตว์เลี้ยง"
                >
                  {post.petType}
                </DescriptionCard>
                <DescriptionCard
                  justify="space-between"
                  title="พันธุ์สัตว์เลี้ยง"
                >
                  {post.petBreed}
                </DescriptionCard>
                <DescriptionCard justify="space-between" title="อายุ">
                  {UtilsService.formatAge(post.petDob)}
                </DescriptionCard>
              </Flex>
            </Flex>
            <Link to={`/petdetails/${post.id}`}>
              <Button
                type="primary"
                className="py-2 h-fit w-full mx-auto "
              >
                ดูรายละเอียดทั้งหมด
              </Button>
            </Link>
          </div>
        </div>
      </Flex>
    </>
  );
};

export default PetCard;
