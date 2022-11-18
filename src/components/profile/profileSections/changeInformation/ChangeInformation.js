import React, { useEffect, useState } from "react";

import classes from "./ChangeInformation.module.css";

import { Button, ValidationInput } from "../../imports";
//that was tough

function ChangeInformation(props) {
  const resetFormClass = `${classes.reset_form} ${props.className}`;
  const { input } = { ...props.updateInfo };
  const { updateBtn } = { ...props.updateInfo };
  const { name: inputName } = { ...props.updateInfo.input };
  const [newInformation, setNewInformation] = useState({});
  const [hideForm, setHideForm] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (newInformation[inputName]?.length !== 0) {
      setFormIsValid(true);
      return;
    }
    setFormIsValid(false);
  }, [newInformation]);

  const handleUpdateInfo = (event) => {
    event.preventDefault();
    props.onUpdateInfo(newInformation);
  };

  const handleInformationChange = (obj) => {
    let keyword = Object.keys(obj)[0];

    let newValue = {
      [keyword]: obj[keyword],
    };
    if (newValue[keyword] !== newInformation?.[keyword]) {
      setNewInformation({ ...newValue });
    }
  };
  const handleShowForm = () => {
    if (showForm) {
      setHideForm(true);
      setTimeout(() => {
        setShowForm(false);
      }, 400);
      return;
    }
    setHideForm(false);
    setShowForm((prevState) => !prevState);
  };

  return (
    <div className={classes.change_info}>
      <div className={classes.change_wrapper} onClick={handleShowForm}>
        <p>{props.title}</p>
        <img
          src="/assets/list_arrow.png"
          style={{ transform: showForm && "rotate(-90deg)" }}
        />
      </div>
      {showForm && (
        <div
          className={`${resetFormClass} ${hideForm && classes.hide_reset_form}`}
        >
          <form className={classes.form_wrapper}>
            <div className={classes.wrapper}>
              <ValidationInput
                key={input.id}
                type={input.inputType}
                placeholder={input.placeholder}
                validationFunc={input.validationFuncion}
                inputName={input.name}
                onChangeValue={handleInformationChange}
                isRequired={true}
                className={classes.input_class}
              />
              <Button
                type={updateBtn.type}
                title={updateBtn.title}
                onClick={handleUpdateInfo}
                className={classes.submit_btn}
                disabled={!formIsValid}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChangeInformation;
