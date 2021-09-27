import axios from "axios";
import { serverUrl } from "../configs/config";

//Login validation
export const login = (token, history) => {
  if (!token) {
    console.log("No Token");
  }
  try {
    const body = { token: token };
    axios.post(`${serverUrl}/getUserInfo`, body).then((response) => {
      console.log(response);
      const serializedValue = JSON.stringify(response.data);
      localStorage.setItem("userInfo", serializedValue);
      history.push("/home");
    });
  } catch (e) {
    console.log("Token Not Valid");
  }
};

//Remove all the configuration in localStorage after log out
export const logout = () => {
  localStorage.removeItem("userInfo");
};

//Check user is login every time running a private route
export const isLogin = () => {
  return !!localStorage.getItem("userInfo");
};

export const getUserInfo = () => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo) : null;
};

export const getToken = () => {
    const token = localStorage.getItem("token");
    return token ? JSON.parse(token) : null;
  };
