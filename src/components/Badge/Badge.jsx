import React from "react";
import colors from "../../utils/colors";
import typography from "../../utils/typography";

function Badge({ title, backgroundColor, link = null, label = null }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      style={{
        cursor: link ? "pointer" : "default",
        display: "flex",
        alignItems: "center",
        fontSize: typography.tiny,
        marginRight: "10px",
        color: "white",
        borderRadius: "4px",
        overflow: "hidden",
        textDecoration: "none",
      }}
    >
      {label && (
        <div style={{ backgroundColor: colors.text, padding: "5px" }}>
          {label}
        </div>
      )}
      <div
        style={{
          backgroundColor: backgroundColor,
          color: "white",
          padding: "5px",
        }}
      >
        {title}
      </div>
    </a>
  );
}

export default Badge;
