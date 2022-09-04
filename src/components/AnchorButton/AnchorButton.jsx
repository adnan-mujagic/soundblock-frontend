import React from "react";
import PropTypes from "prop-types";
import colors from "../../utils/colors";
import typography from "../../utils/typography";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

function AnchorButton({ style, text, link }) {
  return (
    <a
      data-testid="anchor-button"
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        fontSize: typography.normal,
        color: colors.text,
      }}
      target={"_blank"}
      href={link}
    >
      <InsertLinkIcon style={{ marginRight: "5px" }} />
      {text}
    </a>
  );
}

AnchorButton.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default AnchorButton;
