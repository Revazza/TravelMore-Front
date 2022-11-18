import React, { useRef } from "react";
import Input from "../../../UI/input/Input";
import id from "./Login.module.css";
import registerClasses from "../register/Register.module.css";
import Button from "../../../UI/Button";
import { Link } from "react-router-dom";

function Login(props) {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit({
      userName: usernameRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <form className={registerClasses.form_wrapper} id={id.form_wrapper}>
      <h1>
        Travel<span style={{ color: "rgb(24, 160, 251)" }}>M</span>ore
      </h1>
      <div className={registerClasses.form_section} id={id.form_section}>
        <Input type="text" placeholder="Username" ref={usernameRef} />
        <Input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          id={id.password_inp}
        />
        <Button
          type="submit"
          className={registerClasses.submit_btn}
          id={id.submit_btn}
          onClick={submitHandler}
          title='Login'
        />

        <Link to='/auth/register' className={registerClasses.link_to} >Create New Account</Link>
      </div>
    </form>
  );
}

export default Login;
