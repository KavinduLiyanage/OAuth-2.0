import axios from "axios";

// import {
//     jwtSecret,
//     TOKEN_KEY,
//     TOKEN_ID,
//     TOKEN_FNAME,
//     TOKEN_EMAIL,
//     TOKEN_LNAME,
//     TOKEN_PHONENO,
//     TOKEN_ADDRESS,
// } from "../config";

//All the security authentication contains here

// const jwt = require("jsonwebtoken");

//Login validation
export const login = (token, history) => {
    
  console.log("inside login");
  if (!token) {
    console.log("No Token");
  }

  try {
    console.log("inside try");
    const body = { token: token };
    axios.post("http://localhost:5000/getUserInfo", body).then((response) => {
      console.log(response);
      const serializedValue = JSON.stringify(response.data);
      localStorage.setItem("userInfo", serializedValue);
      history.push('/home');
    });
    //Check token is valid in this try catch block.
    //If this fails user will be not loged on
    // const decoded = jwt.verify(token, jwtSecret);
    // localStorage.setItem(TOKEN_KEY, decoded);
    // localStorage.setItem(TOKEN_ID, decoded.id);
    // localStorage.setItem(TOKEN_FNAME, user[TOKEN_FNAME]);
    // localStorage.setItem(TOKEN_LNAME, user[TOKEN_LNAME]);
    // localStorage.setItem(TOKEN_EMAIL, user[TOKEN_EMAIL]);
    // localStorage.setItem(TOKEN_PHONENO, user[TOKEN_PHONENO]);
    // localStorage.setItem(TOKEN_ADDRESS, user[TOKEN_ADDRESS]);
    // console.log(user);
  } catch (e) {
    console.log("Token Not Valid");
  }
};

// //Remove all the configuration in localStorage after log out
// export const logout = () => {
//     localStorage.removeItem(TOKEN_KEY);
//     localStorage.removeItem(TOKEN_ID);
//     localStorage.removeItem(TOKEN_FNAME);
//     localStorage.removeItem(TOKEN_LNAME);
//     localStorage.removeItem(TOKEN_EMAIL);
//     localStorage.removeItem(TOKEN_PHONENO);
//     localStorage.removeItem(TOKEN_ADDRESS);
// };

//Check user is login every time running a private route
export const isLogin = () => {
   return !!localStorage.getItem('userInfo');
};
