import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import CustomButtonFilled from "../CustomButtonFilled";
import CustomTextField from "../CustomTextField/CustomTextField";
import DifferenceIndicator from "../DifferenceIndicator";

function EditProfileDialog({
  open,
  setOpen,
  getUser,
  currentUsername,
  currentEmail,
  currentImage,
}) {
  const initialState = {
    username: currentUsername || "",
    email: currentEmail || "",
    image: currentImage || "",
  };

  const [userData, setUserData] = useState(initialState);

  const updateState = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };

  const setUsername = (value) => {
    updateState("username", value);
  };

  const setEmail = (value) => {
    updateState("email", value);
  };

  const setImage = (value) => {
    updateState("image", value);
  };

  const handleUpdate = async () => {
    await fetchDataWithAuth("/users", "PUT", userData);
    getUser();
    setOpen(false);
  };

  const isDisabled = () => {
    return (
      Object.keys(userData).filter((key) => userData[key] !== initialState[key])
        .length === 0
    );
  };

  const handleClose = () => {
    setOpen(false);
    setUserData(initialState);
  };

  return (
    <Dialog open={open} fullWidth={true}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <DifferenceIndicator current={initialState} next={userData} />
        <CustomTextField
          testId="username-text-field"
          placeholder={"Username..."}
          variant={"outlined"}
          text={userData["username"]}
          setText={setUsername}
        />
        <CustomTextField
          placeholder={"Email..."}
          variant={"outlined"}
          text={userData["email"]}
          setText={setEmail}
        />
        <CustomTextField
          placeholder={"Image..."}
          variant={"outlined"}
          text={userData["image"]}
          setText={setImage}
        />
      </DialogContent>
      <DialogActions>
        <CustomButtonFilled
          text={"Update"}
          onClick={handleUpdate}
          disabled={isDisabled()}
        />
        <CustomButtonFilled text={"Close"} onClick={handleClose} />
      </DialogActions>
    </Dialog>
  );
}

EditProfileDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  getUser: PropTypes.func,
};

export default EditProfileDialog;
