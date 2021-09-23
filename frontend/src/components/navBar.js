import React, {Component} from 'react';
import { TOKEN_FNAME, TOKEN_ID } from "./config";
import { isLogin, logout } from "./ReactMiddleware/Auth.js";
import { Link } from "react-router-dom";

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLogin: isLogin()
        };
    }

    handleLogout = () => {
        logout();
        this.setState({
            isLogin: false,
        });
    };

    handleNameClick = () => {
        window.location = "/users/" + localStorage.getItem(TOKEN_ID);
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1"
                            >
                                <span className="navbar-toggler-icon" />
                            </button>
                            <a className="navbar-brand" href="/">
                                Home
                            </a>
                            <div
                                className="collapse navbar-collapse"
                                id="bs-example-navbar-collapse-1"
                            >
                                <ul className="navbar-nav">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/addProduct">Add Products <span className="sr-only">(current)</span></a>
                                    </li>

                                </ul>

                                <ul className="navbar-nav ml-md-auto">
                                    <li className="nav-item active">
                                        {this.state.isLogin ? (
                                            <div>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a
                                                    href="#"
                                                    className="loged-user-name"
                                                    onClick={this.handleNameClick}
                                                >
                                                    {" "}
                                                    {localStorage.getItem(TOKEN_FNAME)}{" "}
                                                </a>
                                                <span className="badge badge-light">
                                                <Link to="" onClick={() => this.handleLogout()}>
                                                    Logout
                                                </Link>
                                                    </span>
                                            </div>
                                        ) : (
                                            <a href="/login">Login</a>
                                        )}
                                    </li>
                                    <br />
                                    <li className="nav-item dropdown"></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;