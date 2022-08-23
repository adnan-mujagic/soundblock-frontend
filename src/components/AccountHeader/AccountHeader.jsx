import React from "react";
import getDefaultUserImageUrl from "../../utils/getDefaultUserImageUrl";
import PropTypes from "prop-types";
import styles from "./AccountHeader.module.scss";

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
          borderRadius: "50%",
          marginBottom: "20px",
        }}
      />
      <div className={styles["user-data"]}>
        {!!username ? username : artistAddress}
        {!!username && (
          <div className={styles["account-address-bar"]}>{artistAddress}</div>
        )}
        <div className={styles["number-of-songs"]}>
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
