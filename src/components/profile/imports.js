import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../helperFunctions/HelperFunctions";

export { default as Apartment } from "./apartment/Apartment";
export { default as ChangeProfile } from "./profileSections/ChangeProfile";
export { default as ProfileInformation } from "./profileSections/ProfileInformation";
export { default as ApartmentLayout } from "./apartment/showApartment/ApartmentLayout";
export { default as AddApartment } from "./apartment/addApartment/AddApartment";
export { default as GoogleMapReact } from "google-map-react";
export { useHistory } from "react-router-dom";
export { default as Button } from "../../UI/Button";
export { default as Input } from "../../UI/input/Input";
export { default as Loading } from "../../UI/loading/Loading";
export { default as ValidationInput } from "../../UI/input/validationInput/ValidationInput";
export { default as Card } from "../../UI/Card";
export { default as useHttp } from "../../hooks/useHttp";
export { default as useFetch } from "../../hooks/useFetch";
export { getCookie } from "../../helperFunctions/HelperFunctions";
export { useSelector,useDispatch } from "react-redux";
export { notificationActions} from '../../store/store';
export { default as Error} from '../../UI/error/Error';

export const emailInput = {
  input: {
    id: 0,
    inputType: "text",
    placeholder: "Change Email",
    validationFuncion: validateEmail,
    name: "email",
  },
  updateBtn: {
    type: "submit",
    title: "Update Email",
  },
};

export const usernameInput = {
  input: {
    id: 0,
    inputType: "text",
    placeholder: "Change Username",
    validationFuncion: validateUsername,
    name: "userName",
  },
  updateBtn: {
    type: "submit",
    title: "Update Username",
  },
};

export const passwordInput = {
  input: {
    id: 0,
    inputType: "password",
    placeholder: "Change Password",
    validationFuncion: validatePassword,
    name: "password",
  },
  updateBtn: {
    type: "submit",
    title: "Update Password",
  },
};
