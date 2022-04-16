import React, { useState } from "react";
import contentTypes from "../../utils/contentTypes";
import Sidebar from "../Sidebar/Sidebar";
import "./Main.css";

function Main() {
  const [contentType, setContentType] = useState("Home");

  const generateContentType = () => {
    return <div>{contentType}</div>;
  };

  return (
    <div className="main">
      <Sidebar setContentType={setContentType} />
      {generateContentType()}
    </div>
  );
}

export default Main;
