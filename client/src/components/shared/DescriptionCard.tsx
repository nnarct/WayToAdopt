import React from "react";
import { Space } from "antd";
import { Property } from "csstype";

interface DescriptionCardProps {
  title: string;
  children: React.ReactNode;
  justify?: Property.JustifyContent;
  align?: Property.AlignItems;
  vertical?: boolean;
}

const DescriptionCard = ({
  title,
  children,
  justify,
  align,
}: DescriptionCardProps) => {
  return (
    <Space direction="vertical" style={{ padding: '4px 8px' }}>
      <div style={{ fontWeight: 'bold', color: 'black' }}>{title}</div>
      <div style={{ color: 'black' }}>{children}</div>
    </Space>
  );
};

export default DescriptionCard;
