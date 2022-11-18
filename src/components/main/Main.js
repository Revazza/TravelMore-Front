import React from "react";
import classes from "./Main.module.css";
import NewlyAddedHotels from "./newlyAddedHotels/NewlyAddedHotels";
import Search from "./search/Search";
import { Route } from "react-router-dom";
import Result from "./result/Result";

function Main() {
  return (
    <main className={classes.main_wrapper}>
      <Search />
      <Route exact path="/">
        <NewlyAddedHotels />
      </Route>
      <Route path="/result/:hotel">
        <Result />
      </Route>
    </main>
  );
}

export default Main;
