import React from "react";
import classes from "./Request.module.css";
import { useFetch, notificationActions, getCookie } from "./imports";
import { useDispatch } from "react-redux";
const Request = (props) => {
  const dispatch = useDispatch();
  const activeClasses = `${classes.wrapper} ${props.className}`;

  const { id, status, hostFrom, hostTo, bookedHotel } = props?.request;
  const startDate = new Date(hostFrom).toISOString().split("T")[0];
  const endDate = new Date(hostTo).toISOString().split("T")[0];

  // const imgSrc =
  //   data?.apartmentPicture.apartmentHeader +
  //   data?.apartmentPicture.apartmentPicture;
  const imgSrc = null;
  let requestStatusImgSrc = "./assets/pending.png";
  if (status === 1) {
    requestStatusImgSrc = "./assets/accepted.png";
  } else if (status === 2) {
    requestStatusImgSrc = "./assets/declined.png";
  }

  const handleRequestClick = () => {
    props.onRequestClick(props.request);
  };

  const handleRequestDelete = async () => {
    //Status Code 204 - Doesn't return anything
    //useHttp won't work here
    const response = await fetch(
      `https://localhost:7043/api/Booking/${props.request.bookingId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );

    if (response.ok) {
      dispatch(
        notificationActions.showNotification({
          type: "success",
          msg: "Booking Removed",
        })
      );
      props.onDeleteRequest(props.request.id);
    }
  };

  return (
    <div className={activeClasses} onClick={handleRequestClick} id={props.id}>
      <div className={classes.img_wrapper}>
        <img src={imgSrc ? imgSrc : "/assets/hotel.png"} alt="Hotel" />
      </div>
      <div className={classes.info}>
        <div className={classes.address}>
          <p>{bookedHotel?.address}</p>
        </div>
        <div className={classes.distance}>
          <p>
            {bookedHotel?.distanceToCenter} to center, {bookedHotel?.numberOfBeds}{" "}
            beds
          </p>
        </div>
        <div className={classes.description}>
          <p>{bookedHotel?.description}</p>
        </div>
        <div className={classes.checkin_out}>
          <p>
            {startDate} - {endDate}
          </p>
          <div className={classes.request_situation}>
            <img src={requestStatusImgSrc} alt="Request Status" />
            {status === 4 && <p>Pending...</p>}
            {status === 1 && <p id={classes.accepted}>Accepted</p>}
            {status === 2 && <p id={classes.declined}>Declined</p>}
            {status === 3 && <p id={classes.not_possible}>Not Possible</p>}
          </div>
        </div>
      </div>
      {status !== 1 && (
        <div className={classes.remove_booking} onClick={handleRequestDelete}>
          <img src="/assets/close.png" alt="close" />
        </div>
      )}
    </div>
  );
};

export default Request;
