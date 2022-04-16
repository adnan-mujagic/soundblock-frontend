import React from "react";
import "./Sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

import colors from "../../utils/colors";
import Separator from "../Separator/Separator";
import contentTypes from "../../utils/contentTypes";
function Sidebar({ setContentType }) {
  const handleContentTypeChange = (type) => {
    setContentType(type);
  };

  return (
    <div className="sidebar">
      <div
        style={boxStyle}
        onClick={() => {
          handleContentTypeChange(contentTypes.home);
        }}
      >
        <HomeIcon style={iconStyle} />
        Home
      </div>
      <div
        style={boxStyle}
        onClick={() => {
          handleContentTypeChange(contentTypes.expore);
        }}
      >
        <ExploreIcon style={iconStyle} />
        Explore
      </div>
      <div
        style={boxStyle}
        onClick={() => {
          handleContentTypeChange(contentTypes.purchases);
        }}
      >
        <LibraryMusicIcon style={iconStyle} />
        Your Purchases
      </div>
      <div
        style={boxStyle}
        onClick={() => {
          handleContentTypeChange(contentTypes.account);
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
