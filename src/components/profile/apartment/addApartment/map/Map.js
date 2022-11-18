import React, { useState } from "react";
import {
  GoogleMapReact,
} from "../../../imports";

function Map(props) {

  const {lat,lng} = props;

  const handlePositionChange = (event) =>{
    let position = {
      lat:event.lat,
      lng:event.lng,
    }
    props.onPositionChange(position);
  }
  return (
    <GoogleMapReact
        defaultCenter={{ lat, lng }}
        defaultZoom={16}
        onClick={handlePositionChange}
      >
        <MapPin lat={lat} lng={lng} />
      </GoogleMapReact>
  );
}

const MapPin = (props) => {
  return <img src="/assets/pin.png" alt="pin" />;
};

export default Map;
