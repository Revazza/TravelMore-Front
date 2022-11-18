import React from "react";
import classes from "./NewlyAddedHotels.module.css";
import { Item, useFetch, Loading, Error } from "./imports";
import url from '../../../Url';
function PopularHotels() {
  const { isLoading, error, data } = useFetch(
    `${url}/TravelMore/hotels`
  );
  
  
  const hasErrors = !isLoading && error;
  return (
    <section className={classes.section_wrapper}>
      <h2>Newly Added Hotels</h2>
      {hasErrors && <Error className={classes.error} />}
      {isLoading && <Loading />}
      {!hasErrors && (
        <div className={classes.wrapper}>
          {data?.map((hotel) => {
            return (
              <Item key={hotel.id} hotel={hotel} />
            );
          })}
        </div>
      )}
    </section>
  );
}

export default PopularHotels;
