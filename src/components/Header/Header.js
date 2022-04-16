import React, { useState } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import "./Header.css";
import connect from "../../utils/connectWallet";
import fetchData from "../../utils/fetchData";
import SessionStorage from "../../utils/SessionStorage";
import colors from "../../utils/colors";
import { Alert } from "@mui/material";

function Header({ token, setToken }) {
  const [errorInfo, setErrorInfo] = useState(null);

  const authenticate = async () => {
    try {
      const { signer } = await connect();
      const signerAddress = await signer.getAddress();
      const data = await fetchData(
        `/users/authenticate/${signerAddress}`,
        "POST"
      );
      SessionStorage.setToken(data.token);
      setToken(data.token);
    } catch (error) {
      setErrorInfo("Something went wrong with connection");
      setTimeout(() => {
        setErrorInfo(null);
      }, 2000);
    }
  };

  return (
    <div className="header">
      {errorInfo && (
        <Alert style={alertStyle} severity="error">
          {errorInfo}
        </Alert>
      )}
      <div
        className="header-title"
        onClick={() => {
          window.location = "/";
        }}
      >
        <MusicNoteIcon style={iconStyle} />
        SoundBlock
      </div>
      <div className="header-wallet-section">
        {token === null ? (
          <AccountBalanceWalletIcon
            style={iconStyle}
            onClick={() => {
              authenticate();
            }}
          />
        ) : (
          <LogoutIcon
            style={iconStyle}
            onClick={() => {
              SessionStorage.removeToken();
              setToken(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

const iconStyle = {
  cursor: "pointer",
  color: colors.green,
};

const alertStyle = {
  position: "absolute",
  zIndex: "10",
  top: "16px",
  right: "16px",
};

export default Header;
