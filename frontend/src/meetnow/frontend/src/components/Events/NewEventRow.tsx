import React, { useState } from "react";
import { HiCamera} from "react-icons/hi2";
import { BiCalendarEvent } from "react-icons/bi";
import BigButton from "../UI/BigButton";
import CameraComponent from "../Camera/CameraComponent";

interface Props {
  className?: string;
  onTakePhoto: () => void;
  onUploadPhoto: () => void;
}


const NewEventRow = ({ className, onTakePhoto, onUploadPhoto }: Props) => {
  return (
    <div
      className={`flex flex-row space-x-2 p-2 ${className ? className : ""}`}
    >
      <BigButton
        Icon={HiCamera}
        className="!bg-[#008B7C] !text-white hover:!bg-[#00C2B0]"
        text="Take a photo"
        onClick={() => onTakePhoto()}
      />
      <BigButton
        Icon={BiCalendarEvent}
        className="!bg-[#7209B7] !text-white hover:!bg-[#9070A1]"
        text="Create event"
        onClick={() => onUploadPhoto()}
      />
    </div>
  );
};

export default NewEventRow;
