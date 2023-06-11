import React, { useEffect, useState, useRef } from "react";
import { Map, Overlay, Point, Bounds, Marker} from "pigeon-maps";
import mapboxgl, { MapMouseEvent } from 'mapbox-gl'; 
import { useFocus } from "../../hooks/EventsFocusProvider";
import { useEvents } from "../../hooks/EventsDataProvider";




//const mapStyle = "mapbox://styles/mapbox/navigation-day-v1";

const defaultCenter: Point = [50.04, 19.94];
const defaultZoom: number = 14;

const provider = (x: any, y: any, z: any, dpr: any) => {
  mapboxgl.accessToken = "pk.eyJ1Ijoicml0aXQiLCJhIjoiY2xmb2p0NWtrMHdkMzQ0bnJwcTZlbXh5cSJ9.DGdh4-6fvKJFvt2Pp5ZMNg";
  return `https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/256/${z}/${x}/${y}@2x?access_token=${mapboxgl.accessToken}`;
};

type Viewport = {
  width: number;
  height: number;
};

const latLngPixelOffset = (
  latLng: Point,
  bounds: Bounds,
  viewport: Viewport,
  offset: { x: number; y: number }
): Point => {
  const latHeight = (bounds.ne[0] - bounds.sw[0]) / viewport.height;
  const lngWidth = (bounds.ne[1] - bounds.sw[1]) / viewport.width;
  return [latHeight * offset.y + latLng[0], lngWidth * offset.x + latLng[1]];
};

export default function MyMap() {
  const { events } = useEvents();
  const { focusedEvent, setFocusedEvent } = useFocus();
  const [center, setCenter] = useState<Point>(defaultCenter);
  const [bounds, setBounds] = useState<Bounds>();

  const [viewport, setVievport] = useState<Viewport>({ height: 0, width: 0 });
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref || !ref.current) return;
    setVievport({
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
    });
  }, [ref]);

  const onBoundariesChangeHandler = ({
    center,
    zoom,
    bounds,
    initial,
  }: {
    center: [number, number];
    bounds: Bounds;
    zoom: number;
    initial: boolean;
  }) => {
    setCenter(center);
    setBounds(bounds);
  };

  useEffect(() => {
    if (!focusedEvent) return;
    let flyTo = [
      focusedEvent.coordinates[1],
      focusedEvent.coordinates[0],
    ] as Point;
    if (bounds) {
      flyTo = latLngPixelOffset(flyTo, bounds, viewport, { x: 0, y: 150 });
    }
    setCenter(flyTo);
  }, [focusedEvent]);
  const handleMapEvents = (e: MapMouseEvent) =>{
    e.preventDefault();
  }


  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-[30vh] md:bottom-0"
      ref={ref}
    >
      
      <Map
        provider={provider}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        center={center}
        onBoundsChanged={onBoundariesChangeHandler}
        mouseEvents={false}
      >
      <Marker anchor={defaultCenter} payload={1}></Marker>
      </Map>
      
      <div className="bg-white">
      </div>
    </div>
  );
}
