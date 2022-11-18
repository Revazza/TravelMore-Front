import React, { useState } from "react";
import { Input } from "../imports";
import classes from "./SearchBar.module.css";

function SearchBar(props) {
  
  const [searchInput, setSearchInput] = useState("");
  const inputChangeHandler = (event) => {
    setSearchInput(event.target.value);
    props.onChangeValue({
      address: event.target.value,
    });
  };

  return (
    <div className={classes.search_bar}>
      <Input
        type="text"
        placeholder="Search hotels"
        value={searchInput}
        id={classes.search_input}
        onChange={inputChangeHandler}
      />
    </div>
  );
}

export default SearchBar;
