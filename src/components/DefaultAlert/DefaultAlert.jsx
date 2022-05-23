import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

function DefaultAlert({ message, color, open, setOpen }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={message.length * 100}
      onClose={handleClose}
      message={message}
      action={action}
    />
  );
}

const defaultAlertStyle = {
  position: "absolute",
  zIndex: "10",
  top: "16px",
  right: "16px",
};

export default DefaultAlert;
