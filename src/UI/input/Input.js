import React, { forwardRef } from 'react';

import styles from './Input.module.css';


const Input = forwardRef((props,ref) => {

  const classes = `${props.className} ${styles.input_class}`;

  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      ref={ref}
      required={props.required}
      onChange={props.onChange}
      onBlur={props.onBlur}
      className={classes}
      value={props?.value}
      id={props.id}
    />
  )
})

export default Input;