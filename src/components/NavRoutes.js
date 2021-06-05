import React from "react";
import Home from "./Home";
import Posts from "./Postrender";
import Publish from "./Publish";
import Details from "./Details";
import Profile from "./Profile";
import EditeProfile from "./EditeProfile";
import PrivateRoute from "./PrivateRoute";

import { Switch } from "react-router-dom";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute path="/" exact component={Home} />
      <PrivateRoute path="/Profile" component={Profile} />
      <PrivateRoute path="/Home" component={Home} />
      <PrivateRoute path="/Posts" component={Posts} />
      <PrivateRoute path="/Publish" component={Publish} />
      <PrivateRoute path="/Details/:id" component={Details} />
      <PrivateRoute path="/EditeProfile" component={EditeProfile} />
    </Switch>
  );
};

export default Routes;
