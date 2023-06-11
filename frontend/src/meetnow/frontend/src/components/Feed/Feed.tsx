import React from "react";
import { useEvents } from "../../hooks/EventsDataProvider";
import FeedItem from "./FeedItem";

const Feed = () => {
  const { events, loading } = useEvents();
  return (
    <div className="flex flex-col gap-2 p-2">
      {events.map((event) => {
        return <FeedItem key={event.id} event={event} />;
      })}
    </div>
  );
};
export default Feed;
