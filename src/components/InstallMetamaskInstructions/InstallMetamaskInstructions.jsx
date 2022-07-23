import { Dialog, DialogActions, IconButton, Tooltip } from "@mui/material";
import React from "react";
import colors from "../../utils/colors";
import typography from "../../utils/typography";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./InstallMetamaskInstructions.module.scss";

function InstallMetamaskInstructions({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open}>
      <div style={{ padding: "24px" }}>
        <div style={{ fontSize: typography.title, color: colors.green }}>
          Metamask required
        </div>
        <div style={{ marginTop: "24px", display: "flex" }}>
          <div className={styles["metamask-explanation"]}>
            As most Web3 applications out there, we make use of wallets in order
            to perform some functions, including log in and registration.
            <br />
            <br /> In order to continue using the application, please install
            the Metamask extension to your browser and create/import an account.
            It is very easy to do and completely free, just follow the
            instructions at the link given below.
            <a
              target="_blank"
              href="https://metamask.io/"
              className={styles["metamask-link"]}
            >
              Metamask Installation Guide
            </a>
          </div>
          <div className={styles["metamask-picture"]}></div>
        </div>

        <div className={styles["close-icon-button"]}>
          <Tooltip title="Close">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </Dialog>
  );
}

export default InstallMetamaskInstructions;
