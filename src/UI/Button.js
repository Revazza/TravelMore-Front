import React from "react";
import styles from "./Button.module.css";

function Button(props) {
  const classes = `${styles.my_btn} ${props.className}`;

  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={classes}
      disabled={props.disabled}
      id={props.id}
    >{props.title}</button>
  );
}

export default Button;
