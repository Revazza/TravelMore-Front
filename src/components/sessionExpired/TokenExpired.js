import React, { useRef } from "react";
import ReactDOM from "react-dom";
import classes from "./TokenExpired.module.css";
import { useDispatch } from "react-redux";
import jwt from "jwt-decode";
import {
  authSliceActions,
  notificationActions,
  Button,
  getCookie,
  useHistory,
  Input,
  useHttp,
} from "../../AppImports";

function TokenExpired() {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrop />,
        document.getElementById("backdrop-overlay")
      )}
      {ReactDOM.createPortal(
        <TokenExpiredOverlay />,
        document.getElementById("tokenExpired-overlay")
      )}
    </React.Fragment>
  );
}

const TokenExpiredOverlay = () => {
  const { sendRequest, error } = useHttp();
  const history = useHistory();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(authSliceActions.logout());
    dispatch(notificationActions.hideSessionExpired());
    history.push("/auth/login");
  };
  
  const handleExtendSession = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    if (password.length !== 0) {
      const username = jwt(getCookie('token')).Username;
      const response = await sendRequest(
        `https://localhost:7043/api/User/Login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName: username, password }),
        }
      );
      if (!response.errorMsg) {
        const token = jwt(response.data);
        dispatch(
          authSliceActions.login({ token: response.data, exp: token.exp })
        );
        dispatch(notificationActions.hideSessionExpired());
      }
    }
  };

  return (
    <form className={classes.wrapper} onSubmit={handleExtendSession}>
      <h2>Session Expired</h2>
      <div className={classes.password}>
        <Input type="password" placeholder="Password" ref={passwordRef} />
      </div>
      {error && <p className={classes.error}>Wrong Password</p>}
      <div className={classes.btn_wrapper}>
        <Button
          title="Sign Out"
          type='button'
          className={classes.logut_btn}
          onClick={handleSignOut}
        />
        <Button title="Extend Session" type='submit' />
      </div>
    </form>
  );
};

const BackDrop = () => {
  return <div className={classes.backdrop}></div>;
};

export default TokenExpired;
