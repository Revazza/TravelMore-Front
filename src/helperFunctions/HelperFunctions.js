export const stringContainsNumber = (input) => {
  let str = String(input);
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(str.charAt(i)) && !(str.charAt(i) === " ")) {
      return true;
    }
  }
  return false;
};

export const validateEmail = (email) => {
  if (
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    return { isValid: true, errorMsg: "" };
  }
  return { isValid: false, errorMsg: "Invalid email" };
};

export const validateNameOrLastname = (str, inputName) => {
  if (str.includes(" ")) {
    return { isValid: false, errorMsg: `Spaces not allowed` };
  } else if (str.trim().length <= 1)
    return { isValid: false, errorMsg: `${inputName} is too short` };
  else if (str.trim().length > 30) {
    if (inputName === "firstName") {
      return { isValid: false, errorMsg: "Name is too long,try your nickname" };
    } else {
      return { isValid: false, errorMsg: "Lastname is too long" };
    }
  } else if (stringContainsNumber(str))
    return { isValid: false, errorMsg: `${inputName} contains numbers` };
  else return { isValid: true, errorMsg: "" };
};

export const validatePassword = (password) => {
  if (password.length < 6)
    return { isValid: false, errorMsg: "Password is too short" };
  else if (password.length > 120)
    return { isValid: false, errorMsg: "Try shorter password" };

  return { isValid: true, errorMsg: "" };
};

export const validateUsername = (username) => {
  if (username.includes(" ")) {
    return { isValid: false, errorMsg: "Spaces not allowed" };
  } else if (username.trim().length < 5)
    return { isValid: false, errorMsg: "Username is too short" };
  else if (username.trim().length > 15)
    return {
      isValid: false,
      errorMsg: "Username can't be more than 25 characters",
    };

  return { isValid: true, errorMsg: "" };
};

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

export const isGuid = (stringToTest) => {
  if (stringToTest) {
    if (stringToTest[0] === "{") {
      stringToTest = stringToTest.substring(1, stringToTest.length - 1);
    }
    var regexGuid =
      /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
    return regexGuid.test(stringToTest);
  }
};
