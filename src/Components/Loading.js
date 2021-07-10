// Waed Alsoufi

import React from 'react';
import '../Style/IsLoading.css';

function Loading() {
  return (
    <div className="loading">
      <div className="circle" />
      <div className="circle" />
      <div className="circle" />
      <div className="shadow" />
      <div className="shadow" />
      <div className="shadow" />
      <span>Loading</span>
    </div>
  );
}
export default Loading;
