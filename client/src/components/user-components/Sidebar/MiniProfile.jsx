import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect } from "react";

import "./miniProfile.css";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllUsersData,
  getAllUsersInfo,
  selectAllUsers,
} from "../../../Redux/slices/userSlice";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const MiniProfile = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    dispatch(getAllUsersInfo({ axiosPrivate }));
  }, []);

  const user = useSelector(selectAllUsers);
  const allUsers = useSelector(getAllUsersData);
  const currentUser = allUsers.find((eachUser) => eachUser._id === user._id);
  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

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
            <img
              src={
                currentUser?.coverPicture
                  ? currentUser?.coverPictureURL
                  : "/Images/noCover.jpg"
              }
              alt=""
              className="userCardCover"
            />
            <Avatar
              src={
                currentUser?.profilePicture
                  ? currentUser?.profilePictureURL
                  : "/Images/noUser.jpg"
              }
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                margin: "auto",
                top: "60px",
                width: "55px",
                height: "55px",
              }}
            />
            <Typography variant="h2" fontSize={20} marginTop={4}>
              {`${currentUser?.firstName} ${currentUser?.lastName}`}
            </Typography>
            <Typography variant="h4" fontSize={15}>
              {currentUser?.bio}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MiniProfile;
