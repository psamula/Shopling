import React from "react";
import { Event } from "../../types/types";
import { BsFillPersonFill } from "react-icons/bs";

interface Props {
  event: Event;
}

const FeedItem = ({ event }: Props) => {
  return (
    <div className="mx-2 xs:mx-20 md:mx-8">
      <header className="flex items-center p-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-200">
          <BsFillPersonFill className="h-6 w-6" />
        </div>
        <div className="ml-2 font-bold">{event.title}</div>
      </header>
      <div>
        <img src={`/uploads/${event.image}`} alt="" />
      </div>
      <footer className="p-2">{event.description}</footer>
    </div>
  );
};

export default FeedItem;
