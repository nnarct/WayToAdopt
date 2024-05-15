import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Flex, Form, Typography, notification } from "antd";
import { usePostAdoptionForm } from "@/hooks/usePost";
import AuthService from "@/services/AuthService";
import AdoptionForm from "@/components/AdoptionForm";
import PostDetail from "@/components/PostDetail";
import BackButton from "@/components/shared/BackButton";

const PetDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const userID = AuthService.getUserId();

  const [api, contextHolder] = notification.useNotification();
  const [isOpenQuestion, setIsOpenQuestion] = useState<boolean>(false);

  const { postID } = useParams<{ postID: string }>();
  const { success, error, loading, post } = usePostAdoptionForm();

  if (!postID || !userID) {
    return null;
  }

  const handelSubmitForm = async (values: any) => {
    console.log({ values });
    console.log("suibmitting");
    await post(values, postID, userID);
    if (success) navigate("/");
    if (error) {
      api["error"]({
        message: error,
        description: "Something went wrong. Please try again later",
      });
    }
  };

  return (
    <>
      {contextHolder}

      <Typography.Title level={3}>รายละเอียดสัตว์เลี้ยง</Typography.Title>

      <PostDetail postId={Number(postID)} />

      {isOpenQuestion && (
        <div className="w-full md:w-3/4 md:ml-auto mt-4">
          <AdoptionForm onFinish={handelSubmitForm} />
        </div>
      )}

      {!isOpenQuestion && (
        <Flex gap={16} className="my-4 w-full justify-between md:justify-end">
          <BackButton />
          <Button type="primary" onClick={() => setIsOpenQuestion(true)}>
            รับเลี้ยงเลย
          </Button>
        </Flex>
      )}
    </>
  );
};

export default PetDetailsPage;
