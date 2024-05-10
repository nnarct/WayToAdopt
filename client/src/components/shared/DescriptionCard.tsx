import React from "react";
import { Flex } from "antd";

const DescriptionCard = ({
  title,
  children,
  vertical,
  flexProps,
}: {
  title: string;
  children?: React.ReactNode;
  vertical?: boolean;
  flexProps?: React.HTMLAttributes<HTMLElement>;
}) => {
  return (
    <>
      <Flex vertical={vertical} {...flexProps}>
        <div className="text-primary font-bold">{title}</div>
        <div className="text-secondary">{children}</div>
      </Flex>
    </>
  );
};

export default DescriptionCard;
