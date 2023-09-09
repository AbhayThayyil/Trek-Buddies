import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { getAllPosts } from "../../../../../Redux/slices/postSlice";
import { Avatar, Box, InputBase, TextField } from "@mui/material";
import { selectAllUsers } from "../../../../../Redux/slices/userSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const UpdatePost = ({ open, handleClose, handleConfirm, postId }) => {
  const user = useSelector(selectAllUsers);
  const posts = useSelector(getAllPosts);
  const postToUpdate = posts.filter((post) => post._id === postId);

  const [updateDescription, setUpdateDescription] = useState(postToUpdate[0].description);
  const imageUpdateRef = useRef();
  const [uploadedUpdateImage, setUploadedUpdateImage] = useState(null);

  const handleUpdateImageCancel = () => {
    setUploadedUpdateImage(null);
  };

  const onUpdateImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0], "image check in files");
      setUploadedUpdateImage(e.target.files[0]);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (uploadedUpdateImage) {
      const data = new FormData();

      data.append("name", uploadedUpdateImage.name);
      data.append("owner", user._id);
      data.append("description", updateDescription);
      data.append("file", uploadedUpdateImage);
      console.log(data.get("file"), "file check");
      console.log(data, "data check");

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      dispatch(createPost({ data, axiosPrivate, config })).then(() => {
        dispatch(fetchPosts({ userId: user._id, axiosPrivate }));
      });
      resetShare();
    }
  };

  console.log(postToUpdate, "post to update");
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update Post </DialogTitle>
        <DialogContent>
          <Box>
            <Box className="shareTop" display={"flex"} alignItems={"center"}>
              <Avatar
                alt="user Profile pic"
                src={""}
                sx={{ marginRight: "10px" }}
              />
              <TextField
                name="description"
                placeholder={postToUpdate[0].description}
                sx={{ width: "80%" }}
                value={updateDescription}
                onChange={(e) => setUpdateDescription(e.target.value)}
              />
            </Box>
            {uploadedUpdateImage ? (
              <Box
                className="shareImageContainer"
                sx={{ padding: "0 20px 10px 20px", position: "relative" }}
              >
                <img
                  src={URL.createObjectURL(uploadedUpdateImage)}
                  alt="shareImage"
                  className="shareImage"
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    marginTop: "20px",
                  }}
                />
                <CancelIcon
                  className="shareImageCancel"
                  onClick={handleUpdateImageCancel}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: "20px",
                    cursor: "pointer",
                    opacity: "0.7",
                  }}
                />
              </Box>
            ) : (
              <Box
                className="shareImageContainer"
                sx={{ padding: "0 20px 10px 20px", position: "relative" }}
              >
                <img
                  src={postToUpdate[0].imageURL}
                  alt="shareImage"
                  className="shareImage"
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    marginTop: "20px",
                  }}
                />
                <CancelIcon
                  className="shareImageCancel"
                  onClick={handleUpdateImageCancel}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: "20px",
                    cursor: "pointer",
                    opacity: "0.7",
                  }}
                />
              </Box>
            )}
            <Box
              className="shareBottom"
              display={"flex"}
              alignItems={"flex-end"}
            >
              <Box
                className="shareOptions"
                display={"flex"}
                // justifyContent={"space-evenly"}
                width={"100%"}
              >
                <Box
                  className="shareOption"
                  display={"flex"}
                  alignItems={"center"}
                  marginRight={3}
                  marginLeft={3}
                  sx={{ cursor: "pointer" }}
                >
                  <InsertPhotoIcon
                    className="shareIcon"
                    sx={{ color: "red" }}
                    onClick={() => imageUpdateRef.current.click()}
                  />
                  <label htmlFor="image">
                    <span
                      className="shareOptionText"
                      style={{ cursor: "pointer" }}
                    >
                      Photo{" "}
                    </span>
                  </label>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    name="image"
                    key={Date.now()}
                    ref={imageUpdateRef}
                    id="Updatemage"
                    accept=".png,.jpeg,.jpg"
                    onChange={onUpdateImageChange}
                  />
                </Box>
                <Box
                  className="shareOption"
                  display={"flex"}
                  alignItems={"center"}
                  marginRight={3}
                  marginLeft={3}
                  sx={{ cursor: "pointer" }}
                >
                  <LocalOfferIcon
                    className="shareIcon"
                    sx={{ color: "blue" }}
                  />
                  <span className="shareOptionText">Tag </span>
                </Box>
                <Box
                  className="shareOption"
                  display={"flex"}
                  alignItems={"center"}
                  marginRight={3}
                  marginLeft={3}
                  sx={{ cursor: "pointer" }}
                >
                  <LocationOnIcon
                    className="shareIcon"
                    sx={{ color: "green" }}
                  />
                  <span className="shareOptionText">Location </span>
                </Box>
              </Box>
              {/* <Button
                className="shareButton"
                type="submit"
                sx={{
                  color: "white",
                  backgroundColor: "#189AB4",
                  marginRight: "20px",
                  "&:hover": {
                    backgroundColor: "#75E6DA",
                  },
                }}
                onClick={handleSubmit}
              >
                Share
              </Button> */}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="success"
            onClick={() => {
                handleUpdateSubmit, handleConfirm;
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdatePost;
