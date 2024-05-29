import { Flex, Image, Card } from "antd";
import useGetPostDetail from "@/hooks/post/useGetPostDetail";
import UtilsService from "@/services/UtilsService";
import DescriptionCard from "@/components/shared/DescriptionCard";
import { Loading, SomethingWentWrong } from "@/components/shared/Result";

const PostDetail = ({ postID }: { postID: string }) => {
  const { data: post, isError, isLoading } = useGetPostDetail(postID);

  if (isLoading) return <Loading />;
  if (isError) return <SomethingWentWrong />;

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
          {UtilsService.renderStatus(post.petGender, "gender")}
        </DescriptionCard>
        <DescriptionCard vertical title="การรับการรักษา">
          {UtilsService.renderStatus(post.petVaccinated, "vaccinated")}
        </DescriptionCard>
        <DescriptionCard vertical title="การทำหมัน">
          {UtilsService.renderStatus(post.petSterilized, "sterilized")}
        </DescriptionCard>
        <DescriptionCard vertical title="การหย่านม">
          {UtilsService.renderStatus(post.petWean, "wean")}
        </DescriptionCard>
        <DescriptionCard vertical title="การฝึกฝนการขับถ่าย">
          {UtilsService.renderStatus(post.petHouseBreaking, "houseBreaking")}
        </DescriptionCard>
        <DescriptionCard
          className="sm:col-span-2"
          vertical
          title="รายละเอียดอื่นๆ"
        >
          {post.petDetail || "-"}
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
