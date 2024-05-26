// components/InputText.tsx
import React from "react";
import styles from "@/components/shared/InputText.module.css";

interface InputTextProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const InputText: React.FC<InputTextProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={styles.input}
      disabled={disabled}
    />
  );
};

export default InputText;
