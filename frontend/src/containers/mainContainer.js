import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "../helpers/privateRoute";
import SignInSide from "./auth/login";
import Verify from "./auth/verify";
import HomePage from "./homePage";

function MainContainer() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={SignInSide} exact />
          <Route path="/verify" component={Verify} exact />

          {/*All the Private Routes of System*/}
          <PrivateRoute component={HomePage} path="/home" exact />
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
