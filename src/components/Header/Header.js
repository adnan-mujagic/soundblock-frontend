import React, { useState } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import "./Header.css";
import connect from "../../utils/connectWallet";
import fetchData from "../../utils/fetchData";
import SessionStorage from "../../utils/SessionStorage";

function Header({ token, setToken }) {
  const [errorInfo, setErrorInfo] = useState(null);

  const authenticate = async () => {
    const { provider, signer } = await connect();
    const signerAddress = await signer.getAddress();
    const data = await fetchData(
      `/users/authenticate/${signerAddress}`,
      "POST"
    );
    SessionStorage.setToken(data.token);
    setToken(data.token);
  };

  return (
    <div className="header">
      <div
        className="header-title"
        onClick={() => {
          window.location = "/";
        }}
      >
        <MusicNoteIcon color="primary" />
        SoundBlock
      </div>
      <div className="header-wallet-section">
        {token === null ? (
          <AccountBalanceWalletIcon
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              authenticate();
            }}
          />
        ) : (
          <LogoutIcon
            color="primary"
            style={{ cursor: "pointer" }}
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

export default Header;
