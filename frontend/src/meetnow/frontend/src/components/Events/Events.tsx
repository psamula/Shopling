import React from "react";

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import EventsList from "../EventsList/EventsList";
import FiltersRow from "./FIltersRow";
import NewEventRow from "./NewEventRow";
import Menu from "../UI/Menu";
import { useEvents } from "../../hooks/EventsDataProvider";
import CameraComponent from "../Camera/CameraComponent";
interface Props {
  showCreateEventPopup: () => void;
}

export default function Events({ showCreateEventPopup }: Props) {
  const [fullScreen, setFullScreen] = useState(false);
  const { collection, setCollection } = useEvents();
  const [showCamera, setShowCamera] = useState(false);

  const onFullScreenChangeHandler = () => {
    setFullScreen((prev) => !prev);
  };

  const handleTakePhoto = () => {
    setShowCamera(true);
  };
  
  useEffect(() => {
    if (collection !== "events") {
      setCollection("events");
    }
  }, [collection, setCollection]);

  return (
    <div>
      <Menu
        fullScreen={fullScreen}
        onFullScreenChange={onFullScreenChangeHandler}
      >
        <SearchBar className={`order-2 md:!block ${!fullScreen && "hidden"}`} />

        <NewEventRow
          className={`${fullScreen && "!order-5"} order-3 md:!order-5`}
          onTakePhoto={() => {handleTakePhoto()}}
          onUploadPhoto={() => {
            showCreateEventPopup();
          }}
        />

        <FiltersRow
          className={`${
            fullScreen && "!order-3"
          } order-4 !pb-2 !pt-0 md:!order-3`}
        />

        <EventsList
          className={`${fullScreen && "!order-4"} order-5  md:!order-4`}
          onClick={() => {
            setFullScreen(false);
          }}
        />
      </Menu>
      {showCamera ? (
          <div className="fixed top-0 left-0 right-0 bottom-0 z-50" >
          <CameraComponent/>
          <button
    className="absolute top-0 right-0 m-4 p-2  text-white rounded-full"
    onClick={() => setShowCamera(false)}
  >
    X
  </button>
          </div>
        ) : (<></>)}
    </div>
  );
}
