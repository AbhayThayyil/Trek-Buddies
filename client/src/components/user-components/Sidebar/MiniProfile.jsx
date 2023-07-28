import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

import './miniProfile.css'

const MiniProfile = () => {
  return (
    <>
      <Box
        className="userCardSidebar"
        borderRadius={2}
        textAlign={"center"}
        height={"fit-content"}
        bgcolor={"#FFFFFF"}
        marginTop={3}
        marginBottom={5}
      >
        <Box className="userCard">
          <Box
            className="userdTop"
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <img src="/Images/coverPic.avif" alt="" className="userCardCover" />
            <Avatar src="" sx={{position:'absolute',left:0,right:0,margin:'auto',top:'30px', width:'55px' ,height:'55px'}}  />
            <Typography variant="h2" fontSize={25} marginTop={3}>Name</Typography>
            <Typography variant="h4" fontSize={15}>Bio</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MiniProfile;
