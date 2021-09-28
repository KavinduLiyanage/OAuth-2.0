import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "../helpers/privateRoute";
import SignInSide from "./auth/login";
import Verify from "./auth/verify";
import FileUpload from "./drive/fileUpload";
import HomePage from "./home/homePage";
import MyAccount from "./profile/myAccount";

function MainContainer() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={SignInSide} exact />
          <Route path="/verify" component={Verify} exact />

          {/*All the Private Routes of System*/}
          <PrivateRoute component={HomePage} path="/home" exact />
          <PrivateRoute component={MyAccount} path="/account" exact />
          <PrivateRoute component={FileUpload} path="/upload" exact />
          {/* <PrivateRoute component={EditUser} path="/users/:id" exact />
          <PrivateRoute
            component={ProductEdit}
            path="/products/edit/:id"
            exact
          /> */}
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default MainContainer;
