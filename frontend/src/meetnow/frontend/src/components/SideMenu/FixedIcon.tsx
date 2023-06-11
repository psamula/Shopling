import React from "react";
import { HiBars3 } from "react-icons/hi2";

interface Props {
  onClick: () => void;
}
const FixedIcon = ({ onClick }: Props) => {
  return (
    <div
      className={`fixed top-5 right-5 flex cursor-pointer justify-center
      rounded-full bg-violet-900 p-2 text-center text-white shadow-lg`}
      onClick={() => onClick && onClick()}
    >
      <HiBars3 className="h-8 w-8 " />
    </div>
  );
};

export default FixedIcon;
