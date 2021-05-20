import React from "react";
import Home from "./Home";
import Posts from "./Postrender";
import Publish from "./Publish";
import Details from "./Details";
import { Switch, Route } from "react-router-dom";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/Posts" component={Posts} />
      <Route path="/Publish" component={Publish} />
      <Route path="/Details" component={Details} />
    </Switch>
  );
};

export default Routes;
