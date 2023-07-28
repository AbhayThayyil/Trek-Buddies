import React from "react";
import Post from "./Post/Post";
import { Box, Button } from "@mui/material";
import Share from "./Share/Share";
import { Link } from "react-router-dom";

const Feed = () => {
  return (
    <>
      <Box flex={3.5} p={2}>
        <Share />
        <Post />
        <Post />
        <Post />
      </Box>
    </>
  );
};

export default Feed;
