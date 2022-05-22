import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import colors from "../../utils/colors";
import Separator from "../Separator/Separator";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.scss";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className={styles["sidebar"]}>
      <div
        style={boxStyle}
        onClick={() => {
          navigate("/home");
        }}
      >
        <HomeIcon style={iconStyle} />
        Home
      </div>
      <div
        style={boxStyle}
        onClick={() => {
          navigate("/explore");
        }}
      >
        <ExploreIcon style={iconStyle} />
        Explore
      </div>
      <div
        style={boxStyle}
        onClick={() => {
          navigate("/purchases");
        }}
      >
        <LibraryMusicIcon style={iconStyle} />
        Your Purchases
      </div>
      <div
        style={boxStyle}
        onClick={() => {
          navigate("/account");
        }}
      >
        <AccountCircleIcon style={iconStyle} />
        Account
      </div>
      <Separator />
    </div>
  );
}

const boxStyle = {
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  padding: "16px 0",
  marginTop: "16px",
};

const iconStyle = {
  paddingRight: "10px",
  fontSize: "30px",
  color: colors.green,
};

export default Sidebar;
