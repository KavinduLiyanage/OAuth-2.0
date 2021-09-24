import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignInSide from "./auth/login";
// import PrivateRoute from "./ReactMiddleware/PrivateRoute";

function MainContainer() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={SignInSide} />
          {/* <Route exact path = '/register' component = { Register }/> */}

          {/*All the Private Routes of System*/}
          {/* <PrivateRoute component={HomePage} path="/" exact/>
                        <PrivateRoute component={EditUser} path="/users/:id" exact/>
                        <PrivateRoute component={ProductAdd} path="/addProduct" exact/>
                        <PrivateRoute component={ProductList} path="/products" exact/>
                        <PrivateRoute component={ProductEdit} path="/products/edit/:id" exact/> */}
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default MainContainer;
