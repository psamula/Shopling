import React from "react";
interface Props {
  className?: string;
  Icon?: React.ElementType;
  text: string;
  onClick?: () => void;
}

const bigButton = ({ Icon, text, onClick, className }: Props) => {
  return (
    <div
      className={`flex flex-1 cursor-pointer flex-row 
      rounded-md bg-gray-200 p-2.5 shadow-sm ${className}`}
      onClick={() => onClick && onClick()}
    >
      {Icon && <Icon className="h-6 w-6" />}
      <div className="ml-3 font-bold">{text}</div>
    </div>
  );
};

export default bigButton;
//isSelected && "!bg-[#007EFF]" hover:bg-[#00B1D9]
