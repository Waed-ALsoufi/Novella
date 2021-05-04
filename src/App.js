import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Routes from "./components/NavRoutes";

import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes />
    </Router>
  );
}

export default App;
