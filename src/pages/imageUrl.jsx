import {
  Button,
  ClickAwayListener,
  Container,
  Grid,
  TextField,
  Tooltip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
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
      className="flex flex-col h-full gap-8 justify-center"
    >
      <img alt="" className="max-w-72 max-h-72" src={imgUrl} />
      <TextField
        label="Base64 URL"
        multiline
        rows={4}
        value={imgUrl}
        sx={{
          "& .MuiInputBase-input": {
            overflowX: "hidden",
          },
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            size="large"
            fullWidth
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileInputChange}
            />
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
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
              <Button
                variant="outlined"
                color="secondary"
                onClick={copyUrl}
                startIcon={<ContentCopyIcon />}
                size="large"
                fullWidth
              >
                Copy Data URL
              </Button>
            </Tooltip>
          </ClickAwayListener>
        </Grid>
      </Grid>
    </Container>
  );
}
