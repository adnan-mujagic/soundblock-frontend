import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { create } from "ipfs-http-client";
import React, { useState } from "react";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import typography from "../../utils/typography";
import CustomButtonFilled from "../CustomButtonFilled";
import CustomTextField from "../CustomTextField/CustomTextField";
import DefaultAlert from "../DefaultAlert/DefaultAlert";
import FileUpload from "../FileUpload";
import Loading from "../Loading/Loading";
import styles from "./SongUploadDialog.module.scss";

function SongUploadDialog({ open, setOpen }) {
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

  const client = create("https://ipfs.infura.io:5001/api/v0");

  const handleUpload = async (event) => {
    console.log("Uploading, please wait...");
    try {
      setUploading(true);
      const added = await client.add(file);
      console.log(added.path);
      const response = await fetchDataWithAuth("/users/song", "POST", {
        name: songName,
        songLocation: `https://ipfs.infura.io/ipfs/${added.path}`,
        price: parseFloat(songPrice),
        image: songImage !== null && songImage !== "" ? songImage : null,
      });
      setAlertOpen(true);
      setAlertMessage(response.message);
      setUploading(false);
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
  };

  const handleSetSongPrice = (text) => {
    console.log(text);
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

  console.log(songName, songImage);

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
            variant="outlined"
            placeholder="Song name"
            text={songName}
            setText={setSongName}
          />
          <CustomTextField
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
            variant="outlined"
            placeholder="Song price (ETH)"
            text={songPrice}
            setText={handleSetSongPrice}
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
                file == null || uploading || songPriceValidation != null
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
