import React from "react";

function DefaultCover({ backround }) {
  const defaultCoverStyle = {
    height: "100%",
    width: "100%",
    backgroundColor: backround,
  };

  return <div style={defaultCoverStyle}>DefaultCover</div>;
}

export default DefaultCover;
