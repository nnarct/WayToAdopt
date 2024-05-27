import { Flex, Image, Card } from "antd";
import useGetPostDetail from "@/hooks/post/useGetPostDetail";
import UtilsService from "@/services/UtilsService";
import DescriptionCard from "@/components/shared/DescriptionCard";
import { Loading, SomethingWentWrong } from "@/components/shared/Result";

// interface Post {
//   postTitle: string;
//   petPic: string;
//   petGender: string;
//   petDetail: string;
//   petDOB: string;
//   petType: string;
//   petBreed: string;
//   petHouseBreaking: string;
//   petSterilized: string;
//   petVaccinated: string;
//   petWean: string;
// }

const PostDetail = ({ postID }: { postID: string }) => {
  const { data: post, isError, isLoading } = useGetPostDetail(postID);

  if (isLoading) return <Loading />;
  if (isError) return <SomethingWentWrong />;

  // post = {
  //   postTitle: "หาบ้านให้น้องค่ะ ",
  //   petPic:
  //     "https://static.vecteezy.com/system/resources/thumbnails/005/857/332/small/funny-portrait-of-cute-corgi-dog-outdoors-free-photo.jpg",
  //   petGender: "M",
  //   petDetail: "น่ารักขี้เล่นสุดๆ",
  //   petType: "หมา",
  //   petBreed: "คอร์กี้",
  //   petHouseBreaking: "N",
  //   petSterilized: "N",
  //   petVaccinated: "Y",
  //   petWean: "Y",
  //   petDOB: "2020-07-14",
  // };

  const renderVaccinated = (status: string) => {
    switch (status) {
      case "Y":
        return "ได้รับการฉีดวัคซีนแล้ว";
      case "N":
        return "ยังไม่ได้รับการฉีดวัคซีนแล้ว";
      default:
        return "ไม่ระบุ";
    }
  };

  const renderWean = (status: string) => {
    switch (status) {
      case "Y":
        return "หย่านมแล้ว";
      case "N":
        return "ยังไม่หย่านม";
      default:
        return "ไม่ระบุ";
    }
  };

  const renderGender = (gender: 0 | 1 | 2) => {
    switch (gender) {
      case 0:
        return "เพศชาย";
      case 1:
        return "เพศหญิง";
      case 2:
        return "อื่นๆ";
      default:
        return "-";
    }
  };

  const renderSterilized = (status: string) => {
    switch (status) {
      case "Y":
        return "ทำหมันแล้ว";
      case "N":
        return "ยังไม่ทำหมัน";
      default:
        return "ไม่ระบุ";
    }
  };

  const renderHouseBreaking = (status: string) => {
    switch (status) {
      case "Y":
        return "ฝึกขับถ่ายแล้ว";
      case "N":
        return "ยังไม่ฝึกขับถ่าย";
      default:
        return "ไม่ระบุ";
    }
  };
  const Details = () => {
    return (
      <div className="grid sm:grid-cols-2 gap-x-2 gap-y-4">
        <DescriptionCard
          className="sm:col-span-2"
          vertical
          title="หัวข้อประกาศ"
        >
          {post.postTitle}
        </DescriptionCard>
        <DescriptionCard vertical title="ประเภทสัตว์เลี้ยง">
          {post.petType}
        </DescriptionCard>
        <DescriptionCard vertical title="พันธุ์สัตว์เลี้ยง">
          {post.petBreed}
        </DescriptionCard>
        <DescriptionCard vertical title="วันเกิด">
          {UtilsService.formatDate(post.petDob)}
          {"  "}({UtilsService.formatAge(post.petDob)})
        </DescriptionCard>
        <DescriptionCard vertical title="เพศของสัตว์">
          {renderGender(post.petGender)}
        </DescriptionCard>
        <DescriptionCard vertical title="การรับการรักษา">
          {renderVaccinated(post.petVaccinated)}
        </DescriptionCard>
        <DescriptionCard vertical title="การทำหมัน">
          {renderSterilized(post.petSterilized)}
        </DescriptionCard>
        <DescriptionCard vertical title="การหย่านม">
          {renderWean(post.petWean)}
        </DescriptionCard>
        <DescriptionCard vertical title="การฝึกฝนการขับถ่าย">
          {renderHouseBreaking(post.petHouseBreaking)}
        </DescriptionCard>
        <DescriptionCard
          className="sm:col-span-2"
          vertical
          title="รายละเอียดอื่นๆ"
        >
          {post.petDetail}
        </DescriptionCard>
      </div>
    );
  };

  return (
    <div className="sm:grid sm:grid-cols-3 gap-4">
      <Flex vertical className="mb-4 sm:mb-0">
        <Image
          src={post.petPic}
          style={{
            borderRadius: 20,
            border: "1px solid #fff",
            maxHeight: 400,
            height: "fit",
            objectFit: "cover",
          }}
        />
      </Flex>
      <Card className="col-span-2">
        <Details />
      </Card>
    </div>
  );
};

export default PostDetail;
