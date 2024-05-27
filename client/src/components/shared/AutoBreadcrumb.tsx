import { PATH_NAMES } from "@/assets/translate";
import { Breadcrumb, BreadcrumbProps } from "antd";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const AutoBreadcrumb = (props: BreadcrumbProps) => {
  const location = useLocation();
  const pathname = location.pathname;
  const pathnames = pathname.split("/");
  const paramValues = Object.values(useParams());
  // const segments = pathname
  //   .split("/")
  //   .filter((segment) => segment !== "" && !paramValues.includes(segment));

  const s: { path: string; param?: string }[] = [];
  for (let i = 1; i < pathnames.length; i++) {
    if (paramValues.includes(pathnames[i + 1])) {
      s.push({ path: pathnames[i], param: pathnames[++i] });
    } else {
      s.push({ path: pathnames[i] });
    }
  }
  const items = s.map((segment, index) => {
    const locationPaths: string[] = [];
    const tempPaths = s.slice(0, index + 1);
    tempPaths.forEach((p) => {
      locationPaths.push(p.path);
      if (p.param !== undefined) {
        locationPaths.push(p.param);
      }
    });
    const url = `/${locationPaths.join("/")}`;
    if (index === s.length - 1) {
      return {
        title: PATH_NAMES[segment.path],
      };
    }
    return {
      title: <Link to={url}>{PATH_NAMES[segment.path]}</Link>,
    };
  });

  items.unshift({ title: <Link to="/">หน้าหลัก</Link> });

  return <Breadcrumb items={items} {...props} />;
};

export default AutoBreadcrumb;
