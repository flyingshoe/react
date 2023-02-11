import { useState } from "react";
import { Container, TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import { isMobile } from "../utils";

const desktopUrl = "https://web.whatsapp.com/send";
const mobileUrl = "whatsapp://send";

export default function WhatsApp() {
  const [phoneNum, setPhoneNum] = useState("");
  const [msg, setMsg] = useState("");

  // Opens Whatsapp Web and sends the message to the phone number (no need to add to contact)
  const sendMsg = () => {
    const fullUrl = `${
      isMobile() ? mobileUrl : desktopUrl
    }?phone=${phoneNum}&text=${encodeURIComponent(msg)}`;
    window.open(fullUrl);
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        paddingTop: 30,
        paddingBottom: 30,
        display: "flex",
        flexDirection: "column",
        gap: 30,
      }}
    >
      <TextField
        label="Phone Number"
        value={phoneNum}
        onChange={(e) => setPhoneNum(e.target.value)}
      />
      <TextField
        label="Message"
        minRows={10}
        multiline
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <Button onClick={sendMsg}>Send</Button>
    </Container>
  );
}
