import React, { useState, useEffect } from "react";
import "../styles/color.css";
export default function Color() {
  const [color, setColor] = useState("");
  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);
  useEffect(() => {
    return () => {
      document.body.style.background = "white";
    };
  }, []);
  return (
    <div className="color-container">
      <input
        placeholder="Enter color code"
        value={color}
        onChange={(e) => setColor(e.target.value.toUpperCase())}
        onFocus={(e) => e.target.select()}
        style={{color:color}}
      />
    </div>
  );
}
