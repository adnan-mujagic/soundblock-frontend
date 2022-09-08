import React from "react";
import { defaultSongImage } from "../../utils/defaultImage";
import styles from "./SoldSong.module.scss";

function SoldSong({ soldItem }) {
  return (
    <div data-testid="sold-song" className={styles["sold-song"]}>
      <div
        style={{
          aspectRatio: "1/1",
          backgroundImage: `url(${soldItem.song.image ?? defaultSongImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          flex: "0.5",
          border: "1px solid rgb(35, 39, 42)",
          marginRight: "20px",
        }}
        className="image-container"
      ></div>
      <div style={{ flex: "0.5" }}>
        <p
          data-testid={"number-of-sales"}
          className={styles["number-of-sales"]}
        >
          # SALES {soldItem.count}
        </p>
        <p className={styles["sold-song-default-paragraph"]}>
          {soldItem.song.name}
        </p>
        <div>
          <p className={styles["sold-song-default-paragraph"]}>EARNINGS</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
              style={{ height: "20px", marginRight: "8px" }}
              alt="Ethereum logo"
            />
            <p
              data-testid={"total-earned"}
              style={{ margin: 0, fontSize: "16px" }}
            >
              {soldItem.totalEarned}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SoldSong;
