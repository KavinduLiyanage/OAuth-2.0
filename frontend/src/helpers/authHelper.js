import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl } from "../configs/config";

//Getting logged user data using access token
export const getLoggedUserData = (token, history) => {
  if (!token) {
    toast("No Token!");
  }
  try {
    const body = { token: token };
    axios.post(`${serverUrl}/getUserInfo`, body).then((response) => {
      const serializedValue = JSON.stringify(response.data);
      localStorage.setItem("userInfo", serializedValue);
      toast("Sign in successfully!");
      history.push("/home");
    });
  } catch (e) {
    toast("Sign in failed!");
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
