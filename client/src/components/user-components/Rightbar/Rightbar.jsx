import { Avatar, AvatarGroup, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllUsersData,
  getAllUsersInfo,
  selectAllUsers,
} from "../../../Redux/slices/userSlice";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Rightbar = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const user = useSelector(selectAllUsers);

  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

  useEffect(() => {
    dispatch(getAllUsersInfo({ axiosPrivate }));
  }, []);

  const usersList = useSelector(getAllUsersData);
  const allUsers = usersList.filter((users) => !users._id.includes(user._id));

  return (
    <>
      <Box
        bgcolor={"#D4F1F4"}
        flex={1.5}
        p={2}
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <Box position={"fixed"}>
          <Typography variant="h6" fontWeight={200}>
            Online Friends
          </Typography>
          <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
          <Typography variant="h6" fontWeight={200} marginTop={10}>
            People you might know
          </Typography>

          {allUsers.map((user) => (
            <Link
              to={`/profile/${user?._id}`}
              style={{ textDecoration: "none", color: "black" }}
              key={user._id}
            >
              <Box display={"flex"} alignItems={"center"} margin={2}>
                <Avatar
                  src={
                    user.profilePicture
                      ? user.profilePictureURL
                      : "/Images/noUser.jpg"
                  }
                />
                <Typography
                  marginLeft={2}
                >{`${user.firstName} ${user.lastName}`}</Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Rightbar;
