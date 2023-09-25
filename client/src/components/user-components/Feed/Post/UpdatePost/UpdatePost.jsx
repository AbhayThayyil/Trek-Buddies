import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  getAllPosts,
  updatePost,
} from "../../../../../Redux/slices/postSlice";
import { Avatar, Box, InputBase, Stack, TextField } from "@mui/material";
import { selectAllUsers } from "../../../../../Redux/slices/userSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";

const UpdatePost = ({ open, handleClose, handleConfirm, postId }) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const user = useSelector(selectAllUsers);
  const posts = useSelector(getAllPosts);
  const postToUpdate = posts.find((post) => post._id === postId);

  console.log(postToUpdate, "post to update chk");

  // const [editUploadedImage, setEditUploadedImage] = useState(
  //   postToUpdate?.imageURL || null
  // );
  const [editUploadedImage, setEditUploadedImage] = useState(null);

  const [editTags, setEditTags] = useState(null);
  const [editLocation, setEditLocation] = useState("");
  const [editDescription, setEditDescription] = useState(
    postToUpdate?.description || ""
  );

  console.log(editDescription, "desc chk");

  const handleDescriptionChange = (e) => {
    setEditDescription(e.target.value);
  };

  const clearUploadedImage = () => {
    setEditUploadedImage(null);
  };

  const editImageRef = useRef();

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0], "image check in files");
      // const imageURL = URL.createObjectURL(e.target.files[0]);
      // setEditUploadedImage(imageURL);
      setEditUploadedImage(e.target.files[0]);
    }
  };

  // to reset all fields after submit
  const resetShare = () => {
    setEditUploadedImage(null);
    setEditDescription("");
  };

  // to submit the edits
  const handleSubmitUpdate = () => {
    const data = new FormData();
    data.append("owner", user._id);
    data.append("description", editDescription);
    if (editUploadedImage) {
      data.append("name", editUploadedImage.name);
      data.append("file", editUploadedImage);
      // console.log(data.get("file"), "file check");
      // console.log(data, "data check");

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      console.log(data, "data chk ");

      dispatch(
        updatePost({ data, axiosPrivate, config, postId: postToUpdate._id })
      ).then(() => dispatch(fetchPosts({ userId: user._id, axiosPrivate })));
      resetShare();
    } else {
      dispatch(
        updatePost({ data, axiosPrivate, postId: postToUpdate._id })
      ).then(() => dispatch(fetchPosts({ userId: user._id, axiosPrivate })));
      resetShare();
    }

    handleConfirm();
  };

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
        <DialogTitle id="alert-dialog-title">Update Post</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "20px" }}>
            Update this post here
          </DialogContentText>
          <Stack sx={{ height: "500px", gap: "20px" }}>
            <TextField
              id="description"
              label="Description"
              placeholder="Enter Description"
              value={editDescription}
              onChange={handleDescriptionChange}
            />
            {!editUploadedImage && (
              <Box
                id="selectedImage"
                position={"relative"}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  src={postToUpdate?.imageURL}
                  alt="uploadedImage"
                  style={{ maxWidth: "100%", width: "700px", height: "auto" }}
                />
                <CancelIcon
                  onClick={clearUploadedImage}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    cursor: "pointer",
                    opacity: "0.7",
                  }}
                />
              </Box>
            )}
            {editUploadedImage && (
              <Box
                id="selectedImage"
                position={"relative"}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  src={URL.createObjectURL(editUploadedImage)}
                  alt="uploadedImage"
                  style={{ maxWidth: "100%", width: "700px", height: "auto" }}
                />
                <CancelIcon
                  onClick={clearUploadedImage}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
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
                justifyContent={"space-between"}
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
                    onClick={() => editImageRef.current.click()}
                  />
                  <span
                    className="shareOptionText"
                    style={{ cursor: "pointer" }}
                  >
                    Photo{" "}
                  </span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    name="image"
                    key={Date.now()}
                    ref={editImageRef}
                    id="image"
                    accept="image/*"
                    onChange={onImageChange}
                  />
                </Box>
                // TODO : DO THE EDIT FUNCTIONALITIES OF TAG AND LOCATION
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
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="success" autoFocus onClick={handleSubmitUpdate}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdatePost;
