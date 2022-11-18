import React, { useEffect, useState } from "react";
import classes from "./HotelMap.module.css";
import GoogleMapReact from "google-map-react";
import { useHttp } from "../imports";

const HotelMap = (props) => {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  useEffect(() => {
    if(props.hotel)
    {
      setLat(props.hotel.latitude);
      setLng(props.hotel.longitude);
    }
  }, [props.hotel]);

  return (
    <div className={classes.wrapper}>
      <GoogleMapReact center={{ lat, lng }} defaultZoom={16}>
        <MapPin lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  );
};

const MapPin = (props) => {
  return <img src="/assets/pin.png" alt="pin" />;
};

export default HotelMap;
