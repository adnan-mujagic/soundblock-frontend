import { styled, TextField } from "@mui/material";
import React from "react";
import colors from "../../utils/colors";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: colors.green,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: colors.green,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: colors.green,
    },
    "&:hover fieldset": {
      borderColor: colors.border,
    },
    "&.Mui-focused fieldset": {
      borderColor: colors.green,
    },
  },
});

function CustomTextField({ placeholder, variant }) {
  return (
    <div style={{ marginTop: "24px" }}>
      <CssTextField
        style={{ borderColor: colors.green }}
        label={placeholder}
        variant={variant}
        fullWidth
      />
    </div>
  );
}

export default CustomTextField;
