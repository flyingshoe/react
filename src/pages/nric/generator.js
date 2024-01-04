import { Button, ClickAwayListener, IconButton, Input, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

export default function Generator() {
  // Generator
  const [nric, setNric] = useState("");
  const generateNric = () => {
    const nricChars = ["J", "Z", "I", "H", "G", "F", "E", "D", "C", "B", "A"];

    // generate 7 random digits
    const randomDigits = Math.random().toString().slice(2, 9);
    let result = "S".concat(randomDigits);
    let total =
      +result[1] * 2 +
      +result[2] * 7 +
      +result[3] * 6 +
      +result[4] * 5 +
      +result[5] * 4 +
      +result[6] * 3 +
      +result[7] * 2;

    // Mod the total by 11 to get the remainder
    const remainder = total % 11;

    // Concat the right character and return the result
    return result.concat(nricChars[remainder]);
  };

  const getNric = () => {
    handleTooltipOpen()
    const nric = generateNric();
    setNric(nric);
    navigator.clipboard.writeText(nric);
  };

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <div className="tw-flex">
      <TextField label="Generate" value={nric} className="tw-grow" InputProps={{ sx: { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }} />
      <ClickAwayListener onClickAway={handleTooltipClose}>
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
            <AutoFixHighIcon />
          </Button>
        </Tooltip>
      </ClickAwayListener>
    </div>
  );
}
