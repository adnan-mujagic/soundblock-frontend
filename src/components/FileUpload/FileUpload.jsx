import React, { useState } from "react";
import typography from "../../utils/typography";
import DefaultAlert from "../DefaultAlert/DefaultAlert";
import styles from "./FileUpload.module.scss";

function FileUpload({ file, setFile }) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const MP3_TYPE = "audio/mpeg";
  const handleChange = (event) => {
    if (event.target.files[0]?.type !== MP3_TYPE) {
      setAlertMessage("Wrong file type, you can only upload audio files");
      setAlertOpen(true);
      return;
    }
    setFile(event.target.files[0]);
  };

  return (
    <div data-testid="file-upload" className={styles["file-upload"]}>
      <DefaultAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        message={alertMessage}
      />
      <label
        className={styles["file-upload-label"]}
        htmlFor="file-upload-input"
      >
        Your MP3 File
      </label>
      <input
        className={styles["file-upload-input"]}
        id="file-upload-input"
        type="file"
        onChange={(event) => handleChange(event)}
      />
      {file != null && (
        <div style={{ marginTop: "24px", fontSize: typography.normal }}>
          {file.name}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
