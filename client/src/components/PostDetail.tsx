import { Col, Flex, Row, Typography, Image } from "antd";
import DescriptionCard from "./shared/DescriptionCard";

const PostDetail = ({ postId }: { postId: number }) => {
  // implement post detail
  const post = {
    postTitle: "หาบ้านให้น้องค่ะ ",
    petPic:
      "https://static.vecteezy.com/system/resources/thumbnails/005/857/332/small/funny-portrait-of-cute-corgi-dog-outdoors-free-photo.jpg",
    petType: "หมา",
    petBreed: "คอร์กี้",
    petAge: 1681100448,
    // ... etc data to display
  };
  return (
    <Flex wrap="wrap">
      <div className="w-full md:w-1/4 pr-6">
        <Image src={post.petPic} />
      </div>

      <div className="w-full md:w-3/4 px-4 py-6 border-2 border-[#9f9f9f] rounded-[16px] ">
        <Typography.Title level={4}>title</Typography.Title>
        <DescriptionCard vertical title="petType">
          {post.petType}
        </DescriptionCard>
      </div>
    </Flex>
  );
};

export default PostDetail;
