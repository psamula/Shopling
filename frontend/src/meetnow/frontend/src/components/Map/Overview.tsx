import React from "react";

interface Props {
  title: string;
  description: string;
  image: string;
  friends: string;
}

export default function Overview({
  title,
  description,
  image,
  friends,
}: Props) {
  return (
    <div className="flex -translate-x-1/2 -translate-y-full flex-col items-center">
      <div className="flex w-[12rem] flex-col rounded-xl bg-white p-1 shadow-2xl">
        {" "}
        <div className="flex items-center justify-center px-2 pt-1 text-center text-lg font-bold">
          {title}
        </div>
        <div className="font-bolder  flex items-center justify-center px-3 py-1 text-center">
          {description}
        </div>
        <div className="-mx-1 py-1">
          <img src={image} alt="" />
        </div>
        <div className="font-bolder m-2 flex cursor-pointer flex-row justify-center rounded bg-blue-600 p-1 text-center text-white">
          JOIN
        </div>
        <div className="mb-2 flex flex-col px-2 text-center text-xs">
          <div className="font-bold ">Your friends are here:</div>
          <div className="text-center text-blue-400">{friends}</div>
        </div>
      </div>
      <div className="border-x-[12px] border-b-0 border-t-[16px] border-solid border-x-transparent border-t-white"></div>
    </div>
  );
}
