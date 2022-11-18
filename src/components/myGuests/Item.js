import React from "react";
import classes from "./Item.module.css";
import {
  Card,
  Button,
} from "./imports";

function Item(props) {
  const guest = props.guest;
  const startDate = new Date(guest?.hostFrom).toISOString().split("T")[0];
  const endDate = new Date(guest?.hostTo).toISOString().split("T")[0];

  const handleConfigureGuestStatus = async (choice) => {
    const changedGuest = {
      ...guest,
      status:choice,
    }
    props.onChangeStatus(changedGuest);
  };
  return (
    <Card className={classes.wrapper}>
      <div className={classes.img_wrapper}>
        <img
          src="/assets/Rectangle.png"
          alt="user profile"
        />
      </div>
      <section className={classes.user_request}>
        <label>
          {guest?.firstName} {guest.lastName}
        </label>
        <div className={classes.request_wrapper}>
          <div className={classes.checkin_out}>
            <p>
              <span>From:</span> {startDate}
            </p>
            <p id={classes.secondP}>
              <span>To:</span> {endDate}
            </p>
          </div>
          {guest?.status === 1 && (
            <div className={classes.accepted}>
              <StatusButton title="Accepted" />
            </div>
          )}
          {guest?.status === 2 && (
            <div className={classes.declined}>
              <StatusButton title="Declined" />
            </div>
          )}
          {guest?.status === 3 && (
            <div className={classes.not_possible}>
              <StatusButton title="Not Possible" />
            </div>
          )}
          {guest?.status === 4 && (
            <div className={classes.btn_wrapper}>
              <div className={classes.btns}>
                <Button
                  type="button"
                  title="Accept"
                  onClick={() => handleConfigureGuestStatus(1)}
                />
              </div>
              <div className={classes.btns}>
                <Button
                  type="button"
                  title="Decline"
                  className={classes.decline_btn}
                  onClick={() => handleConfigureGuestStatus(2)}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </Card>
  );
}
export default Item;

const StatusButton = (props) => {
  return (
    <React.Fragment>
      <Button
        type="button"
        title={props.title}
        className={props.className}
      ></Button>
    </React.Fragment>
  );
};
