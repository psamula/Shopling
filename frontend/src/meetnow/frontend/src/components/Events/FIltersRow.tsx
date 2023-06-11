import React from "react";
import {
  HiStar
} from "react-icons/hi2";
import { MdEmojiPeople } from "react-icons/md";
import BigButton from "../UI/BigButton";
import { useEvents } from "../../hooks/EventsDataProvider";

interface Props {
  className?: string;
}

const FiltersRow = ({ className }: Props) => {
  const { typeQuery, setTypeQuery } = useEvents();
  return (
    <div
      className={`flex flex-row space-x-2 p-2 ${className ? className : ""}`}
    >
      <BigButton
        className={`${
          typeQuery === "friendsActivity" && "!bg-[#007EFF]"
        } hover:bg-[#00B1D9]`}
        Icon={MdEmojiPeople}
        text="Friends"
        onClick={() =>
          setTypeQuery(
            typeQuery === "friendsActivity" ? "all" : "friendsActivity"
          )
        }
      />
      <BigButton
        className={`${
          typeQuery === "publicEvents" && "!bg-[#007EFF]"
        } hover:bg-[#00B1D9]`}
        Icon={HiStar}
        text="Events"
        onClick={() =>
          setTypeQuery(typeQuery === "publicEvents" ? "all" : "publicEvents")
        }
      />
    </div>
  );
};

export default FiltersRow;
