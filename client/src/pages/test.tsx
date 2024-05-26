import React, { useState } from "react";
import { Typography } from "antd";
import DataRow from "@/components/shared/DataRow";
import Button from "@/components/shared/Button";

const Test: React.FC = () => {
  const [inputValueA, setInputValueA] = useState("");
  const [inputValueB, setInputValueB] = useState("");
  const [inputValueC, setInputValueC] = useState("");
  const handleInputChangeA = (value: string) => {
    setInputValueA(value);
  };
  const handleInputChangeB = (value: string) => {
    setInputValueB(value);
  };
  const handleInputChangeC = (value: string) => {
    setInputValueC(value);
  };
  const handleClickView = () => {
    alert("View clicked");
  };

  const handleClickEnd = () => {
    alert("End clicked");
  };

  const handleClickDelete = () => {
    alert("Delete clicked");
  };

  const handleClick = () => {
    alert(`Bottom Clicked!`);
  };
  // Todo
  // get user's first [name]
  // get all [ID] post
  return (
    <>
      <Typography.Title className="!text-primary">
        รวมประกาศที่สร้าง
      </Typography.Title>
      <DataRow
        rowLabel="Row A"
        inputValue={inputValueA}
        onChange={handleInputChangeA}
        onClickView={handleClickView}
        onClickEnd={handleClickEnd}
        onClickDelete={handleClickDelete}
      />
      <DataRow
        rowLabel="Row B"
        inputValue={inputValueB}
        onChange={handleInputChangeB}
        onClickView={handleClickView}
        onClickEnd={handleClickEnd}
        onClickDelete={handleClickDelete}
      />
      <DataRow
        rowLabel="Row C"
        inputValue={inputValueC}
        onChange={handleInputChangeC}
        onClickView={handleClickView}
        onClickEnd={handleClickEnd}
        onClickDelete={handleClickDelete}
      />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <Button onClick={handleClick} color="#3d6683">
          สร้างประกาศใหม่
        </Button>
      </div>
    </>
  );
};

export default Test;
