import { SomethingWentWrong } from "@/components/shared/Result";
import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

const SubmitterInfo = (props: Props) => {
  const { postID, userID } = useParams();
  if (!postID || !userID) {
    return <SomethingWentWrong />;
  }
  return <div>{postID}{userID}</div>;
};

export default SubmitterInfo;
