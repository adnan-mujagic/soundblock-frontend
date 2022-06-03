import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import typography from "../../utils/typography";
import CustomTextField from "../CustomTextField/CustomTextField";
import FileUpload from "../FileUpload";
import styles from "./SongUploadDialog.module.scss";

function SongUploadDialog({ open, setOpen }) {
  const [file, setFile] = useState(null);

  const handleUpload = (event) => {
    console.log("Uploading, please wait...");
  };

  const handleClose = () => {
    setFile(null);
    setOpen(false);
  };

  return (
    <>
      <Dialog fullWidth open={open}>
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
              disabled={file == null}
            >
              Upload
            </Button>
            <Button
              style={{ fontSize: typography.header }}
              onClick={() => handleClose()}
            >
              Close
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SongUploadDialog;
