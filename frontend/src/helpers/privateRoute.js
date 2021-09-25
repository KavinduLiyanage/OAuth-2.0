import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "./authHelper";

//All the private route Management
/*
Component - Component which should redirect to
*/

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
