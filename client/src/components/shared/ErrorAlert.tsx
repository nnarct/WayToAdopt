import { Alert } from "antd";
import React from "react";

type Props = {
  text: string;
};

const ErrorAlert: React.FC<Props> = ({ text }) => {
  return text.length > 0 ? <Alert type="error" message={text} /> : null;
};

export default ErrorAlert;
