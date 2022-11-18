import React, { useCallback, useEffect, useState } from "react";
import classes from "./ProfileLayout.module.css";
import {
  Apartment,
  ChangeProfile,
  ProfileInformation,
  ApartmentLayout,
  AddApartment,
  useFetch,
  getCookie,
  Loading,
  Error,
} from "./imports";
import url from "../../Url";
import { useParams } from "react-router-dom";

function ProfileLayout(props) {
  const { id } = useParams();
  const { isLoading, error, data } = useFetch(
    `${url}/Profile?id=${id}`
  );

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [apartmentID, setApartmentID] = useState();

  //this will be handy after window width will be less than 920px
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (data) {
      setUsername(data.userName);
      setEmail(data.email);
      if(data.ownedHotelID)
      {
        setApartmentID(data.ownedHotelID);
      }
      else{
        setApartmentID(null);
      }
    }
  }, [data]);

  const setUserNewData = (newData) => {
    console.log(newData)
    if (newData.changed === "email") {
      setEmail(newData.value);
    } else if (newData.changed === "userName") {
      setUsername(newData.value);
    } else if(newData.changed === "Apartment"){
      setApartmentID(newData.value);
    }
  };

  const handleSettingsClick = useCallback(() => {
    setShowSettings((prevState) => !prevState);
  }, []);

  const hasErrors = !isLoading && error;

  return (
    <React.Fragment>
      {hasErrors && <Error className={classes.error_wrapper} />}
      {isLoading && (
        <div className={classes.loading_wrapper}>
          <Loading />
        </div>
      )}
      {!hasErrors && (
        <div className={classes.wrapper}>
          <section className={classes.update_info_section}>
            <h2>Profile</h2>
            <ProfileInformation
              username={username}
              email={email}
              userPicture={data?.userImage}
              onSettingsClick={handleSettingsClick}
            />
            <ChangeProfile
              showSettings={showSettings}
              onUserDataUpdate={setUserNewData}
            />
          </section>
          {apartmentID === null && (
            <section className={classes.add_apartment}>
              <Apartment label="Add Apartment">
                <AddApartment onHotelAdd={setUserNewData} />
              </Apartment>
            </section>
          )}

          {apartmentID !== null && (
            <section className={classes.apartment_layout}>
              <Apartment label="Show Apartment">
                <ApartmentLayout
                  hotelID={apartmentID}
                  onHotelDelete={setUserNewData}
                />
              </Apartment>
            </section>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export default ProfileLayout;
