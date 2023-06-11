import React from "react";
import {HiArrowUp} from "react-icons/hi2";

interface Props {
  direction: "up" | "down";
}

const ExpandArrows = ({ direction }: Props) => {
  return (
    <div className="flex flex-row text-gray-500">
      {[...Array(5)].map((_, i) => {
        return (
          <HiArrowUp
            key={i}
            className={`${
              direction === "down" && "rotate-180"
            } h-4 w-4 transition-all duration-500`}
          />
        );
      })}
    </div>
  );
};

export default ExpandArrows;
