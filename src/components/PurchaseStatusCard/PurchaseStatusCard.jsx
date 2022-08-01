import React from "react";
import colors from "../../utils/colors";
import { defaultSongImage } from "../../utils/defaultImage";
import typography from "../../utils/typography";
import AnchorButton from "../AnchorButton";
import EthereumLogo from "../EthereumLogo";
import styles from "./PurchaseStatusCard.module.scss";

function PurchaseStatusCard({ purchase }) {
  console.log(purchase);

  const getStatusColor = () => {
    if (purchase.status === "SUCCESSFUL") {
      return colors.green;
    } else if (purchase.status === "PENDING") {
      return colors.warning;
    }
    return colors.error;
  };

  return (
    <div className={styles["purchase-status-card"]}>
      <div
        style={{
          backgroundImage: `url(${purchase.song.cover ?? defaultSongImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          aspectRatio: "1 / 1",
        }}
      ></div>
      <div className={styles["purchase-status-cart-info"]}>
        <div>{purchase.song.name}</div>

        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <EthereumLogo />
          <div style={{ marginLeft: "5px", fontSize: typography.normal }}>
            {purchase.song.price}
          </div>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <div style={{ fontSize: typography.normal, marginRight: "5px" }}>
            Status
          </div>
          <div style={{ fontSize: typography.normal, color: getStatusColor() }}>
            {purchase.status}
          </div>
        </div>

        <AnchorButton
          style={{ margin: "10px 0" }}
          text={"Transaction"}
          link={purchase.purchaseTransactionLink}
        />
        <AnchorButton
          text={"Owner transaction"}
          link={purchase.purchaseTransactionLink}
        />
      </div>
    </div>
  );
}

export default PurchaseStatusCard;
