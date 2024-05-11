import React from "react";
import { Flex } from "antd";
import { Property  } from "csstype";

const DescriptionCard = ({
  title,
  children,
  vertical,
  flexProps,
  justify,
  align,
}: {
  title: string;
  children?: React.ReactNode;
  vertical?: boolean;
  flexProps?: React.HTMLAttributes<HTMLElement>;
  justify?: Property.JustifyContent;
  align?: Property.AlignItems;
}) => {
  return (
    <>
      <Flex vertical={vertical} {...flexProps} justify={justify} align={align}>
        <div className="text-primary font-black">{title}</div>
        <div className="text-secondary">{children}</div>
      </Flex>
    </>
  );
};

export default DescriptionCard;
