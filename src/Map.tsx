import React from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import "./index.css";
interface Props {
  lat: number;
  lng: number;
}
function Map(props: Props) {
  const defaulMapOptions = {
    disableDefaultUI: true,
    keyboardShortcuts: false,
  };
  return (
    <>
      <GoogleMap
        zoom={10}
        center={{ lat: props.lat, lng: props.lng }}
        mapContainerClassName="map"
        options={defaulMapOptions}
      >
        <MarkerF position={{ lat: props.lat, lng: props.lng }} />
      </GoogleMap>
    </>
  );
}

export default Map;
