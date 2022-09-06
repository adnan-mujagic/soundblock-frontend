import React, { useEffect, useState } from "react";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import typography from "../../utils/typography";
import DefaultAlert from "../../components/DefaultAlert/DefaultAlert";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import styles from "./Purchases.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import ContentType from "../../components/ContentType/ContentType";
import EmptyContent from "../../components/EmptyContent/EmptyContent";
import dateToGreeting from "../../utils/dateToGreeting";
import SongsDatatable from "../../components/SongsDatatable";
import AudioOptionsController from "../../components/AudioOptionsController";

function Purchases({
  audio,
  setAudio,
  audioDetails,
  setAudioDetails,
  token,
  setToken,
  queue,
  setQueue,
  playlists,
  getOwnPlaylists,
  previous,
  next,
  randomNext,
}) {
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

        setPurchases(response.data.map((purchase) => purchase.song));
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
      <Header token={token} setToken={setToken} playlists={playlists} />
      <div className={styles["content-container"]}>
        <Sidebar audioDetails={audioDetails} playlists={playlists} />
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
            <div
              style={{
                fontSize: typography.header,
                marginTop: "20px",
                marginBottom: "50px",
              }}
            >
              {`Good ${dateToGreeting()}${
                purchases?.length > 0 ? ", here are your purchased songs" : ""
              }`}
              {purchases && (
                <div
                  style={{
                    marginBottom: purchases.length === 0 ? "20px" : "0",
                  }}
                >
                  <SongsDatatable
                    songs={purchases}
                    audio={audio}
                    setAudio={setAudio}
                    audioDetails={audioDetails}
                    setAudioDetails={setAudioDetails}
                    playlists={playlists}
                    getOwnPlaylists={getOwnPlaylists}
                  />
                </div>
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
        queue={queue}
        setQueue={setQueue}
        audio={audio}
        setAudioDetails={setAudioDetails}
        audioDetails={audioDetails}
        previous={previous}
        next={next}
        randomNext={randomNext}
      />
    </div>
  );
}

export default Purchases;
