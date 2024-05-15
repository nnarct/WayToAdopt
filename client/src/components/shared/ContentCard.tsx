import React from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { PATH_NAMES } from "@/assets/translate";
import AutoBreadcrumb from "./AutoBreadcrumb";

const ContentCard = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <>
      <AutoBreadcrumb className="pb-6" />
      {children}
    </>
  );
};

export default ContentCard;
