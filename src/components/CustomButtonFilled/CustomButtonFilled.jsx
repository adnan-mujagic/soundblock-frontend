import { Button, styled } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import colors from "../../utils/colors";

const CustomButton = styled(Button)({
  backgroundColor: colors.green,

  "&:hover": {
    backgroundColor: colors.green,
  },
});

function CustomButtonFilled({
  onClick,
  startIcon = null,
  text,
  disabled = false,
  style = null,
}) {
  return (
    <CustomButton
      style={style ?? style}
      variant="contained"
      onClick={onClick}
      startIcon={startIcon ? startIcon : null}
      disabled={disabled}
    >
      {text}
    </CustomButton>
  );
}

CustomButtonFilled.propTypes = {
  onClick: PropTypes.func.isRequired,
  startIcon: PropTypes.element,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default CustomButtonFilled;
