import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import colors from "../../utils/colors";
import Separator from "../Separator/Separator";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import typography from "../../utils/typography";

function Sidebar({ audioDetails, playlists }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles["sidebar"]}
      style={{ height: `calc(92vh - ${audioDetails.source ? "102" : "1"}px)` }}
    >
      <div
        style={boxStyle}
        onClick={() => {
          navigate("/");
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
      <div
        style={boxStyle}
        onClick={() => {
          navigate("/purchase-status");
        }}
      >
        <MonitorHeartIcon style={iconStyle} />
        Purchase Status
      </div>
      <Separator />
      {playlists?.map((playlist) => {
        return (
          <div
            key={playlist._id}
            className={styles["sidebar-playlist-item"]}
            onClick={(e) => navigate("/playlists/" + playlist._id)}
          >
            {playlist.name}
          </div>
        );
      })}
    </div>
  );
}

const boxStyle = {
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  padding: "10px 0",
  marginTop: "10px",
  fontSize: typography.normal,
};

export const iconStyle = {
  paddingRight: "10px",
  fontSize: "30px",
  color: colors.green,
};

export default Sidebar;
