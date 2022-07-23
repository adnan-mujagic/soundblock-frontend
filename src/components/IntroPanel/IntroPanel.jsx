import React from "react";
import PropTypes from "prop-types";
import styles from "./IntroPanel.module.scss";
import CustomButtonFilled from "../CustomButtonFilled";

function IntroPanel({
  title,
  text,
  imageUrl,
  imagePosition = "right",
  moreDetailsLink = null,
}) {
  return (
    <div
      className={styles["intro-panel"]}
      style={{
        flexDirection: imagePosition === "left" ? "row-reverse" : "row",
      }}
    >
      <div className={styles["text-content"]}>
        <div className={styles["topic-title"]}>{title}</div>
        <div className={styles["topic-text"]}>{text}</div>
        {moreDetailsLink && (
          <CustomButtonFilled
            style={{ marginTop: "24px" }}
            onClick={() => {
              window.location = moreDetailsLink;
            }}
            text="More details"
          />
        )}
      </div>
      <div
        style={{
          flex: 0.5,
          aspectRatio: "16/9",
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderRadius: "8px",
          boxShadow: "-1px 0px 10px 3px rgba(0, 0, 0, 0.33)",
          marginRight: imagePosition === "left" ? "50px" : "0",
          marginLeft: imagePosition === "left" ? "0" : "50px",
          transform: `skewY(3deg)`,
        }}
      />
    </div>
  );
}

IntroPanel.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  imagePosition: PropTypes.oneOf(["left", "right"]),
};

export default IntroPanel;
