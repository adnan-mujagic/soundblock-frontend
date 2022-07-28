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

function Header({ token, setToken }) {
  const navigate = useNavigate();
  const [installMetamaskDialogOpen, setInstallMetamaskDialogOpen] =
    useState(false);

  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuIconClick = () => {
    setOpenMenu(!openMenu);
  };

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
      <CollapsableMenu open={openMenu} />
    </React.Fragment>
  );
}

const iconStyle = {
  cursor: "pointer",
  color: colors.green,
};

export default Header;
