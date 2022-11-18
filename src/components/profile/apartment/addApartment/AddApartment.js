import React, { useRef, useState } from "react";
import classes from "./AddApartment.module.css";

import {
  Button,
  Input,
  useSelector,
  useHttp,
  useDispatch,
  notificationActions,
} from "../../imports";

import Map from "./map/Map";
import jwt from "jwt-decode";
import url from '../../../../Url'

function AddApartment(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { sendRequest } = useHttp();
  const cityRef = useRef();
  const addressRef = useRef();
  const distanceRef = useRef();
  const bedRef = useRef();
  const descriptionRef = useRef();
  const [lat,setLat] = useState(41.7151);
  const [lng,setLng] = useState(44.8268);
  const [image, setImage] = useState(undefined);

  const apartmentClasses = props.hideApartment
    ? `${classes.wrapper} ${classes.hideApartment}`
    : `${classes.wrapper}`;

  const handleFileChange = (event) => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.onload = (e) => {
      console.log(e)
      const imageResult = e.target.result;
      console.log("Image Result: ",imageResult);
      setImage(imageResult);
    };
    reader.readAsDataURL(files[0]);
    
  };

  const handlePositionChange = (event) =>{
    setLat(event.lat);
    setLng(event.lng);
  }

  const handleSubmission = async(event) => {
    event.preventDefault();

    const imgObj = {
      imageType:'',
      uploadedImage:''
    }
    let img = image.split(',');
    imgObj.imageType = img[0];
    imgObj.uploadedImage = img[1];


    const request = {
      ownerID: jwt(token).userID,
      city: cityRef.current.value.toLowerCase(),
      address: addressRef.current.value.toLowerCase(),
      distanceToCenter: +distanceRef.current.value,
      description: descriptionRef.current.value,
      numberOfBeds: +bedRef.current.value,
      latitude:lat,
      longitude:lng,
      image:{
        ...imgObj
      }
    };
    const response = await sendRequest(`${url}/Profile/add-hotel`, {
      method: "POST",
      body: JSON.stringify(request),
    });

    if(!response.errorMsg)
    {
      props.onHotelAdd({changed:'Apartment',value:response.data.id});
      dispatch(notificationActions.showNotification({type:'sucess',msg:'Hotel Added Successfuly'}))
    }
  };

  return (
    <form className={apartmentClasses} onSubmit={handleSubmission} >
      <div className={classes.apartment_attributes}>
        <div className={classes.inputs}>
          <Input type="text" placeholder="City" ref={cityRef} required={true}/>
        </div>
        <div className={classes.inputs}>
          <Input type="text" placeholder="Address" ref={addressRef} />
        </div>
        <div className={classes.inputs}>
          <Input
            type="number"
            placeholder="Distance to center"
            ref={distanceRef}
            required={true}
          />
        </div>
        <div className={classes.inputs}>
          <Input type="number" placeholder="Number of beds" ref={bedRef} required={true}/>
        </div>
        <div className={classes.inputs} id={classes.description}>
          <textarea placeholder="Description" ref={descriptionRef} required={true}></textarea>
        </div>
        <input type="file" onChange={handleFileChange} required={true}/>
        <img className={classes.myImage} src={image ? image : "/assets/hotel.png"} />

      </div>

      <div className={classes.google_map_wrapper}>
        <Map onPositionChange={handlePositionChange} lat={lat} lng={lng}/>
      </div>
      <div className={classes.submit_btn}>
        <Button type="submit" title="Add Apartment" />
      </div>
    </form>
  );
}



export default AddApartment;
