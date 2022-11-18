import React, { useEffect, useState } from "react";
import styles from "./Notification.module.css";
import { useSelector,useDispatch } from "react-redux";
import notificationActions from '../../store/notificationSlice';

const Notification = (props) => {
  const [notificationID, setNotificationID] = useState('');
  const dispatch = useDispatch();
  const {type,msg} = useSelector((state) =>state.notification);

  useEffect( () =>{
    setTimeout(() => {
      setNotificationID(`${styles.hideNotification}`);
      setTimeout(() => {
        dispatch(notificationActions.actions.hideNotification());
      }, 2000);
    }, 6000);
  },[]);

  let classes = `${styles.wrapper} ${props.className}`;
  if (type === 'error')
   classes += `${styles.wrapper} ${props.className} ${styles.error}`;
  else if (type === 'success')
   classes += `${styles.wrapper} ${props.className} ${styles.success}`;
  else {
    //Warning
    classes += `${styles.warning}`;
  }
  return (
    <div className={classes} id={notificationID}>
      <p>{msg}</p>
    </div>
  );
};
export default Notification;
