import React, { useEffect, useState } from "react";
import ContentType from "../../components/ContentType/ContentType";
import CustomButtonFilled from "../../components/CustomButtonFilled";
import DefaultAlert from "../../components/DefaultAlert/DefaultAlert";
import PublishIcon from "@mui/icons-material/Publish";
import Loading from "../../components/Loading/Loading";
import SongUploadDialog from "../../components/SongUploadDialog";
import dateToGreeting from "../../utils/dateToGreeting";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import typography from "../../utils/typography";
import SongCard from "./../../components/SongCard";
import styles from "./Account.module.scss";
import EmptyContent from "../../components/EmptyContent/EmptyContent";
import SoldSongs from "../../components/SoldSongs";
import EditProfileDialog from "../../components/EditProfileDialog";
import AccountHeader from "../../components/AccountHeader";
import useAuthenticatedRoute from "../../hooks/useAuthenticatedRoute";

function Account({
  audio,
  setAudio,
  audioDetails,
  setAudioDetails,
  token,
  setQueue,
}) {
  const [user, setUser] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [songUploadModalOpen, setSongUploadModalOpen] = useState(false);
  const [editProfileDialogOpen, setEditProfileDialogOpen] = useState(false);

  useAuthenticatedRoute(token);

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, []);

  const getUser = async () => {
    const response = await fetchDataWithAuth("/users", "GET");
    if (response?.data) {
      setUser(response.data);
    }
    await updateUserSongs(response.data._id);
    setMessage(response.message);
    setSnackbarOpen(true);
  };

  const handleEditProfile = () => {
    setEditProfileDialogOpen(true);
  };

  const updateUserSongs = async (id) => {
    const response = await fetchDataWithAuth(
      `/songs/getByArtist?artistId=${id}`
    );
    if (response.data) {
      setUser((previous) => {
        return { ...previous, ownedSongs: response.data };
      });
    }
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
          <CustomButtonFilled text="Edit Profile" onClick={handleEditProfile} />
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
                    setQueue={setQueue}
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
              updateUserSongs={updateUserSongs}
              userId={user._id}
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
          {token && <SoldSongs />}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Account;
