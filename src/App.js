import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
import Posts from "./components/Postrender";
import Publish from "./components/Publish";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Posts" component={Posts} />
        <Route path="/Publish" component={Publish} />
      </Switch>
    </Router>
  );
}

export default App;
