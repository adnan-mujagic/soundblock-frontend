import React from "react";
import getDefaultUserImageUrl from "../../utils/getDefaultUserImageUrl";
import PropTypes from "prop-types";
import styles from "./AccountHeader.module.scss";
import shortenString from "../../utils/shortenString";
import colors from "../../utils/colors";

function AccountHeader({ artistAddress, username, imageUrl, numberOfSongs }) {
  return (
    <div className={styles["account-header"]}>
      <div
        style={{
          aspectRatio: "1 / 1",
          backgroundImage: !!imageUrl
            ? `url(${imageUrl})`
            : `url(${getDefaultUserImageUrl()})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "200px",
          borderRadius: "8px",
          marginBottom: "20px",
          boxShadow: "4px 4px 22px 0px rgba(0,0,0,0.56)",
        }}
      />
      <div className={styles["user-data"]}>
        {shortenString(!!username ? username : artistAddress, 20)}
        {!!username && (
          <div
            data-testid="account-address-bar"
            className={styles["account-address-bar"]}
          >
            {shortenString(artistAddress, 20)}
          </div>
        )}
        <div
          data-testid="number-of-songs"
          className={styles["number-of-songs"]}
        >
          Number of songs: {numberOfSongs}
        </div>
      </div>
    </div>
  );
}

AccountHeader.propTypes = {
  artistAddress: PropTypes.string.isRequired,
  username: PropTypes.string,
  imageUrl: PropTypes.string,
  numberOfSongs: PropTypes.number,
};

export default AccountHeader;
