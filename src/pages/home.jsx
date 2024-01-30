import { useEffect } from "react";
import "src/styles/home.css";
import bg from "src/images/bg3.jpg";
import { Box } from "@mui/material";

export default function Home({ setHomePg }) {
  useEffect(() => {
    setHomePg(true);
    return () => {
      setHomePg(false);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div
      style={{
        height: "100%",
        background: `url(${bg}) center/cover no-repeat`,
      }}
    >
      <Box
        sx={{
          height: { xs: "calc(100% - 56px)", sm: "calc(100% - 64px)" },
          background: "rgba(0,0,0,0.5)",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <div className="mt-32">
          <h1 id="title">React Web App</h1>
        </div>
      </Box>
    </div>
  );
}
