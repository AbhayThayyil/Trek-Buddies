import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import "./profile.css";
import Feed from "../Feed/Feed";
import Share from "../Feed/Share/Share";
import Post from "../Feed/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  getAllUsersData,
  selectAllUsers,
  updateFollow,
  updateUnfollow,
  userInfoFromId,
} from "../../../Redux/slices/userSlice";
import { getAllPosts } from "../../../Redux/slices/postSlice";
import ProfilePicDialog from "./ProfilePicDialog/ProfilePicDialog";
import CoverPicDialog from "./CoverPicDialog/CoverPicDialog";

const Profile = () => {
  const dispatch = useDispatch();

  const userId = useParams().userId; // get userId from params

  // useEffect(() => {
  //   dispatch(userInfoFromId({ axiosPrivate, userId }));
  // }, [userId]);

  const axiosPrivate = useAxiosPrivate();

  const posts = useSelector(getAllPosts);

  const allUsers = useSelector(getAllUsersData);

  const currentUser = allUsers.find((user) => user._id === userId);

  // console.log(user,"user info ");

  // Profile Pic ops
  const [openProfilePic, setOpenProfilePic] = useState(false);
  const handleProfilePicClick = () => {
    setOpenProfilePic(true);
  };

  const handleProfilePicCancel = () => {
    setOpenProfilePic(false);
  };

  const handleProfilePicConfirm = () => {
    setOpenProfilePic(false);
  };

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  // Cover Pic ops
  const [openCoverPic, setOpenCoverPic] = useState(false);
  const handleCoverPicClick = () => {
    setOpenCoverPic(true);
  };

  const handleCoverPicCancel = () => {
    setOpenCoverPic(false);
  };

  const handleCoverPicConfirm = () => {
    setOpenCoverPic(false);
  };

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  const [userPostsLength, setUserPostsLength] = useState();

  useEffect(() => {
    const userPosts = posts.filter((post) => post.owner._id === userId);
    // console.log(userPosts.length,"userpost length");
    setUserPostsLength(userPosts.length);
  }, [posts, userId]);

  const user = useSelector(selectAllUsers);

  const [followed, setFollowed] = useState(user.following.includes(userId));

  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setFollowed(user.following.includes(userId));
  }, [user, userId]);

  const [followersLength, setFollowersLength] = useState(null);
  const [followingLength, setFollowingLength] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axiosPrivate.get(`/users/${userId}`);
      // console.log(response.data, "User details of post");

      setFollowersLength(response.data.followers.length);
      setFollowingLength(response.data.following.length);
    };
    fetchUser();
  }, [userId]);

  const handleFollow = async () => {
    try {
      if (followed) {
        await axiosPrivate.put(`/users/${userId}/unfollow`);
        dispatch(updateUnfollow(userId));
      } else {
        await axiosPrivate.put(`/users/${userId}/follow`);
        dispatch(updateFollow(userId));
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
              src={currentUser.coverPicture ? currentUser.coverPictureURL : "/Images/noCover.jpg"}
              alt="coverPic"
              onClick={handleCoverPicClick}
            />
            <CoverPicDialog
              open={openCoverPic}
              close={handleCoverPicCancel}
              profileOwner={currentUser}
              handleConfirm={handleCoverPicConfirm}
            />
            <img
              className="profileUserPicture"
              src={
                currentUser.profilePicture ? currentUser.profilePictureURL : "/Images/noUser.jpg"
              }
              alt="profilePic"
              onClick={handleProfilePicClick}
            />
            <ProfilePicDialog
              open={openProfilePic}
              close={handleProfilePicCancel}
              profileOwner={currentUser}
              handleConfirm={handleProfilePicConfirm}
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
              {`${currentUser.firstName} ${currentUser.lastName}`}
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
            <Typography fontWeight={500}>
              {followersLength} Followers
            </Typography>
            <Typography fontWeight={500}>
              {followingLength} Following
            </Typography>
            <Typography fontWeight={500}>{userPostsLength} Posts</Typography>
            {user._id === userId ? (
              <Button color="error">Delete Profile</Button>
            ) : (
              <Button
                color={followed ? "error" : "success"}
                onClick={handleFollow}
              >
                {followed ? "Unfollow" : "Follow"}
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
