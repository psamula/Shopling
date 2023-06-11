import React from "react";
import ExpandArrows from "./ExpandArrows";

interface Props {
  fullScreen: boolean;
  onFullScreenChange: () => void;
  children: React.ReactNode;
}

const Menu = ({ children, fullScreen, onFullScreenChange }: Props) => {
  return (
    <div
      className={`${
        fullScreen && " !bottom-0 !z-30 !rounded-none"
      } fixed -bottom-[65vh] left-0 right-0 z-10 flex h-full
        flex-col rounded-t-3xl bg-white p-2 shadow-2xl transition-all
        duration-500 md:top-0 md:right-auto md:h-full md:w-[22rem] md:rounded-none
        md:transition-none`}
    >
      <div
        className="flex cursor-pointer flex-row justify-center md:hidden"
        onClick={onFullScreenChange}
      >
        <ExpandArrows direction={fullScreen ? "down" : "up"} />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Menu;
