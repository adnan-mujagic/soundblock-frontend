import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { create } from "ipfs-http-client";
import React, { useState } from "react";
import typography from "../../utils/typography";
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
  const [audioSource, setAudioSource] = useState(null);

  const client = create("https://ipfs.infura.io:5001/api/v0");

  const handleUpload = async (event) => {
    console.log("Uploading, please wait...");
    try {
      setUploading(true);
      const added = await client.add(file);
      console.log(added.path);
      setAudioSource(`https://ipfs.infura.io/ipfs/${added.path}`);
      setUploading(false);
    } catch (error) {
      setAlertMessage(
        error?.message || "Something went wrong during song upload"
      );
      setUploading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setOpen(false);
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
          <CustomTextField variant="outlined" placeholder="Song name" />
          <CustomTextField
            variant="outlined"
            placeholder="Song cover image url"
          />
          <FileUpload file={file} setFile={setFile} />
        </DialogContent>
        <DialogActions>
          <Grid>
            <Button
              style={{ fontSize: typography.header }}
              onClick={(event) => handleUpload(event)}
              disabled={file == null || uploading}
            >
              Upload
            </Button>
            <Button
              style={{ fontSize: typography.header }}
              onClick={() => handleClose()}
            >
              Close
            </Button>
            {uploading && <Loading />}
            {
              // TODO: Refactor the UI and save to blockchain/db
              audioSource && (
                <audio controls>
                  <source src={audioSource} />
                </audio>
              )
            }
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SongUploadDialog;
