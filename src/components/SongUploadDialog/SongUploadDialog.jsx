import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import upload, { ipfsGatewayBaseUrl } from "../../utils/ipfsApi";
import typography from "../../utils/typography";
import CustomButtonFilled from "../CustomButtonFilled";
import CustomDropdown from "../CustomDropdown";
import CustomTextField from "../CustomTextField/CustomTextField";
import DefaultAlert from "../DefaultAlert/DefaultAlert";
import FileUpload from "../FileUpload";
import Loading from "../Loading/Loading";
import styles from "./SongUploadDialog.module.scss";

function SongUploadDialog({ open, setOpen, updateUserSongs, userId }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [songName, setSongName] = useState("");
  const [songImage, setSongImage] = useState("");
  const [songPrice, setSongPrice] = useState("");
  const [songPriceValidation, setSongPriceValidation] = useState(
    "Please enter a valid song price"
  );
  const [songCategory, setSongCategory] = useState("");

  const handleUpload = async (event) => {
    console.log("Uploading, please wait...");
    try {
      setUploading(true);
      const { cid } = await upload(file);
      console.log(cid);
      const response = await fetchDataWithAuth("/users/song", "POST", {
        name: songName,
        songLocation: `${ipfsGatewayBaseUrl}/${cid}`,
        price: parseFloat(songPrice),
        image: songImage !== null && songImage !== "" ? songImage : null,
        category: songCategory,
      });
      setAlertOpen(true);
      setAlertMessage(response.message);
      setUploading(false);
      await updateUserSongs(userId);
      setOpen(false);
    } catch (error) {
      setAlertMessage(
        error?.message || "Something went wrong during song upload"
      );
      setUploading(false);
    }
  };

  const handleClose = () => {
    setSongName("");
    setSongImage("");
    setFile(null);
    setOpen(false);
    setSongPrice("");
    setSongCategory("");
  };

  const handleSetSongPrice = (text) => {
    setSongPrice(text);
    try {
      if (parseFloat(text) == text && text != "") {
        setSongPriceValidation(null);
      } else {
        throw new Error("Please enter a valid song price");
      }
    } catch (error) {
      setSongPriceValidation(error.message);
    }
  };

  return (
    <>
      <Dialog fullWidth open={open}>
        <DefaultAlert
          open={alertOpen}
          setOpen={setAlertOpen}
          message={alertMessage}
        />
        <DialogTitle>
          <div style={{ fontSize: typography.header }}>Upload a new song</div>
        </DialogTitle>
        <DialogContent>
          <CustomTextField
            testId={"song-name"}
            variant="outlined"
            placeholder="Song name"
            text={songName}
            setText={setSongName}
          />
          <CustomTextField
            testId={"song-image"}
            variant="outlined"
            placeholder="Song cover image url"
            text={songImage}
            setText={setSongImage}
          />
          {songPriceValidation && (
            <p style={{ color: "crimson", fontSize: typography.tiny }}>
              {songPriceValidation}
            </p>
          )}
          <CustomTextField
            testId="song-price"
            variant="outlined"
            placeholder="Song price (ETH)"
            text={songPrice}
            setText={handleSetSongPrice}
          />
          <CustomDropdown
            placeholder={"Select category"}
            selectedOption={songCategory}
            setSelectedOption={setSongCategory}
            options={["Pop", "Rock", "Classic", "Soul", "R & B", "House"]}
          />
          <FileUpload file={file} setFile={setFile} />
        </DialogContent>
        <DialogActions>
          <Grid>
            {uploading && (
              <div>
                <Loading />
              </div>
            )}
            <CustomButtonFilled
              style={{ marginRight: "10px" }}
              text="Upload"
              onClick={(event) => handleUpload(event)}
              disabled={
                file == null ||
                uploading ||
                songPriceValidation != null ||
                songCategory == null
              }
            />

            <CustomButtonFilled text={"Close"} onClick={() => handleClose()} />
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SongUploadDialog;
