import React, { useEffect, useRef, useState } from "react";
import "./share.css";
import { Avatar, Box, Button, InputBase } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";

import noAvatarImage from "../../../../assets/noAvatar.jpg";

import { useSelector, useDispatch } from "react-redux";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { selectAllUsers } from "../../../../Redux/slices/userSlice";
import { createPost, fetchPosts } from "../../../../Redux/slices/postSlice";

const Share = () => {
  const user = useSelector(selectAllUsers);
  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

  const dispatch = useDispatch();

  const [uploadedImage, setUploadedImage] = useState(null);
  const imageRef = useRef();
  const [description, setDescription] = useState("");

  const axiosPrivate = useAxiosPrivate();

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0], "image check in files");
      setUploadedImage(e.target.files[0]);
    }
  };
  // console.log(uploadedImage, "uploaded img check");

  const handleImageCancel = () => {
    setUploadedImage(null);
  };

  // To reset the share component after posting

  const resetShare = () => {
    setUploadedImage(null);
    setDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const newPost = {
    //   owner: user._id,
    //   description: description,
    // };

    const data = new FormData();

    data.append("name", uploadedImage.name);
    data.append("owner", user._id);
    data.append("description", description);
    if (uploadedImage) {
      data.append("file", uploadedImage);
      console.log(data.get("file"), "file check");
      console.log(data, "data check");

      // newPost.image = fileName;

      // console.log(newPost, "=========new post details========");

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
    else{
      dispatch(createPost({ data, axiosPrivate, config })).then(() => {
        dispatch(fetchPosts({ userId: user._id, axiosPrivate }));
      });
      resetShare();
    }
  };
  // todo delete this if the bottom one is success

  return (
    <Box
      className="share"
      width={"100%"}
      // height={"200px"}
      borderRadius={"10px"}
      bgcolor={"white"}
      boxShadow={"0px 0px 16px -8px"}
      sx={{
        "@media (max-width: 600px)": {
          maxWidth: "100%",
        },
      }}
    >
      <Box
        component="form"
        className="shareWrapper"
        padding={1}
        // onSubmit={submitHandler}
      >
        <Box className="shareTop" display={"flex"} alignItems={"center"}>
          <Avatar
            alt="user Profile pic"
            src={noAvatarImage}
            sx={{ marginRight: "10px" }}
          />
          <InputBase
            name="description"
            className="shareInput"
            placeholder={`What's happening ${user.firstName} ??`}
            sx={{ width: "80%" }}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </Box>
        <hr className="shareHr" />
        {uploadedImage && (
          <Box
            className="shareImageContainer"
            sx={{ padding: "0 20px 10px 20px", position: "relative" }}
          >
            <img
              src={URL.createObjectURL(uploadedImage)}
              alt="shareImage"
              className="shareImage"
              style={{ width: "100%", objectFit: "cover" }}
            />
            <CancelIcon
              className="shareImageCancel"
              onClick={handleImageCancel}
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
        <Box className="shareBottom" display={"flex"} alignItems={"flex-end"}>
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
                onClick={() => imageRef.current.click()}
              />
              <label htmlFor="image">
                <span className="shareOptionText" style={{ cursor: "pointer" }}>
                  Photo{" "}
                </span>
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                name="image"
                key={Date.now()}
                ref={imageRef}
                id="image"
                accept=".png,.jpeg,.jpg"
                onChange={onImageChange}
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
              <LocalOfferIcon className="shareIcon" sx={{ color: "blue" }} />
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
              <LocationOnIcon className="shareIcon" sx={{ color: "green" }} />
              <span className="shareOptionText">Location </span>
            </Box>
          </Box>
          <Button
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
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Share;
