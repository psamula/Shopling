import React from "react";
import {
  HiMagnifyingGlass
} from "react-icons/hi2";
import { useEvents } from "../../hooks/EventsDataProvider";

interface Props {
  className?: string;
}

const SearchBar = ({ className }: Props) => {
  const { searchQuery, setSearchQuery } = useEvents();
  return (
    <div className={`w-full p-2 ${className ? className : ""}`}>
      <div className={`relative w-full`}>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <HiMagnifyingGlass className="h-6 w-6 " />
        </span>
        <input
          type="text"
          className="font-bolder w-full rounded-md bg-gray-200 py-2.5 pl-10 shadow-sm focus:outline-none"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
