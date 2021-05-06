import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
import Posts from "./components/Postrender";
import Publish from "./components/Publish";
import Details from "./components/Details";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Posts" component={Posts} />
        <Route path="/Publish" component={Publish} />
        <Route path="/Details" component={Details} />
        <Route path="/Profile" component={Profile} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/LogIn" component={LogIn} />
      </Switch>
    </Router>
  );
}

export default App;
