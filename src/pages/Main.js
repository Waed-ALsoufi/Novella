import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../components/LogIn";
import SignUp from "../components/SignUp";
import { AuthProvider } from "../components/Auth";
import Home from "../components//Home";
import BooksPage from "../pages/BooksPage";
import AddBookPage from "../pages/AddBookPage";
import BookDetails from "../pages/BookDetails";
import Profile from "../components//Profile";
import EditeProfile from "../components//EditeProfile";
import PrivateRoute from "../components//PrivateRoute";

function Main() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <React.Fragment>
                        <div>
                            <Route path="/Login" component={Login} />
                            <Route path="/SignUp" component={SignUp} />
                            <Route path="/Logout" component={Login} />
                        </div>
                        <div>
                            <Navbar />
                            <PrivateRoute path="/" exact component={Home} />
                            <PrivateRoute path="/Profile" component={Profile} />
                            <PrivateRoute path="/Home" component={Home} />
                            <PrivateRoute path="/Posts" component={BooksPage} />
                            <PrivateRoute path="/Publish" component={AddBookPage} />
                            <PrivateRoute path="/Details/:id" component={BookDetails} />
                            <PrivateRoute path="/EditeProfile" component={EditeProfile} />                        </div>
                    </React.Fragment>
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default Main;
