import React from "react";
import EventIcon from "./EventIcon";
import { Event } from "../../types/types";

interface Props {
  event: Event;
  onClick: (event: Event) => void;
  className?: string;
}

export default function ListEvent({ event, onClick, className }: Props) {
  return (
    <button
      className={`flex cursor-pointer flex-row p-2 ${
        className ? className : ""
      }`}
      onClick={() => onClick(event)}
    >
      <EventIcon type={event.type} className="h-6 w-6" />
      <div className="ml-4">{event.title}</div>
    </button>
  );
}
