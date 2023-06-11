import React from "react";
interface Props {
  className?: string;
  Icon?: React.ElementType;
  text: string;
  onClick?: () => void;
}
const Button = ({ className, Icon, text, onClick }: Props) => {
  return (
    <div
      className={`flex cursor-pointer flex-row p-2 ${
        className ? className : ""
      }`}
      onClick={() => onClick && onClick()}
    >
      {Icon && <Icon className="h-6 w-6" />}
      <div className="ml-4">{text}</div>
    </div>
  );
};

export default Button;
