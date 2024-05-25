import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Image, Typography } from "antd";
import { Row, Col, Card, Space } from "antd";
import DescriptionCard from "./shared/DescriptionCard";

interface Post {
  postTitle: string;
  petPic: string;
  petGender: string;
  petDetail: string;
  petDOB: string;
  petType: string;
  petBreed: string;
  petHouseBreaking: string;
  petSterilized: string;
  petVaccinated: string;
  petWean: string;
}

const PostDetail = () => {
  const location = useLocation();
  const [postId, setPostId] = useState<number | null>(null);

  useEffect(() => {
    if (location.state?.postID) {
      setPostId(location.state.postID);
    }
  }, [location.state]);

  let post: Post = {
    postTitle: "",
    petPic: "",
    petGender: "",
    petDetail: "",
    petType: "",
    petBreed: "",
    petDOB: "",
    petHouseBreaking: "",
    petSterilized: "",
    petVaccinated: "",
    petWean: "",
  };

  if (postId === 1) {
    post = {
      postTitle: "หาบ้านให้น้องค่ะ ",
      petPic: "https://static.vecteezy.com/system/resources/thumbnails/005/857/332/small/funny-portrait-of-cute-corgi-dog-outdoors-free-photo.jpg",
      petGender: "M",
      petDetail: "น่ารักขี้เล่นสุดๆ",
      petType: "หมา",
      petBreed: "คอร์กี้",
      petHouseBreaking: "N",
      petSterilized: "N",
      petVaccinated: "Y",
      petWean: "Y",
      petDOB: "2020-07-14",
    };
  } else {
    // ถ้า postId ไม่ใช่ 1 สามารถเรียก API หรือกำหนดข้อมูลอื่น ๆ ตามต้องการได้
    // post = callAPI(postId);
  }

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
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <Row gutter={16} style={{ width: '80%' }}>
    <Col span={6}>
      <Image src={post.petPic} style={{ borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}  />
    </Col>
    <Col span={18}>
      <Card>
        <div style={{ marginBottom: '16px', marginLeft: '8px' }}>
          <Typography.Title level={5} style={{ marginBottom: '8px', fontSize: '15px', color: '#3C6685' }}>หัวข้อประกาศ</Typography.Title>
          <Typography.Text style={{ marginBottom: '16px', fontSize: '14px', color: '#95C0DE' }}>{post.postTitle}</Typography.Text>
        </div>
        <Row>
          <Col span={12}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <DescriptionCard title="ประเภทสัตว์เลี้ยง">{post.petType}</DescriptionCard>
              <DescriptionCard title="วันเกิด">{post.petDOB}</DescriptionCard>
              <DescriptionCard title="การรับการรักษา">{renderVaccinated(post.petVaccinated)}</DescriptionCard>
              <DescriptionCard title="การหย่านม">{renderWean(post.petWean)}</DescriptionCard>
            </Space>
          </Col>
          <Col span={12}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <DescriptionCard title="พันธุ์สัตว์เลี้ยง">{post.petBreed}</DescriptionCard>
              <DescriptionCard title="เพศของสัตว์">{renderGender(post.petGender)}</DescriptionCard>
              <DescriptionCard title="การทำหมัน">{renderSterilized(post.petSterilized)}</DescriptionCard>
              <DescriptionCard title="การฝึกฝนการขับถ่าย">{renderHouseBreaking(post.petHouseBreaking)}</DescriptionCard>
            </Space>
          </Col>
        </Row>
        <div style={{ marginTop: '16px', marginLeft: '8px' }}>
          <Typography.Title level={5} style={{ marginBottom: '8px', fontSize: '14px', color: '#3C6685' }}>รายละเอียดอื่นๆ</Typography.Title>
          <Typography.Text style={{ marginBottom: '16px', fontSize: '14px', color: '#95C0DE' }}>{post.petDetail}</Typography.Text>
        </div>
      </Card>
    </Col>
  </Row>
</div>


  );
};

export default PostDetail;
