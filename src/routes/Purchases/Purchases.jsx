import React, { useEffect, useState } from "react";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import typography from "../../utils/typography";
import DefaultAlert from "../../components/DefaultAlert/DefaultAlert";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import SongCard from "../../components/SongCard";
import styles from "./Purchases.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import ContentType from "../../components/ContentType/ContentType";

function Purchases({ token, setToken }) {
  const [purchases, setPurchases] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    text: null,
    isSuccess: true,
  });

  useEffect(() => {
    async function getPurchases() {
      setLoading(true);
      const response = await fetchDataWithAuth(
        "/users/songs/getPurchasedSongs",
        "GET"
      );
      if (response?.data) {
        showAlert(response?.message, true);
        setPurchases(response.data);
      } else {
        showAlert(response?.message, false);
      }
      setLoading(false);
    }
    getPurchases();
  }, []);

  const showAlert = (message, isSuccess) => {
    setMessage({
      text: message,
      isSuccess: true,
    });

    setTimeout(() => {
      setMessage({
        text: null,
        isSuccess: isSuccess,
      });
    }, 2000);
  };

  const dateToGreeting = () => {
    const hour = new Date().getUTCHours();
    if (hour > 2 && hour < 12) {
      return "morning";
    } else if (hour > 12 && hour < 6) {
      return "afternoon";
    }
    return "evening";
  };

  return (
    <div className={styles.purchases}>
      <Header />
      <div className={styles["content-container"]}>
        <Sidebar />
        {message?.text && (
          <DefaultAlert
            message={message.text}
            severity={message?.isSuccess ? "success" : "error"}
          />
        )}
        {loading ? (
          <Loading />
        ) : (
          <div className={styles["main-content-wrapper"]}>
            <ContentType contentType={"Purchases"} />
            <div style={{ fontSize: typography.header }}>
              {`Good ${dateToGreeting()}, here are your purchased songs`}
              <div className={styles["purchase-container"]}>
                {purchases &&
                  purchases.map((purchase, index) => {
                    return <SongCard key={index} song={purchase} />;
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Purchases;
