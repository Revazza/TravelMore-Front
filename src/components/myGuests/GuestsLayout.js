import React, { useCallback, useEffect, useRef, useState } from "react";
import classes from "./GuestsLayout.module.css";
import jwt from "jwt-decode";
import {
  getCookie,
  Error,
  Loading,
  Item,
  Pagination,
  useFetch,
  useHttp,
} from "./imports";

import url from "../../Url";

function GuestsLayout() {
  const userID = jwt(getCookie("token")).userID;
  const { sendRequest } = useHttp();

  const [guests, setGuests] = useState([]);
  const { isLoading, error, data } = useFetch(`${url}/Guests/${userID}`);
  useEffect(() => {
    if (data) {
      setGuests(data);
    }
  }, [data]);

  const handleStatusChange = async (guest) => {
    const guestIndex = guests.findIndex((g) => g.id == guest.id);
    guests[guestIndex] = guest;

    const requestBody = {
      status:guest.status,
      hostFrom:guest.hostFrom,
      hostTo:guest.hostTo,
      guestId:guest.guestId,
      hotelId:guest.hotelId

    }
    const data = await sendRequest(`${url}/Guests/update-guest`,{
      body:JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method:"POST"
    });
  };

  const guestsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const topPosition = useRef();
  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({
      top: topPosition,
      behavior: "smooth",
    });
  }, []);
  const indexOfLastGuest = guestsPerPage * currentPage;
  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
  const slicedArr = guests?.slice(indexOfFirstGuest, indexOfLastGuest);

  const hasError = !isLoading && error;
  return (
    <section className={classes.wrapper}>
      <h2>Guests</h2>
      {hasError && <Error className={classes.error} />}
      {isLoading && <Loading />}
      {guests?.length === 0 && (
        <div className={classes.no_request}>
          <div className={classes.user_msg}>
            <label>Inbox is empty</label>
            <img src="/assets/empty-box.png" alt="Empty Box" />
          </div>
        </div>
      )}
      <div ref={topPosition}></div>
      {!hasError && (
        <React.Fragment>
          <div className={classes.guest_container}>
            {slicedArr?.map((guest) => (
              <Item
                key={guest.id}
                guest={guest}
                onChangeStatus={handleStatusChange}
              />
            ))}
          </div>
          <Pagination
            onPageClick={handlePageChange}
            currentPage={currentPage}
            totalPageNumber={guests?.length}
            itemsPerPage={guestsPerPage}
          />
        </React.Fragment>
      )}
    </section>
  );
}

export default GuestsLayout;
