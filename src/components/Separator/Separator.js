import React from "react";
import colors from "../../utils/colors";

function Separator({ margin = 0 }) {
  const separatorStyle = {
    borderBottom: `1px solid ${colors.border}`,
    width: "100%",
    marginTop: margin,
  };
  return <div style={separatorStyle}></div>;
}

export default Separator;
