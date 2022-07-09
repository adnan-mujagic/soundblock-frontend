import React, { useEffect, useState } from "react";
import AudioOptionsController from "../../components/AudioOptionsController/AudioOptionsController";
import ContentType from "../../components/ContentType/ContentType";
import DefaultAlert from "../../components/DefaultAlert/DefaultAlert";
import EmptyContent from "../../components/EmptyContent/EmptyContent";
import Header from "../../components/Header";
import Loading from "../../components/Loading/Loading";
import Sidebar from "../../components/Sidebar/Sidebar";
import SongCard from "../../components/SongCard";
import dateToGreeting from "../../utils/dateToGreeting";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import typography from "../../utils/typography";
import styles from "./Explore.module.scss";

function Explore({ audio, audioDetails, setAudioDetails, token, setToken }) {
  const [songsToExplore, setSongsToExplore] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    async function getSongsToExplore() {
      setLoading(true);
      const response = await fetchDataWithAuth(
        "/songs/getSongsToExplore",
        "GET"
      );
      if (response?.data) {
        setSongsToExplore(response.data);
      }
      setLoading(false);
      setMessage(response.message);
      setAlertOpen(true);
    }
    getSongsToExplore();
  }, []);

  return (
    <div className={styles.explore}>
      <Header token={token} setToken={setToken} />
      <div className={styles["content-wrapper"]}>
        <Sidebar audioDetails={audioDetails} />
        {message && (
          <DefaultAlert
            message={message}
            open={alertOpen}
            setOpen={setAlertOpen}
          />
        )}
        <div className={styles["main-content-wrapper"]}>
          <ContentType contentType={"Explore"} />
          <div style={{ fontSize: typography.header, marginTop: "20px" }}>
            {`Good ${dateToGreeting()}, here are some new songs to explore...`}
            <div className={styles["explore-container"]}>
              {songsToExplore && !loading ? (
                songsToExplore.map((song, index) => {
                  return (
                    <SongCard
                      audio={audio}
                      audioDetails={audioDetails}
                      setAudioDetails={setAudioDetails}
                      key={index}
                      song={song}
                      canBuy={!!song?.price}
                    />
                  );
                })
              ) : (
                <Loading />
              )}
            </div>
            {!loading && songsToExplore?.length <= 0 && (
              <EmptyContent
                message="Looks like there is nothing to explore currently..."
                isAnimated={true}
              />
            )}
          </div>
        </div>
      </div>
      <AudioOptionsController
        audio={audio}
        setAudioDetails={setAudioDetails}
        audioDetails={audioDetails}
      />
    </div>
  );
}

export default Explore;
