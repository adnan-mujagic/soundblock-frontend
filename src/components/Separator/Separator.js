import React from "react";
import colors from "../../utils/colors";

function Separator() {
  return <div style={separatorStyle}></div>;
}

const separatorStyle = {
  borderBottom: `1px solid ${colors.border}`,
  width: "100%",
};

export default Separator;
