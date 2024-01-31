import {
  Button,
  ClickAwayListener,
  Container,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";

export default function ImageUrl() {
  const [imgUrl, setImgUrl] = useState(
    "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
  );

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleFileInputChange = (e) => {
    let file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        setImgUrl(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(imgUrl).then(
      () => handleTooltipOpen(),
      () => null
    );
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 30,
        paddingTop: 30,
        paddingBottom: 30,
      }}
    >
      <input type="file" accept="image/*" onChange={handleFileInputChange} />
      <img alt="" style={{ maxWidth: 300, maxHeight: 300 }} src={imgUrl} />
      <TextField label="Base64 URL" multiline rows={4} value={imgUrl} />
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title="Copied"
        >
          <Button variant="contained" onClick={copyUrl}>
            Copy
          </Button>
        </Tooltip>
      </ClickAwayListener>
    </Container>
  );
}
