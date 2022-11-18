import React, { useState } from "react";
import classes from "./DateInput.module.css";

function DateInput(props) {
  const [showCalender, setShowCalender] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const inputName =
    startDate.length !== 0 || endDate.length !== 0 ? (
      <div className={classes.inputted_date_wrapper}>
        <p>{startDate}</p>
        <p>{endDate}</p>
      </div>
    ) : (
      <p>Date</p>
    );

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    props.onChangeValue({
      ...props.searchState,
      date: {
        startDate: event.target.value,
        endDate,
      },
    });
    if (endDate.length !== 0) setShowCalender(false);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    props.onChangeValue({
      date:{
        startDate,
        endDate: event.target.value,
      },
    });
    if (startDate.length !== 0)
     setShowCalender(false);
  };

  const handleDateClick = () => {
    setShowCalender((prevState) => !prevState);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.date_btn} onClick={handleDateClick}>
        {inputName}
        <img
          src="./assets/list_arrow.png"
          alt="arrow"
          style={{ transform: showCalender && "rotate(-90deg)" }}
        />
      </div>
      {showCalender && (
        <div className={classes["start-end_date"]}>
          <div className={classes.start_date}>
            <label>Start Date</label>
            <input type="date" onChange={handleStartDateChange} />
          </div>
          <div className={classes.end_date}>
            <label>End Date</label>
            <input type="date" onChange={handleEndDateChange} />
          </div>
        </div>
      )}
    </div>
  );
}

export default DateInput;
