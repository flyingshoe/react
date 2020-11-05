import React, { useEffect } from "react";
import "../styles/home.css";
import bg from "../images/bg3.jpg";

export default function Home(props) {
  useEffect(() => {
    props.setNav("top");
    props.setTrans("");
    return () => {
      props.setNav("");
      props.setTrans("dark");
    };
  }, []);
  return (
    <>
      <div
        style={{
          height: "100vh",
          background: `url(${bg}) center/cover no-repeat`,
        }}
      >
        <div style={{ height: "100%", background: "rgba(0,0,0,0.5)" }}>
          <div style={{ paddingTop: "100px" }}>
            <h1 id='title'>REACT Test Site</h1>
          </div>
        </div>
      </div>
    </>
  );
}
