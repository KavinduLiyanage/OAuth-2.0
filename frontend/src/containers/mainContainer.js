import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./Users/Register";
import Login from "./Users/Login";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import ProductAdd from "./Products/productAdd";
import ProductList from "./Products/productsList";
import ProductEdit from "./Products/productEdit";
import EditUser from "./Users/EditUser";
import PrivateRoute from "./ReactMiddleware/PrivateRoute";

function MainContainer() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Navbar />
                <div className="container" style={{ maxWidth: "80%", marginTop: 80, paddingLeft: 0, paddingRight: 0}}>
                    <Switch>
                        <Route exact path = '/login' component = { Login }/>
                        <Route exact path = '/register' component = { Register }/>

                        {/*All the Private Routes of System*/}
                        <PrivateRoute component={HomePage} path="/" exact/>
                        <PrivateRoute component={EditUser} path="/users/:id" exact/>
                        <PrivateRoute component={ProductAdd} path="/addProduct" exact/>
                        <PrivateRoute component={ProductList} path="/products" exact/>
                        <PrivateRoute component={ProductEdit} path="/products/edit/:id" exact/>
                    </Switch>
                </div>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default MainContainer;