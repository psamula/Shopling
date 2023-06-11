import React from "react";
import { useEffect, useState } from "react";

interface Props {
  active: boolean;
  onClick: () => void;
}

const Background = ({ active, onClick }: Props) => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!active) setTimeout(() => setHidden(true), 250);
    else setHidden(false);
  }, [active]);

  return (
    <div
      className={`${active ? "bg-black/70" : "bg-black/0"}
      ${hidden ? "h-0 w-0" : "right-0 bottom-0"}
      fixed left-0 top-0  transition-colors duration-300`}
      onClick={() => onClick && onClick()}
    ></div>
  );
};

export default Background;
