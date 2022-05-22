import { Alert } from "@mui/material";
import React from "react";

function DefaultAlert({ type, message }) {
  return (
    <Alert style={defaultAlertStyle} severity={type}>
      {message}
    </Alert>
  );
}

const defaultAlertStyle = {
  position: "absolute",
  zIndex: "10",
  top: "16px",
  right: "16px",
};

export default DefaultAlert;
