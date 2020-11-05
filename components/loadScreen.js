import React from "react";
import "../styles/loadScreen.css";

export default function load() {
  return (
    <div className="loader-container">
      <div>
        <div className="loader"></div>
        <span className='loader-text'>
          Loading...
        </span>
      </div>
    </div>
  );
}
 