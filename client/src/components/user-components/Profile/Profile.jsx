import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";

import "./profile.css";
import Feed from "../Feed/Feed";
import Share from "../Feed/Share/Share";
import Post from "../Feed/Post/Post";

const Profile = () => {
  return (
    <>
      <Box flex={4} p={2}>
        <Box className="profileTop" bgcolor={"white"} paddingBottom={1}>
          <Box
            className="profileCover"
            sx={{ height: "320px", position: "relative" }}
          >
            <img
              className="profileCoverPicture"
              src="/Images/coverPic.avif"
              alt=""
            />
            <img
              className="profileUserPicture"
              src="/Images/userPic.avif"
              alt=""
            />
          </Box>

          <Box
            className="profileInfo"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "85px",
            }}
          >
            <Typography variant="h4" className="profileInfoName">
              John Smith
            </Typography>
            <Typography
              component={"span"}
              variant="h6"
              className="profileInfoBio"
              fontWeight={300}
              color={"darkgray"}
            >
              Software Developer
            </Typography>
          </Box>
          <Box
            className="profileData"
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-around"}
            alignItems={"center"}
            marginTop={2}
            marginBottom={2}
            bgcolor={"#D4F1F4"}
          >
            <Typography fontWeight={500}>10 Followers</Typography>
            <Typography fontWeight={500}>10 Following</Typography>
            <Typography fontWeight={500}>10 Posts</Typography>
            <Button color="error">Delete Profile</Button>
          </Box>
        </Box>
        <Box className="profileBottom" marginTop={5}>
          <Grid container spacing={2} justifyContent={"center"}>
            <Grid item xs={12} md={8}>
              <Share />
            </Grid>
          </Grid>
        </Box>
        <Box className="profilePosts" marginTop={5} display={"flex"}>

          {/* //TODO: DUMMY SET OF LISTS TO BE CHANGED LATER  */}
          
          <Grid container spacing={2} >
            <Grid item xs={12} md={6} flexDirection={"row"}>
              <Post />
            </Grid>
            <Grid item xs={12} md={6} flexDirection={"row"}>
              <Post />
            </Grid>
            <Grid item xs={12} md={6} flexDirection={"row"}>
              <Post />
            </Grid>
            <Grid item xs={12} md={6} flexDirection={"row"}>
              <Post />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
