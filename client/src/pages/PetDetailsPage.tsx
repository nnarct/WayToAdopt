import { useState } from "react";
import {  useParams } from "react-router-dom";
import { Button, Flex,  Typography } from "antd";

import AdoptionForm from "@/components/AdoptionForm";
import PostDetail from "@/components/PostDetail";
import BackButton from "@/components/shared/BackButton";
import { SomethingWentWrong } from "@/components/shared/Result";

const PetDetailsPage: React.FC = () => {
const [isOpenQuestion, setIsOpenQuestion] = useState<boolean>(false)

  const { postID } = useParams<{ postID: string }>();
  // const { success, error, loading, post } = usePostAdoptionForm();
  
  if (!postID ) {
    return <SomethingWentWrong/>;
  }

  // const handelSubmitForm = async (values: any) => {
    // console.log({ values });
    // console.log("suibmitting");
    // await post(values, postID, userID);
    // if (success) navigate("/");
    // if (error) {
    //   notification.error({
    //     message: error,
    //     description: "Something went wrong. Please try again later",
    //   });
    // }
  // };

  return (
    <>

      <Typography.Title level={3}>รายละเอียดสัตว์เลี้ยง</Typography.Title>

      <PostDetail postID={postID} />

      {isOpenQuestion && (
        <div className="w-full md:w-3/4 md:ml-auto mt-4">
          <AdoptionForm onFinish={()=>{}} />
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
