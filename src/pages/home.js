import { useEffect } from "react";
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
    // eslint-disable-next-line
  }, []);
  return (
    <div
      style={{
        height: "100vh",
        background: `url(${bg}) center/cover no-repeat`,
      }}
    >
      <div style={{ height: "100%", background: "rgba(0,0,0,0.5)" }}>
        <div style={{ paddingTop: "7rem" }}>
          <h1 id="title">React Web App</h1>
        </div>
      </div>
    </div>
  );
}
