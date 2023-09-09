import { Box, Typography } from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllUsers, getUsers } from "../../../Redux/slices/adminSlice";

const UsersChartbox = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const users=useSelector(adminGetAllUsers)

  useEffect(() => {
    dispatch(getUsers({ axiosPrivate }));
  }, [dispatch, axiosPrivate]);

  return (
    <>
      <Box className="usersBox">
        <Box
          className="boxHead"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <GroupsIcon />
          <Typography variant="h6">Total Users</Typography>
        </Box>
        <Box
          className="boxBody"
          sx={{
            backgroundColor: "#D4F1F4",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "20px",
            gap: 3,
          }}
        >
          <Typography variant="h4" fontSize={50}>
            {users.length}
          </Typography>
          <Link
            to="/admin/userList"
            style={{ textDecoration: "none", paddingBottom: "20px" }}
          >
            View All
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default UsersChartbox;
