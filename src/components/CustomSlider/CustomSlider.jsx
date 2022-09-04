import { Slider } from "@mui/material";
import React from "react";
import colors from "../../utils/colors";

function CustomSlider({ value, onChange }) {
  return (
    <Slider
      data-testid={"slider"}
      value={value}
      onChange={onChange}
      sx={{
        color: colors.green,
        height: 4,
        "& .MuiSlider-thumb": {
          width: 8,
          height: 8,
          transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
          "&:before": {
            boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
          },
          "&:hover, &.Mui-focusVisible": {
            boxShadow: `0px 0px 0px 8px rgb(0 0 0 / 16%)"
        `,
          },
          "&.Mui-active": {
            width: 20,
            height: 20,
          },
        },
        "& .MuiSlider-rail": {
          opacity: 0.28,
        },
      }}
    />
  );
}

export default CustomSlider;
