import React, { useEffect, useState } from "react";
import ContentType from "../../components/ContentType/ContentType";
import CustomButtonFilled from "../../components/CustomButtonFilled";
import DefaultAlert from "../../components/DefaultAlert/DefaultAlert";
import PublishIcon from "@mui/icons-material/Publish";
import Header from "../../components/Header";
import Loading from "../../components/Loading/Loading";
import Sidebar from "../../components/Sidebar/Sidebar";
import SongUploadDialog from "../../components/SongUploadDialog";
import dateToGreeting from "../../utils/dateToGreeting";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import typography from "../../utils/typography";
import SongCard from "./../../components/SongCard";
import styles from "./Account.module.scss";
import EmptyContent from "../../components/EmptyContent/EmptyContent";

function Account({ audio, audioDetails, setAudioDetails, token, setToken }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [songUploadModalOpen, setSongUploadModalOpen] = useState(false);

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      fetchDataWithAuth("/users", "GET")
        .then((res) => {
          if (res?.data) {
            setUser(res.data);
          }
          return res.data._id;
        })
        .then((artistId) => {
          return fetchDataWithAuth(`/songs/getByArtist?artistId=${artistId}`);
        })
        .then((res) => {
          if (res.data) {
            setUser((prevUser) => {
              return { ...prevUser, ownedSongs: res.data };
            });
          }
          setMessage(res.message);
          setSnackbarOpen(true);
        });
      setLoading(false);
    }
    getUser();
  }, []);

  return (
    <div className={styles.account}>
      {message && (
        <DefaultAlert
          message={message}
          open={snackbarOpen}
          setOpen={setSnackbarOpen}
        />
      )}
      <Header token={token} setToken={setToken} />
      <div className={styles["content-wrapper"]}>
        <Sidebar />
        <div className={styles["main-content-wrapper"]}>
          <ContentType contentType={"Your Account"} />
          {user ? (
            <div>
              <div
                style={{ fontSize: typography.header, marginTop: "20px" }}
              >{`Good ${dateToGreeting()} ${
                user.username ?? "user"
              }, here are the songs that you uploaded`}</div>
              <div className={styles["song-wrapper"]}>
                {user?.ownedSongs?.length > 0 &&
                  user.ownedSongs.map((song) => {
                    let { ownedSongs, ...rest } = user;
                    return (
                      <SongCard
                        audio={audio}
                        audioDetails={audioDetails}
                        setAudioDetails={setAudioDetails}
                        key={song._id || song.name}
                        song={{ ...song, artist: [rest] }}
                      />
                    );
                  })}
              </div>
              {user?.ownedSongs?.length <= 0 && (
                <div style={{ marginBottom: "24px" }}>
                  <EmptyContent
                    message="Looks like you don't have any songs yet..."
                    isAnimated={true}
                  />
                </div>
              )}
              <div>
                <CustomButtonFilled
                  text={"Upload more songs"}
                  startIcon={<PublishIcon />}
                  onClick={() => setSongUploadModalOpen(true)}
                />
                <SongUploadDialog
                  open={songUploadModalOpen}
                  setOpen={setSongUploadModalOpen}
                />
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
