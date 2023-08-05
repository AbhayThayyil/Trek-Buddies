import React, { useEffect, useRef, useState } from "react";
import "./share.css";
import { Avatar, Box, Button, InputBase } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import { blue } from "@mui/material/colors";
import { useSelector } from "react-redux";
import axios from "../../../../utils/axios";
import { selectAllUsers } from "../../../../Redux/slices/userSlice";

const Share = () => {
  const user = useSelector(selectAllUsers);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (file) {
      setImageURL(URL.createObjectURL(file));
    }
  }, [file]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      owner: user._id,
      description: description,
    };
    
    // store post
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("file", file);
      data.append("name", fileName);
      newPost.image = fileName;
      console.log(data, "data check");
      try {
        await axios.post("/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axios.post("/posts", newPost);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageCancel = () => {
    setFile(null);
    setImageURL(null);
  };
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
        onSubmit={submitHandler}
      >
        <Box className="shareTop" display={"flex"} alignItems={"center"}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ marginRight: "10px" }}
          />
          <InputBase
            name="description"
            className="shareInput"
            placeholder={`What's happening ${user.firstName} ??`}
            sx={{ width: "80%" }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <hr className="shareHr" />
        {file && (
          <Box
            className="shareImageContainer"
            sx={{ padding: "0 20px 10px 20px", position: "relative" }}
          >
            <img
              src={imageURL}
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
              <InsertPhotoIcon className="shareIcon" sx={{ color: "red" }} />
              <label htmlFor="image">
                <span className="shareOptionText" style={{ cursor: "pointer" }}>
                  Photo{" "}
                </span>
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                id="image"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
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
          >
            Share
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Share;
