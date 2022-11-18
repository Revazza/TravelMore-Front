import React, { useCallback, useEffect, useState } from "react";
import classes from "./Result.module.css";
import Item from "../newlyAddedHotels/Item";
import Pagination from "../../../UI/pagination/Pagination";
import { useLocation } from "react-router-dom";
import useHttp from "../../../hooks/useHttp";
import { Loading, getCookie } from "../newlyAddedHotels/imports";
import jwt from "jwt-decode";

function Result() {
  const location = useLocation();
  const { sendRequest, isLoading } = useHttp();
  const [apartments, setApartments] = useState();

  const userInfo = jwt(getCookie("token"));

  useEffect(() => {
    const fetchData = async (state) => {
      const requestBody = {
        address: state.address?.toLowerCase(),
        bedNumber: state.bed,
        startDate: state.date?.startDate,
        endDate: state.date?.endDate,
        city: state.city?.toLowerCase(),
      };
      const response = await sendRequest(`https://localhost:7043/api/search`, {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
      if (!response.errorMsg) {
        setApartments(response.data);
      } else {
        setApartments([]);
      }
    };
    fetchData(location.state.state);
  }, [location.state.state, sendRequest]);

  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 8;
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const slicedArr = apartments?.slice(indexOfFirstHotel, indexOfLastHotel);

  const setPage = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  return (
    <section className={classes.result_section}>
      <h2>Result</h2>
      {isLoading && <Loading />}
      {slicedArr?.length === 0 && (
        <div className={classes.nothing_found}>
          <label>Nothing Found</label>
        </div>
      )}
      {slicedArr?.length > 0 && (
        <div className={classes.container}>
          {slicedArr?.map((apartment) => {
            return (
              <Item
                key={apartment.apartmentId}
                hotel={apartment}
                userInfo={userInfo}
              />
            );
          })}
        </div>
      )}
      <Pagination
        itemsPerPage={hotelsPerPage}
        totalPageNumber={apartments?.length}
        onPageClick={setPage}
        currentPage={currentPage}
      />
    </section>
  );
}

export default Result;
