import React, { forwardRef } from "react";

import styles from "./Card.module.css";

const Card = forwardRef((props,ref) => {
  const classes = `${styles.wrapper} ${props.className}`;

  return (
    <div className={classes} onClick={props?.onClick} ref={ref}>
      {props.children}
    </div>
  );
});

export default Card;
