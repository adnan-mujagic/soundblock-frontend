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
import AudioOptionsController from "../../components/AudioOptionsController";
import SoldSongs from "../../components/SoldSongs";
import EditProfileDialog from "../../components/EditProfileDialog";
import AccountHeader from "../../components/AccountHeader";

function Account({
  audio,
  setAudio,
  audioDetails,
  setAudioDetails,
  token,
  setToken,
  playlists,
  getOwnPlaylists,
}) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [songUploadModalOpen, setSongUploadModalOpen] = useState(false);
  const [editProfileDialogOpen, setEditProfileDialogOpen] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
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
  };

  const handleEditProfile = () => {
    setEditProfileDialogOpen(true);
  };

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
        <Sidebar audioDetails={audioDetails} playlists={playlists} />
        <div className={styles["main-content-wrapper"]}>
          <ContentType contentType={"Your Account"} />
          {user ? (
            <div>
              {user.walletAddress && (
                <AccountHeader
                  artistAddress={user.walletAddress}
                  username={user.username}
                  imageUrl={user.image}
                  numberOfSongs={user.ownedSongs?.length || 0}
                />
              )}
              <CustomButtonFilled
                text="Edit Profile"
                onClick={handleEditProfile}
              />
              <div
                style={{ fontSize: typography.header, marginTop: "20px" }}
              >{`Good ${dateToGreeting()}${
                user?.ownedSongs?.length > 0
                  ? ", here are the songs that you uploaded"
                  : ""
              }`}</div>
              <div
                className={
                  user?.ownedSongs?.length > 0
                    ? styles["song-wrapper"]
                    : styles["song-wrapper-empty"]
                }
              >
                {user?.ownedSongs?.length > 0 &&
                  user.ownedSongs.map((song) => {
                    let { ownedSongs, ...rest } = user;
                    return (
                      <SongCard
                        audio={audio}
                        setAudio={setAudio}
                        audioDetails={audioDetails}
                        setAudioDetails={setAudioDetails}
                        key={song._id || song.name}
                        song={{ ...song, artist: [rest] }}
                        showViewArtist={false}
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
                  text={`Upload ${
                    user?.ownedSongs?.length ? "more songs" : "your first song"
                  }`}
                  startIcon={<PublishIcon />}
                  onClick={() => setSongUploadModalOpen(true)}
                />
                <SongUploadDialog
                  open={songUploadModalOpen}
                  setOpen={setSongUploadModalOpen}
                />
                <EditProfileDialog
                  open={editProfileDialogOpen}
                  setOpen={setEditProfileDialogOpen}
                  getUser={getUser}
                  currentUsername={user.username}
                  currentEmail={user.email}
                  currentImage={user.image}
                />
              </div>
              <SoldSongs />
            </div>
          ) : (
            <Loading />
          )}
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

export default Account;
