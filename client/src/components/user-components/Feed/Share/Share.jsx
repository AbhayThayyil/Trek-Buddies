import React from "react";
import "./share.css";
import { Avatar, Box, Button, InputBase } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { blue } from "@mui/material/colors";

const Share = () => {
  return (
    <Box
      className="share"
      width={"100%"}
      height={"200px"}
      borderRadius={"10px"}
      bgcolor={'white'}
      boxShadow={"0px 0px 16px -8px"}
      sx={{"@media (max-width: 600px)": {
        maxWidth: "100%",
        
      }}}
    >
      <Box className="shareWrapper" padding={1}>
        <Box className="shareTop" display={"flex"} alignItems={"center"}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ marginRight: "10px" }}
          />
          <InputBase
            className="shareInput"
            placeholder="What's happening ?? "
            sx={{ width: "80%" }}
          />
        </Box>
        <hr className="shareHr" />
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
              <span className="shareOptionText">Photo </span>
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
            
            sx={{
              color: "white",
              backgroundColor: "#189AB4",
              marginRight: "20px",
              "&:hover":{
                backgroundColor:'#75E6DA'
              }
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
