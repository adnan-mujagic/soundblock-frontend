import React from "react";
import typography from "../../utils/typography";
import Separator from "../Separator/Separator";

function ContentType({ contentType }) {
  const titleStyle = {
    fontSize: typography.title,
  };
  return (
    <div style={titleStyle}>
      #{contentType}
      <Separator margin={"16px"} />
    </div>
  );
}

export default ContentType;
