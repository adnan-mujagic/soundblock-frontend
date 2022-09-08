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
import Loading from "../Loading/Loading";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";

function Header({ token, setToken, playlists, audio, setPlaylists }) {
  const navigate = useNavigate();
  const [installMetamaskDialogOpen, setInstallMetamaskDialogOpen] =
    useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");

  const handleMenuIconClick = () => {
    setOpenMenu(!openMenu);
  };

  const authenticate = async () => {
    try {
      setLoginStatus("Getting Metamask wallet address...");
      const { signer } = await connect();
      const signerAddress = await signer.getAddress();

      setLoginStatus("Authenticating wallet address...");
      const data = await fetchData(
        `/users/authenticate/${signerAddress}`,
        "POST"
      );
      SessionStorage.setToken(data.token);
      setLoginStatus("Getting user playlists...");
      await getUserPlaylists();
      setToken(data.token);
    } catch (error) {
      if (error.message === "Metamask required") {
        setInstallMetamaskDialogOpen(true);
      }
    }
    setLoginStatus("");
  };

  const getUserPlaylists = async () => {
    const response = await fetchDataWithAuth(
      "/users/playlists/getPlaylists",
      "GET"
    );
    if (response.data) {
      setPlaylists(response.data);
    }
  };

  const disconnect = () => {
    audio.pause();
    SessionStorage.removeToken();
    setToken(null);
    navigate("/");
  };

  const LoggingInAlert = ({ status }) => {
    return (
      <div className={styles["logging-in-alert"]}>
        <Loading /> <span className={styles["loggin-in-text"]}>{status}</span>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div data-testid={"header"} className={styles.header}>
        {loginStatus && <LoggingInAlert status={loginStatus} />}
        <InstallMetamaskInstructions
          open={installMetamaskDialogOpen}
          setOpen={setInstallMetamaskDialogOpen}
        />
        <div
          className={styles["header-title"]}
          onClick={() => {
            navigate("/");
          }}
        >
          <MusicNoteIcon style={iconStyle} />
          Rattle
        </div>
        <div className={styles["header-wallet-section"]}>
          {token === null ? (
            <AccountBalanceWalletIcon
              data-testid={"header-wallet-icon"}
              style={iconStyle}
              onClick={authenticate}
            />
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <LogoutIcon
                data-testid={"header-logout-icon"}
                style={iconStyle}
                onClick={disconnect}
              />
              <div className={styles["header-sidebar-expand-button"]}>
                <MenuIcon style={iconStyle} onClick={handleMenuIconClick} />
              </div>
            </div>
          )}
        </div>
      </div>
      {token && <CollapsableMenu open={openMenu} playlists={playlists} />}
    </React.Fragment>
  );
}

const iconStyle = {
  cursor: "pointer",
  color: colors.green,
};

export default Header;
