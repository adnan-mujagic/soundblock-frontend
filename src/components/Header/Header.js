import React, { useState } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import "./Header.css";
import { ethers } from "ethers";
import fetchData from "../../utils/fetchData";

function Header() {
  const [errorInfo, setErrorInfo] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setErrorInfo(
        "Looks like you don't have a wallet, please consider installing one!"
      );
      setTimeout(() => {
        setErrorInfo(null);
      }, 2500);
    } else {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const signerAddress = await signer.getAddress();
        console.log(signerAddress);
        const data = await fetchData(
          `/users/authenticate/${signerAddress}`,
          "POST"
        );
        console.log(data);
      } catch (error) {}
    }
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
        <AccountBalanceWalletIcon
          color="primary"
          style={{ cursor: "pointer" }}
          onClick={() => connectWallet()}
        />
      </div>
    </div>
  );
}

export default Header;
