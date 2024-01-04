import { ContentCopy } from "@mui/icons-material";
import { Button, ClickAwayListener, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";

export default function CheckSum() {
  // Validator
  const [checksum, setChecksum] = useState("");
  const [nric, setNric] = useState("");
  const getChecksum = (e) => {
    const val = e.target.value.toString();
    setNric(val)
    const nricFormat = /^\d{7}$/g;
    const nricChars = ["J", "Z", "I", "H", "G", "F", "E", "D", "C", "B", "A"];

    // First check if the NRIC is even in the right format to begin with
    if (nricFormat.test(val)) {
      // Calcualte the total of all digits
      let total =
        +val[0] * 2 +
        +val[1] * 7 +
        +val[2] * 6 +
        +val[3] * 5 +
        +val[4] * 4 +
        +val[5] * 3 +
        +val[6] * 2;

      // Newer NRIC/FIN numbers need to be offset
      if (val[0] === "T" || val[0] === "G") {
        total += 4;
      } else if (val[0] === "M") {
        total += 3;
      }

      // Mod the total by 11 to get the remainder
      const remainder = total % 11;
      setChecksum(nricChars[remainder]);
    } else {
      setChecksum("");
    }
  };


  const [open, setOpen] = useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const getNric = () => {
    handleTooltipOpen()
    navigator.clipboard.writeText(`S${nric}${checksum}`);
  };


  return (
    <div className="tw-flex">
      <TextField
        label="Checksum"
        onInput={getChecksum}
        inputProps={{
          maxLength: 7,
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start" ><Typography sx={{ color: "primary.main", fontWeight: 600 }}>S</Typography></InputAdornment>,
          endAdornment: <InputAdornment position="start"><span className="tw-font-bold tw-text-red-500 tw-text-2xl">{checksum}</span></InputAdornment>,
          sx: { borderTopRightRadius: 0, borderBottomRightRadius: 0 }
        }}
      />
      <ClickAwayListener onClickAway={handleTooltipClose} style={{ flex: 1 }}>
        <Tooltip
          title="NRIC copied to clipboard!"
          placement="top"
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
        >
          <Button variant="contained" onClick={getNric} sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
            <ContentCopy />
          </Button>
        </Tooltip>
      </ClickAwayListener>
    </div>
  );
}
