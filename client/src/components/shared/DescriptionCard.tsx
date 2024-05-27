import React from "react";
import { Flex } from "antd";
import { Property } from "csstype";

const DescriptionCard = ({
  title,
  children,
  vertical,
  flexProps,
  justify,
  align,
  className,
  gap,
}: {
  title: string;
  children?: React.ReactNode;
  vertical?: boolean;
  flexProps?: React.HTMLAttributes<HTMLElement>;
  justify?: Property.JustifyContent;
  align?: Property.AlignItems;
  className?: string;
  gap?: string | number;
}) => {
  return (
    <>
      <Flex
        vertical={vertical}
        {...flexProps}
        className={className}
        justify={justify}
        align={align}
        gap={gap}
      >
        <div className="text-primary font-black">{title}</div>
        <div className="text-secondary">{children}</div>
      </Flex>
    </>
  );
};

export default DescriptionCard;
