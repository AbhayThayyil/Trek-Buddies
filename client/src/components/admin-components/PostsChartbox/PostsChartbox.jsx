import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllPosts, getPosts } from "../../../Redux/slices/adminSlice";

const PostsChartbox = () => {
  const axiosPrivate = useAxiosPrivate();

  const dispatch = useDispatch();

  const posts = useSelector(adminGetAllPosts);

  useEffect(() => {
    dispatch(getPosts({ axiosPrivate }));
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
          <InsertPhotoIcon />
          <Typography variant="h6">Total Posts</Typography>
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
            {posts.length}
          </Typography>
          <Link
            to="/admin/postsList"
            style={{ textDecoration: "none", paddingBottom: "20px" }}
          >
            View All
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default PostsChartbox;
