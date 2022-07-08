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
import colors from "../../utils/colors";
import EmptyContent from "../../components/EmptyContent/EmptyContent";
import dateToGreeting from "../../utils/dateToGreeting";
import SongsDatatable from "../../components/SongsDatatable";
import AudioOptionsController from "../../components/AudioOptionsController";

function Purchases({ audio, audioDetails, setAudioDetails, token, setToken }) {
  const [purchases, setPurchases] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function getPurchases() {
      setLoading(true);
      const response = await fetchDataWithAuth(
        "/users/songs/getPurchasedSongs",
        "GET"
      );
      if (response?.data) {
        setMessage(response.message);
        setSnackbarOpen(true);

        setPurchases(response.data);
      } else {
        setMessage(response.message);
        setSnackbarOpen(true);
      }
      setLoading(false);
    }
    getPurchases();
  }, []);

  return (
    <div className={styles.purchases}>
      <Header token={token} setToken={setToken} />
      <div className={styles["content-container"]}>
        <Sidebar audioDetails={audioDetails} />
        {message && (
          <DefaultAlert
            message={message}
            open={snackbarOpen}
            setOpen={setSnackbarOpen}
          />
        )}
        {loading ? (
          <Loading margin />
        ) : (
          <div className={styles["main-content-wrapper"]}>
            <ContentType contentType={"Purchases"} />
            <div style={{ fontSize: typography.header, marginTop: "20px" }}>
              {`Good ${dateToGreeting()}, here are your purchased songs`}
              {purchases && (
                <SongsDatatable
                  songs={purchases}
                  audio={audio}
                  audioDetails={audioDetails}
                  setAudioDetails={setAudioDetails}
                />
              )}
              {purchases?.length <= 0 && (
                <EmptyContent
                  message="Looks like you don't have any purchases yet"
                  isAnimated={true}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <AudioOptionsController
        audio={audio}
        setAudioDetails={setAudioDetails}
        audioDetails={audioDetails}
      />
    </div>
  );
}

export default Purchases;
