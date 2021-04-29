// Waed Alsoufi

import React from "react";
import "../Style/IsLoading.css";

function IsLoading() {
  return (
    <div className="loading">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="shadow"></div>
      <div className="shadow"></div>
      <div className="shadow"></div>
      <span>Loading</span>
    </div>
  );
}
export default IsLoading;
