import React from "react";
import { HiStar } from "react-icons/hi2";
import { MdEmojiPeople } from "react-icons/md";

interface CustomIconProps {
  type: string;
  className: string;
}

const CustomIcon = ({ type, className }: CustomIconProps) => {
  switch (type) {
    case "event":
      return <MdEmojiPeople className={className} />;
    case "party":
      return <HiStar className={className} />;
    default:
      return <HiStar className={className} />;
  }
};

interface CustomMarkerProps {
  type: string;
  onClick?: () => void;
}
export default function CustomMarker({ type, onClick }: CustomMarkerProps) {
  const onClickHandler = () => {
    if (onClick) onClick();
  };
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-xl border bg-white p-1 shadow-2xl shadow-black"
      onClick={onClickHandler}
    >
      <CustomIcon type={type} className="h-5 w-5" />
    </div>
  );
}
