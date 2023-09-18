import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Card, CardMedia, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersInfo,
  selectAllUsers,
  updateProfilePicture,
} from "../../../../Redux/slices/userSlice";

import CancelIcon from "@mui/icons-material/Cancel";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const ProfilePicDialog = ({ open, close, profileOwner, handleConfirm }) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const user = useSelector(selectAllUsers);
  const uploadProfileImageRef = useRef();

  const [selectedImage, setSelectedImage] = useState(null);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0], "image check in files");
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleImageCancel = () => {
    setSelectedImage(null);
  };

  const handleUploadProfilePic = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", selectedImage);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    dispatch(updateProfilePicture({ data, axiosPrivate, config })).then(()=>{
      dispatch(getAllUsersInfo({ axiosPrivate }));
    });
    // to close dialog box run handleconfirm
    handleConfirm();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={close}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Profile Picture</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "20px" }}>
            {profileOwner._id === user._id
              ? "View and Update your Profile Picture here"
              : "View Profile Picture"}
          </DialogContentText>
          {!selectedImage && (
            <Stack>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={profileOwner.profilePicture?profileOwner.profilePictureURL:"/Images/noUser.jpg"}
                  alt="profilePic"
                  sx={{ objectFit: "contain" }}
                />
              </Card>
            </Stack>
          )}

          {selectedImage && (
            <Card>
              <CardMedia
                component="img"
                height="400"
                width={200}
                image={URL.createObjectURL(selectedImage)}
                alt="selectedPic"
                sx={{ objectFit: "contain" }}
              />
              <CancelIcon
                className="selectedImageCancel"
                onClick={handleImageCancel}
                sx={{ position: "absolute", top: "120px", right: "30px" }}
              />
            </Card>
          )}
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          {profileOwner._id === user._id &&
            (!selectedImage ? (
              <Button
                variant="contained"
                sx={{ marginTop: "20px" }}
                onClick={() => uploadProfileImageRef.current.click()}
              >
                <input
                  type="file"
                  ref={uploadProfileImageRef}
                  name="profilePicture"
                  key={Date.now()}
                  id="profilePicture"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={onImageChange}
                />
                Change Picture
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ marginTop: "20px" }}
                onClick={handleUploadProfilePic}
              >
                Upload Picture
              </Button>
            ))}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfilePicDialog;
