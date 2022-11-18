import React from "react";
import { authSliceActions, notificationActions } from "../store/store";
import jwt from "jwt-decode";
import { useCallback } from "react";
import {
  Register,
  Login,
  useHttp,
  useDispatch,
  useHistory,
  Route,
  Loading,
} from "./imports";
import url from '../Url';

function Authentication() {
  const dispatch = useDispatch();
  const { isLoading, sendRequest } = useHttp();
  const history = useHistory();
  const handleNewUser = useCallback (async (newUser) => {
    const response = await sendRequest(
      `${url}/Auth/register-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newUser),
      }
    );
    if (response.errorMsg) {
      dispatch(
        notificationActions.showNotification({
          msg: response.errorMsg,
          type: "error",
        })
      );
    } else {
      dispatch(
        notificationActions.showNotification({
          msg: "User Created",
          type: "success",
        })
      );
      history.push("/auth/login");
    }
  },[]);

  const handleLogin = useCallback (async (user) => {
    const response = await sendRequest(
      `${url}/Auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...user }),
      }
    );
    console.log(response)
    if (response.errorMsg) {
      dispatch(
        notificationActions.showNotification({
          msg: response.errorMsg,
          type: "error",
        })
      );
    } else {
      const token = jwt(response.data.token);
      dispatch(
        authSliceActions.login({ token: response.data.token, exp: token.exp })
      );
      history.push("/");
    }
  },[]);

  return (
    <div className="Auth_wrapper">
      {isLoading && <Loading />}
      {!isLoading && (
        <React.Fragment>
          <Route path="/auth/register">
            <Register onSubmit={handleNewUser} />
          </Route>
          <Route path="/auth/login">
            <Login onSubmit={handleLogin} />
          </Route>
        </React.Fragment>
      )}
    </div>
  );
}

export default Authentication;
