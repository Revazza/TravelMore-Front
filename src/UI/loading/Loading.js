import React from "react";
import styles from "./Loading.module.css";

const Loading = (props) => {
  const classes = `${styles.wrapper} ${props.className}`;
  return (
    <div className={classes}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loading;
