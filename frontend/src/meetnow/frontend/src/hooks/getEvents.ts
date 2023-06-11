import geoJson from "../components/places.json";
import { Event } from "../types/types";

const filterEventsByType = (eventTypes: string[], array: Array<Event>) => {
  return array.filter((item: Event) => {
    return eventTypes.includes(item.type);
  });
};
const filteredEventsByName = (query: string, array: Array<Event>) => {
  return array.filter((item: Event) => {
    return item.title.toLowerCase().includes(query.toLowerCase());
  });
};

const getEvents = (
  typeQuery: string,
  nameQuery: string,
  collection: string
): Event[] => {
  let filteredEvents: Array<Event>;
  if (collection === "memories") filteredEvents = geoJson.memories;
  else filteredEvents = geoJson.events;
  filteredEvents = filteredEventsByName(nameQuery, filteredEvents);
  if (typeQuery === "friendsActivity") {
    filteredEvents = filterEventsByType(["sport", "party"], filteredEvents);
  } else if (typeQuery === "publicEvents") {
    filteredEvents = filterEventsByType(["event"], filteredEvents);
  }

  return filteredEvents;
};

export default getEvents;
