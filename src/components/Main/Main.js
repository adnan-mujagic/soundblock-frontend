import React, { useState } from "react";
import colors from "../../utils/colors";
import contentTypes from "../../utils/contentTypes";
import typography from "../../utils/typography";
import Purchases from "../Purchases/Purchases";
import Separator from "../Separator/Separator";
import Sidebar from "../Sidebar/Sidebar";
import "./Main.css";

function Main() {
  const [contentType, setContentType] = useState("Home");

  const getContentTitle = () => {
    return (
      <div style={titleStyle}>
        #{contentType}
        <Separator margin={"16px"} />
      </div>
    );
  };

  const getContentTypeComponent = () => {
    if (contentType === contentTypes.home) {
      return <div>WIP</div>;
    } else if (contentType === contentTypes.expore) {
      return <div>WIP</div>;
    } else if (contentType === contentTypes.purchases) {
      return <Purchases />;
    } else if (contentType === contentTypes.account) {
      return <div>WIP</div>;
    }
  };

  const titleStyle = {
    fontSize: typography.title,
  };

  const wrapperStyle = {
    flex: "0.5",
    borderRight: `1px solid ${colors.border}`,
    padding: "16px",
  };

  return (
    <div className="main">
      <Sidebar setContentType={setContentType} />
      <div style={wrapperStyle}>
        {getContentTitle()}
        {getContentTypeComponent()}
      </div>
    </div>
  );
}

export default Main;
