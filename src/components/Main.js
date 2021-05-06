import React from "react";
import Navbar from "./Navbar";
import "../App.css";
import Routes from "./NavRoutes";

import { BrowserRouter as Router } from "react-router-dom";
function Main() {
  return (
    <Router>
      <Navbar />
      <Routes />
    </Router>
  );
}

export default Main;
