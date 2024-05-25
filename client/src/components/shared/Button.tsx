// components/BlueButton.tsx
import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  color?: string;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  color = "#007bff",
  outline = false,
}) => {
  const buttonClass = outline
    ? `${styles.button} ${styles.outline}`
    : `${styles.button} ${styles.primary}`;
  const buttonStyle = outline
    ? { borderColor: color, color: color }
    : { backgroundColor: color };
  return (
    <button
      className={buttonClass}
      onClick={onClick}
      style={buttonStyle}
    >
      {children}
    </button>
  );
};

export default Button;
