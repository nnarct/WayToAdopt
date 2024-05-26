import { Image, Typography } from "antd";
import { Row, Col, Card, Space } from "antd";
import DescriptionCard from "./shared/DescriptionCard";
import useGetPostDetail from "@/hooks/post/useGetPostDetail";
import { Loading, SomethingWentWrong } from "./shared/Result";
import { useEffect } from "react";

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
  // let post: Post = {
  //   postTitle: "",
  //   petPic: "",
  //   petGender: "",
  //   petDetail: "",
  //   petType: "",
  //   petBreed: "",
  //   petDOB: "",
  //   petHouseBreaking: "",
  //   petSterilized: "",
  //   petVaccinated: "",
  //   petWean: "",
  // };

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
      case "NS":
        return "ไม่ระบุ";
      default:
        return "";
    }
  };

  const renderWean = (status: string) => {
    switch (status) {
      case "Y":
        return "หย่านมแล้ว";
      case "N":
        return "ยังไม่หย่านม";
      case "NS":
        return "ไม่ระบุ";
      default:
        return "";
    }
  };

  const renderGender = (gender: string) => {
    switch (gender) {
      case "M":
        return "เพศชาย";
      case "F":
        return "เพศหญิง";
      default:
        return "";
    }
  };

  const renderSterilized = (status: string) => {
    switch (status) {
      case "Y":
        return "ทำหมันแล้ว";
      case "N":
        return "ยังไม่ทำหมัน";
      case "NS":
        return "ไม่ระบุ";
      default:
        return "";
    }
  };

  const renderHouseBreaking = (status: string) => {
    switch (status) {
      case "Y":
        return "ฝึกขับถ่ายแล้ว";
      case "N":
        return "ยังไม่ฝึกขับถ่าย";
      case "NS":
        return "ไม่ระบุ";
      default:
        return "";
    }
  };

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Image src={post.petPic} />
      </Col>
      <Col span={18}>
        <Card>
          <div style={{ marginBottom: "16px" }}>
            <Typography.Title level={5} style={{ marginBottom: "8px" }}>
              <span className="text-primary">หัวข้อประกาศ</span>
            </Typography.Title>
            <Typography.Text style={{ marginBottom: "16px" }}>
              <span className="text-secondary">{post.postTitle}</span>
            </Typography.Text>
          </div>
          <Row>
            <Col span={12}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <DescriptionCard vertical title="ประเภทสัตว์เลี้ยง">
                  {post.petType}
                </DescriptionCard>
                <DescriptionCard vertical title="วันเกิด">
                  {post.petDOB}
                </DescriptionCard>
                <DescriptionCard vertical title="การรับการรักษา">
                  {renderVaccinated(post.petVaccinated)}
                </DescriptionCard>
                <DescriptionCard vertical title="การหย่านม">
                  {renderWean(post.petWean)}
                </DescriptionCard>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <DescriptionCard vertical title="พันธุ์สัตว์เลี้ยง">
                  {post.petBreed}
                </DescriptionCard>
                <DescriptionCard vertical title="เพศของสัตว์">
                  {renderGender(post.petGender)}
                </DescriptionCard>
                <DescriptionCard vertical title="การทำหมัน">
                  {renderSterilized(post.petSterilized)}
                </DescriptionCard>
                <DescriptionCard vertical title="การฝึกฝนการขับถ่าย">
                  {renderHouseBreaking(post.petHouseBreaking)}
                </DescriptionCard>
              </Space>
            </Col>
          </Row>
          <div style={{ marginTop: "16px" }}>
            <Typography.Title level={5} style={{ marginBottom: "8px" }}>
              <span className="text-primary">รายละเอียดอื่นๆ</span>
            </Typography.Title>
            <Typography.Text style={{ marginBottom: "16px" }}>
              <span className="text-secondary">{post.petDetail}</span>
            </Typography.Text>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default PostDetail;
