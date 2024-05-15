import { PATH_NAMES } from "@/assets/translate";
import { Breadcrumb, BreadcrumbProps } from "antd";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const AutoBreadcrumb = (props: BreadcrumbProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  const paramValues = Object.values(useParams());
  const segments = pathname
    .split("/")
    .filter((segment) => segment !== "" && !paramValues.includes(segment));

  const items = segments.map((segment, index) => {
    const url = `/${segments.slice(0, index + 1).join("/")}`;
    if (index === segments.length - 1) {
      return {
        title: PATH_NAMES[segment],
      };
    }
    return {
      title: <Link to={url}>{PATH_NAMES[segment]}</Link>,
    };
  });

  items.unshift({ title: <Link to="/">หน้าหลัก</Link> });

  return <Breadcrumb items={items} {...props} />;
};

export default AutoBreadcrumb;
