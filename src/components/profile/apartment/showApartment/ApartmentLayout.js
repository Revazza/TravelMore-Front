import React from "react";
import classes from "./ApartmentLayout.module.css";
import HotelAttributes from "./HotelAttributes";
import {
  GoogleMapReact,
  Button,
  useFetch,
  getCookie,
  useDispatch,
  notificationActions,
} from "../../imports";
import jwt from "jwt-decode";
import url from "../../../../Url";
const ApartmentLayout = (props) => {
  const dispatch = useDispatch();
  const token = getCookie("token");
  const { data } = useFetch(
    `${url}/TravelMore/hotel/${props.hotelID}`
  );
  let lat = 0;
  let lng = 0;
  let hotel = null;
  if(data)
  {
    hotel = data;
    lat = hotel.latitude;
    lng = hotel.longitude;
  }

  const imgSrc =
    hotel?.hotelImage.imageType + "," +
    hotel?.hotelImage.image64;

  const handleDeleteHotel = async () => {
    const response = await fetch(
      `${url}/Profile/delete-hotel/${jwt(token).userID}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization:`Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      dispatch(
        notificationActions.showNotification({
          type: "success",
          msg: 'Hotel Removed',
        })
      );
      props.onHotelDelete({ changed: "Apartment", value: null });
    }
  };
  const apartmentClasses = props.hideApartment
    ? `${classes.wrapper} ${classes.hideApartment}`
    : `${classes.wrapper}`;

  return (
    <div className={apartmentClasses}>
      <div className={classes.info_wrapper}>
        <div className={classes.img_wrapper}>
          <img
            src={imgSrc ? imgSrc : "/assets/Rectangle.png"}
            alt="Your Hotel"
          />
        </div>
        <section className={classes.hotel_information}>
          <div className={classes.attributes_wrapper}>
            <HotelAttributes
              attribute="City"
              atrInfo={hotel?.city}
              id={classes.firstAttribute}
            />
            <HotelAttributes attribute="Address" atrInfo={hotel?.address} />
            <HotelAttributes
              attribute="Center In"
              atrInfo={`${hotel?.distanceToCenter}m`}
            />
            <HotelAttributes attribute="Beds" atrInfo={hotel?.numberOfBeds} />
            <HotelAttributes
              attribute="Description"
              atrInfo={hotel?.description}
            />
          </div>
        </section>
      </div>
      <div className={classes.map_wrapper}>
        <GoogleMapReact center={{ lat, lng }} defaultZoom={16}>
          <MapPin lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
      <div className={classes.delete_btn}>
        <Button
          type="button"
          title="Delete Apartment"
          onClick={handleDeleteHotel}
        />
      </div>
    </div>
  );
};

const MapPin = (props) => {
  return <img src="/assets/pin.png" alt="pin" />;
};

export default ApartmentLayout;
