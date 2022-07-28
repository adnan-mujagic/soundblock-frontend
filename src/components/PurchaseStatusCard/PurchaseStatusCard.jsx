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
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <EthereumLogo />
            <div style={{ marginLeft: "5px", fontSize: typography.normal }}>
              {purchase.song.price}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ fontSize: typography.normal, marginRight: "5px" }}>
              STATUS
            </div>
            <div
              style={{ fontSize: typography.normal, color: getStatusColor() }}
            >
              {purchase.status}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "5px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <AnchorButton
            text={"Transaction Link"}
            link={purchase.purchaseTransactionLink}
          />
          <AnchorButton
            text={"Owner Transaction Link"}
            link={purchase.purchaseTransactionLink}
          />
        </div>
      </div>
    </div>
  );
}

export default PurchaseStatusCard;
