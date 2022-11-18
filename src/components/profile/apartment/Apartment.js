import React, { useState, Children, useEffect } from "react";
import classes from "./Apartment.module.css";
import Card from "../../../UI/Card";
function Apartment(props) {
  const [showApartment, setShowApartment] = useState(false);
  const [hideApartment, setHideApartment] = useState(true);

  const toggleAppartment = () => {
    if (showApartment) {
      setHideApartment(true);
      setTimeout(() => {
        setShowApartment(false);
      }, 300);
    } else {
      setHideApartment(false);
      setShowApartment(true);
    }
  };

  const childrenWithProps = Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        hideApartment,
      });
    }
    return child;
  });

  return (
    <Card className={classes.wrapper}>
      <div className={classes.wrap_section}>
        <div className={classes.show_apartment} onClick={toggleAppartment}>
          <div className={classes.title}>
            <label>{props.label}</label>
          </div>
          <div className={classes.arrow}>
            <img
              src="/assets/list_arrow.png"
              alt="Add Apartment"
              style={{ transform: showApartment && "rotate(-90deg)" }}
            />
          </div>
        </div>
        {showApartment && <hr></hr>}
        {showApartment && childrenWithProps}
      </div>
    </Card>
  );
}

export default Apartment;
