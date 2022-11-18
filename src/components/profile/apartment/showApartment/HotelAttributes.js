import React from "react";
import classes from "./HotelAttributes.module.css";

function HotelAttributes(props) {
  return (
    <div className={classes.attributes} id={props.id}>
      <p className={classes.attributesP}>{props.attribute}</p>
      <p className={classes.attributesSecondP}>{props.atrInfo}</p>
    </div>
  );
}

export default HotelAttributes;
