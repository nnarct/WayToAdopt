import React from "react";
import { twMerge } from "tailwind-merge";
import { Breadcrumb, Typography } from "antd";

interface PageLayoutProps {
  className?: string;
  breadcrumbItems?: { title: string; href?: string }[];
  breadcrumbProps?: any; // สามารถกำหนดประเภทเพิ่มเติมตามต้องการ
  title?: string;
  titleProps?: any; // สามารถกำหนดประเภทเพิ่มเติมตามต้องการ
  footer?: React.ReactNode;
  children?: React.ReactNode;
  props?: any; // สามารถกำหนดประเภทเพิ่มเติมตามต้องการ
}

const PageLayout = ({
  className,
  breadcrumbItems,
  breadcrumbProps,
  title,
  titleProps,
  footer,
  children,
  props,
}: PageLayoutProps) => {
  return (
    <>
      <div
        className={twMerge("container mx-auto px-6 min-h-nonav", className)}
        {...props}
      >
        {breadcrumbItems && breadcrumbItems.length > 0 && (
          <Breadcrumb
            items={breadcrumbItems}
            className={twMerge("pb-8", breadcrumbProps?.className)}
            {...breadcrumbProps}
          />
        )}
        {title && (
          <Typography.Title level={2} {...titleProps}>
            {title}
          </Typography.Title>
        )}
        {children}
      </div>
      
    </>
  );
};

export default PageLayout;
