import { TextField, Container } from "@mui/material";
import { useState } from "react";
import "../styles/curl.css";

export default function Curl() {
  const [rawCurl, setRawCurl] = useState("");

  const formatCurl = (raw) => {
    const parts = raw.split("-H");
    //const url = parts[0].split("curl").slice(1).trim();
    const headers = {};
    const headersArr = parts.slice(1);
    headersArr.forEach((h) => {
      const hPart = h.split(":");
      headers[hPart[0]] = hPart[1];
    });
    console.log(headers);
    return headers.toString();
  };

  return (
    <Container style={{ paddingTop: 20 }}>
      <TextField
        onInput={(e) => setRawCurl(e.target.value)}
        fullWidth
        label="Paste CURL here"
      />
      <br />
      {rawCurl !== "" && formatCurl(rawCurl)}
    </Container>
  );
}
