import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

function DefaultAlert({ message, open, setOpen }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        data-testid="default-alert-action"
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
      data-testid={"default-alert"}
      open={open}
      autoHideDuration={message.length * 100}
      onClose={handleClose}
      message={message}
      action={action}
    />
  );
}

export default DefaultAlert;
