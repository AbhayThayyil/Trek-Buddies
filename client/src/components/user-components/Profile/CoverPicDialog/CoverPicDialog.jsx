import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Card, CardMedia, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersInfo,
  selectAllUsers,
  updateCoverPicture,
} from "../../../../Redux/slices/userSlice";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

import CancelIcon from "@mui/icons-material/Cancel";

const CoverPicDialog = ({ open, close, profileOwner, handleConfirm }) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const user = useSelector(selectAllUsers);
  const uploadCoverImageRef = useRef();

  const [selectedCoverImage, setSelectedCoverImage] = useState(null);

  const onCoverImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0], "image check in files");
      setSelectedCoverImage(e.target.files[0]);
    }
  };

  const handleCoverImageCancel = () => {
    setSelectedCoverImage(null);
  };

  const handleUploadCoverPic = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", selectedCoverImage);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    dispatch(updateCoverPicture({ data, axiosPrivate, config })).then(() => {
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
        <DialogTitle id="alert-dialog-title">Cover Picture</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "20px" }}>
            {profileOwner._id === user._id
              ? "View and Update your Cover Picture here"
              : "View Cover picture"}
          </DialogContentText>
          {!selectedCoverImage && (
            <Stack>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={
                    profileOwner.coverPicture
                      ? profileOwner.coverPictureURL
                      : "/Images/noCover.jpg"
                  }
                  alt="coverPic"
                  sx={{ objectFit: "contain" }}
                />
              </Card>
            </Stack>
          )}
          {selectedCoverImage && (
            <Card>
              <CardMedia
                component="img"
                height="400"
                width={200}
                image={URL.createObjectURL(selectedCoverImage)}
                alt="selectedCoverPic"
                sx={{ objectFit: "contain" }}
              />
              <CancelIcon
                className="selectedCoverImageCancel"
                onClick={handleCoverImageCancel}
                sx={{ position: "absolute", top: "120px", right: "30px" }}
              />
            </Card>
          )}
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          {profileOwner._id === user._id &&
            (!selectedCoverImage ? (
              <Button
                variant="contained"
                sx={{ marginTop: "20px" }}
                onClick={() => uploadCoverImageRef.current.click()}
              >
                <input
                  type="file"
                  ref={uploadCoverImageRef}
                  name="coverPicture"
                  key={Date.now()}
                  id="coverPicture"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={onCoverImageChange}
                />
                Change Picture
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ marginTop: "20px" }}
                onClick={handleUploadCoverPic}
              >
                Upload Picture
              </Button>
            ))}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CoverPicDialog;
