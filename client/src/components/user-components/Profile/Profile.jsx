import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";


import "./profile.css";
import Feed from "../Feed/Feed";
import Share from "../Feed/Share/Share";
import Post from "../Feed/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectAllUsers } from "../../../Redux/slices/userSlice";

const Profile = () => {
  const [postOwner, setPostOwner] = useState({});
  const user = useSelector(selectAllUsers);
  const userId = useParams().userId;
  // console.log(userId, "params");
  const [followed, setFollowed] = useState(user.following.includes(userId));

  useEffect(() => {
    setFollowed(user.following.includes(userId));
  }, [user, userId]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users/${userId}`);
      console.log(response.data, "User details of post");
      setPostOwner(response.data);
    };
    fetchUser();
  }, [userId]);

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put(`/${userId}/unfollow`, { userId: user._id });
      } else {
        await axios.put(`/${userId}/follow`, { userId: user._id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

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
              {`${postOwner.firstName} ${postOwner.lastName}`}
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
            {user._id === userId ? (
              <Button color="error">Delete Profile</Button>
            ) : followed ? (
              <Button color="error" onClick={handleFollow}>
                Unfollow
              </Button>
            ) : (
              <Button color="success" onClick={handleFollow}>
                Follow
              </Button>
            )}
          </Box>
        </Box>

        <Box className="profilePosts" marginTop={5} display={"flex"}>
          {/* //TODO: DUMMY SET OF LISTS TO BE CHANGED LATER  */}

          <Grid container spacing={2} justifyContent={"center"}>
            <Grid item xs={12} md={6} flexDirection={"row"}>
              <Feed userId={userId} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
