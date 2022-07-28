import React from "react";
import PropTypes from "prop-types";
import colors from "../../utils/colors";
import typography from "../../utils/typography";

function AnchorButton({ text, link, display = "block" }) {
  return (
    <a
      style={{
        backgroundColor: colors.green,
        padding: "12px",
        display: display,
        borderRadius: "4px",
        textDecoration: "none",
        fontSize: typography.normal,
        color: "white",
      }}
      target={"_blank"}
      href={link}
    >
      {text}
    </a>
  );
}

AnchorButton.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default AnchorButton;
