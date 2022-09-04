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
      borderColor: colors.green,
    },
    "&.Mui-focused fieldset": {
      borderColor: colors.green,
    },
  },
});

function CustomTextField({
  placeholder,
  variant,
  text,
  setText,
  testId = null,
}) {
  return (
    <div style={{ marginTop: "24px" }}>
      <CssTextField
        data-testid={testId === null ? "text-field" : testId}
        style={{ borderColor: colors.green }}
        label={placeholder}
        variant={variant}
        fullWidth
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
    </div>
  );
}

export default CustomTextField;
