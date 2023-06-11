import React from "react";
import {
  HiStar
} from "react-icons/hi2";
import { MdEmojiPeople } from "react-icons/md";

interface Props {
  type: string;
  className?: string;
}

const EventIcon = ({ type, className }: Props) => {
  switch (type) {
    case "event":
      return <MdEmojiPeople className={className} />;
    case "party":
      return <HiStar className={className} />;
    default:
      return <HiStar className={className} />;
  }
};

export default EventIcon;
