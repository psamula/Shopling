import React from "react";
import ListEvent from "./EventListItem";
import { Event } from "../../types/types";
import { useEvents } from "../../hooks/EventsDataProvider";
import { useFocus } from "../../hooks/EventsFocusProvider";
import Spinner from "../UI/Spinner";

interface Props {
  className?: string;
  onClick: () => void;
}

const EventsList = ({ className, onClick }: Props) => {
  const { events, loading } = useEvents();
  const { focusedEvent, setFocusedEvent } = useFocus();

  const isFocusedOn = (event: Event) => {
    if (!focusedEvent) return false;
    return event.id === focusedEvent.id;
  };
  const toggleFocus = (event: Event) => {
    if (!focusedEvent) setFocusedEvent(event);
    else if (focusedEvent.id !== event.id) setFocusedEvent(event);
    else setFocusedEvent(null);
  };
  return (
    <div
      className={`flex flex-grow flex-col p-2 ${className ? className : ""}`}
    >
      {loading && <Spinner />}
      {!loading &&
        events.map((event) => {
          return (
            <ListEvent
              key={event.id}
              event={event}
              onClick={() => {
                toggleFocus(event);
                onClick();
              }}
              className={`${isFocusedOn(event) ? "bg-gray-200" : ""}`}
            />
          );
        })}
    </div>
  );
};

export default EventsList;
