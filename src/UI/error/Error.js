import React from "react";
import styles from "./Error.module.css";

function Error(props) {

  const classes = `${styles.wrapper} ${props.className}`;

  return (
    <div className={classes}>
      <div className={styles.error}>
        <label>We'll fix the problem soon</label>
        <img src="./assets/superman.png" />
      </div>
    </div>
  );
}

export default Error;
