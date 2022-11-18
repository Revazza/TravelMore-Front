import React, { useState } from "react";
import classes from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authSliceActions } from "../../store/store";
import jwt from "jwt-decode";
function Header() {
  const [showDropDown, setShowDropDown] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state)=>state.auth.token);
  let userID;
  if(token)
  {
    userID = jwt(token).userID;
  }
  const toggleDropDown = () => {
    setShowDropDown((prevState) => !prevState);
  };
  const handleSignOut = () => {
    dispatch(authSliceActions.logout());
  };
  const mouseLeaveHandler = () =>{
    setShowDropDown(false);
  }

  return (
    <header className={classes.wrapper}>
      <div className={classes.content_wrapper}>
        <div className={classes.logo}>
          <h1>
            {!isLoggedIn && (
              <React.Fragment>
                Travel<span style={{ color: "#18A0FB" }}>M</span>ore
              </React.Fragment>
            )}
            {isLoggedIn && (
              <Link to="/">
                Travel<span style={{ color: "#18A0FB" }}>M</span>ore
              </Link>
            )}
          </h1>
        </div>
        {isLoggedIn && (
          <nav className={classes.nav_wrapper} onMouseLeave={mouseLeaveHandler}>
            <div className={classes.profile} onClick={toggleDropDown}>
              <div className={classes.hamburger_wrapper}>
                <img src="./assets/hamburger_menu.png" alt="More" />
              </div>
              <div className={classes.profile_img}>
                <img src="./assets/user.png" alt="Profile" />
              </div>
              {showDropDown && (
                <div className={classes.dropdown_list}>
                  <ul className={classes.list_wrapper}>
                    <li>
                      <Link to={`/Profile/${userID}`}>Profile</Link>
                      <div className={classes.circle}></div>
                    </li>
                    <li>
                      <Link to="/my-guests">My Guests</Link>
                      <div className={classes.circle}></div>
                    </li>
                    <li>
                      <Link to="/my-bookings">My Bookings</Link>
                      <div className={classes.circle}></div>
                    </li>
                    <li onClick={handleSignOut}>
                      <Link to="/auth/login">Sign Out</Link>
                      <div className={classes.circle}></div>
                    </li>
                  </ul>
                </div>
              )}
              
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
