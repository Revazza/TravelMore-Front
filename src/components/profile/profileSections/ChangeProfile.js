import React from "react";
import classes from "./ChangeProfile.module.css";

import ChangeInformation from "./changeInformation/ChangeInformation";

import {
  emailInput,
  usernameInput,
  passwordInput,
  useHttp,
  getCookie,
  notificationActions,
  useDispatch,
} from "../imports";
import jwt from "jwt-decode";
import url from "../../../Url";
function ChangeProfile(props) {
  const dispatch = useDispatch();
  const { sendRequest } = useHttp();

  const handleUpdateInfo = async (newInfo) => {
    let key = Object.keys(newInfo)[0];
    let value = newInfo[key];
    if (key !== "password") {
      value = value.toLowerCase();
    }

    const userID = jwt(getCookie("token")).userID;
    const requestBody = {
      userId: userID,
      updateProperty:key,
      newValue:value,
    };
    const response = await sendRequest(
      `${url}/Profile/change-information`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );
    if (response.errorMsg)
      dispatch(
        notificationActions.showNotification({
          type: "error",
          msg: response.data,
        })
      );
    else {
      dispatch(
        notificationActions.showNotification({
          type: "success",
          msg: response.data,
        })
      );
      props.onUserDataUpdate({changed:key,value});
    }
  };

  const smallWindow = window.innerWidth <= 920;
  const showSettings = smallWindow && props.showSettings;
  return (
    <div
      className={classes.wrapper}
      id={showSettings ? classes.showSettings : ""}
    >
      <div className={classes.form_wrapper}>
        <ChangeInformation
          title="Change Email"
          updateInfo={emailInput}
          onUpdateInfo={handleUpdateInfo}
        />
        <ChangeInformation
          title="Change Username"
          updateInfo={usernameInput}
          onUpdateInfo={handleUpdateInfo}
        />
        <ChangeInformation
          title="Change Password"
          updateInfo={passwordInput}
          onUpdateInfo={handleUpdateInfo}
        />
      </div>
    </div>
  );
}

export default ChangeProfile;
