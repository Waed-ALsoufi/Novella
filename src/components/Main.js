import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import "../App.css";

import Navbar from "./Navbar";
import Login from "./LogIn";
import SignUp from "./SignUp";
import Routes from "./NavRoutes";
import { AuthProvider } from "./Auth";

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
              <Routes />
            </div>
          </React.Fragment>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default Main;
