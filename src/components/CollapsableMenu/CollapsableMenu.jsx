import React from "react";
import PropTypes from "prop-types";
import { Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { iconStyle } from "../Sidebar/Sidebar";
import colors from "../../utils/colors";
import styles from "./CollapsableMenu.module.scss";

function Item({ text, icon, route }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        padding: "10px",
      }}
      onClick={handleClick}
    >
      <div style={{ display: "flex", alignItems: "center" }}>{icon}</div>
      {text}
    </div>
  );
}

function CollapsableMenu({ open, playlists }) {
  return (
    <Collapse data-testid="collapsable-menu" in={open}>
      <div
        data-testid="removable"
        className={styles["removable"]}
        style={{ padding: "20px", borderBottom: `1px solid ${colors.border}` }}
      >
        <Item
          data-testid="search"
          text={"Search"}
          route={"/search"}
          icon={<SearchIcon style={iconStyle} />}
        />
        <Item text={"Home"} route={"/"} icon={<HomeIcon style={iconStyle} />} />
        <Item
          data-testid="explore"
          text={"Explore"}
          route={"/explore"}
          icon={<ExploreIcon style={iconStyle} />}
        />
        <Item
          data-testid="purchases"
          text={"Purchases"}
          route={"/purchases"}
          icon={<LibraryMusicIcon style={iconStyle} />}
        />
        <Item
          data-testid="account"
          text={"Account"}
          route={"/account"}
          icon={<AccountCircleIcon style={iconStyle} />}
        />
        <Item
          data-testid="purchase-status"
          text={"Status"}
          route={"/purchase-status"}
          icon={<MonitorHeartIcon style={iconStyle} />}
        />
        {playlists?.map((playlist) => (
          <Item
            key={playlist._id}
            text={playlist.name}
            route={`/playlists/${playlist._id}`}
          />
        ))}
      </div>
    </Collapse>
  );
}

CollapsableMenu.propTypes = {
  open: PropTypes.bool,
};

export default CollapsableMenu;
