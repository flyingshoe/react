import { Input, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
export default function Validator() {
  // Validator
  const [isValid, setIsValid] = useState(undefined);
  const checkNric = (val) => {
    const nricFormat = /^[STFGM]\d{7}[A-Z]$/g;
    const nricChars = ["J", "Z", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
    const finChars = ["X", "W", "U", "T", "R", "Q", "P", "N", "M", "L", "K"];

    // First check if the NRIC is even in the right format to begin with
    if (nricFormat.test(val)) {
      // Calcualte the total of all digits
      let total =
        +val[1] * 2 +
        +val[2] * 7 +
        +val[3] * 6 +
        +val[4] * 5 +
        +val[5] * 4 +
        +val[6] * 3 +
        +val[7] * 2;

      // Newer NRIC/FIN numbers need to be offset
      if (val[0] === "T" || val[0] === "G") {
        total += 4;
      } else if (val[0] === "M") {
        total += 3;
      }

      // Mod the total by 11 to get the remainder
      const remainder = total % 11;

      // Remainder will correspond to an alphabet
      // First check for NRIC
      if (val[0] === "S" || val[0] === "T") {
        return val[8] === nricChars[remainder];
      }
      // The rest should be FIN
      else {
        return val[8] === finChars[remainder];
      }
    }
    return false;
  };

  const validateNric = (e) => {
    e.target.value = e.target.value.toUpperCase();
    const { value: val } = e.target;
    setIsValid(val.length === 9 ? checkNric(val) : undefined);
  };

  const renderSuffix = () => {
    return isValid === undefined ? (
      <ContactEmergencyIcon />
    ) : isValid ? (
      <CheckIcon style={{ color: "green" }} />
    ) : (
      <CloseIcon style={{ color: "red" }} />
    );
  };

  return (
    <TextField
      label="Validate"
      onInput={validateNric}
      inputProps={{
        maxLength: 9,
      }}
      InputProps={{
        endAdornment: <InputAdornment position="end">{renderSuffix()}</InputAdornment>,
      }}
      error={isValid !== false ? undefined : "error"}
      color={isValid === true ? "success" : "primary"}
    />
  );
}
