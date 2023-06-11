import React, { useEffect, useMemo, useState } from "react";
import { Event } from "../types/types";
import { useEvents } from "./EventsDataProvider";

interface EventsFocusContextType {
  focusedEvent: Event | null;
  setFocusedEvent: (event: Event | null) => void;
}

const EventsFocusContext = React.createContext<EventsFocusContextType>(
  {} as EventsFocusContextType
);

interface Props {
  children: React.ReactNode;
}

const EventsFocusProvider = ({ children }: Props) => {
  const [focusedEvent, setFocusedEvent] = useState<Event | null>(null);
  const { events } = useEvents();

  useEffect(() => {
    if (focusedEvent) {
      const event = events.find((event) => event.id === focusedEvent.id);
      if (event) {
        setFocusedEvent(event);
      } else {
        setFocusedEvent(null);
      }
    }
  }, [events, focusedEvent]);

  const value = useMemo(() => {
    const eventsData = {} as EventsFocusContextType;
    eventsData.focusedEvent = focusedEvent;
    eventsData.setFocusedEvent = setFocusedEvent;
    return eventsData;
  }, [focusedEvent]);

  return (
    <EventsFocusContext.Provider value={value}>
      {children}
    </EventsFocusContext.Provider>
  );
};

export { EventsFocusProvider };
export const useFocus = () => React.useContext(EventsFocusContext);
