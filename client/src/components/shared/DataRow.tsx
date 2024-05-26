// components/DataRow.tsx
import React from "react";
import InputText from "./InputText";
import Button from "./Button";

interface DataRowProps {
  rowLabel: string;
  inputValue: string;
  onChange: (value: string) => void;
  onClickView: () => void;
  onClickEnd: () => void;
  onClickDelete: () => void;
}

const DataRow: React.FC<DataRowProps> = ({
  rowLabel,
  inputValue,
  onChange,
  onClickView,
  onClickEnd,
  onClickDelete,
}) => {
  return (
    <div className="my-2 flex items-center space-x-4">
      <InputText
        value={inputValue}
        onChange={onChange}
        placeholder={rowLabel}
        disabled={false}
      />
      <Button onClick={onClickView} color="#96c0dc">
        ดูผลจากการประกาศ
      </Button>
      <Button onClick={onClickEnd} color="#86d9aa">
        สิ้นสุดการประกาศ
      </Button>
      <Button onClick={onClickDelete} color="#e67d7d">
        ลบประกาศ
      </Button>
    </div>
  );
};

export default DataRow;
