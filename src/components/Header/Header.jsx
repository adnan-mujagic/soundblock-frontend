import React, { useState } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import connect from "../../utils/connectWallet";
import fetchData from "../../utils/fetchData";
import SessionStorage from "../../utils/SessionStorage";
import colors from "../../utils/colors";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import InstallMetamaskInstructions from "../InstallMetamaskInstructions";
import CollapsableMenu from "../CollapsableMenu";

function Header({ token, setToken, playlists }) {
  const navigate = useNavigate();
  const [installMetamaskDialogOpen, setInstallMetamaskDialogOpen] =
    useState(false);

  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuIconClick = () => {
    setOpenMenu(!openMenu);
  };

  const authenticate = async (withMetamask = true) => {
    try {
      let signerAddress;
      if (withMetamask) {
        const { signer } = await connect();
        signerAddress = await signer.getAddress();
      } else {
        signerAddress = "123test";
      }

      const data = await fetchData(
        `/users/authenticate/${signerAddress}`,
        "POST"
      );
      SessionStorage.setToken(data.token);
      setToken(data.token);
    } catch (error) {
      if (error.message === "Metamask required") {
        setInstallMetamaskDialogOpen(true);
      }
    }
  };

  const disconnect = () => {
    SessionStorage.removeToken();
    setToken(null);
    navigate("/");
  };

  console.log(process.env);
  console.log(process.env.NODE_ENV);

  return (
    <React.Fragment>
      <div className={styles.header}>
        <InstallMetamaskInstructions
          open={installMetamaskDialogOpen}
          setOpen={setInstallMetamaskDialogOpen}
        />
        <div
          className={styles["header-title"]}
          onClick={() => {
            window.location = "/";
          }}
        >
          <MusicNoteIcon style={iconStyle} />
          Rattle
        </div>
        <div className={styles["header-wallet-section"]}>
          {token === null ? (
            <AccountBalanceWalletIcon
              style={iconStyle}
              onClick={authenticate}
            />
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <LogoutIcon style={iconStyle} onClick={disconnect} />
              <div className={styles["header-sidebar-expand-button"]}>
                <MenuIcon style={iconStyle} onClick={handleMenuIconClick} />
              </div>
            </div>
          )}
        </div>
      </div>
      {process.env.NODE_ENV !== "production" &&
        process.env.NODE_ENV !== "staging" &&
        token === null && (
          <button onClick={() => authenticate(false)}>TEST</button>
        )}
      {token && <CollapsableMenu open={openMenu} playlists={playlists} />}
    </React.Fragment>
  );
}

const iconStyle = {
  cursor: "pointer",
  color: colors.green,
};

export default Header;
