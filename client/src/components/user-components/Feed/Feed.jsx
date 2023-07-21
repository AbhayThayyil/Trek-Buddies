import React from "react";
import Post from "./Post/Post";
import { Box, Button } from "@mui/material";
import Share from "./Share/Share";

const Feed = () => {
  return (
    <>
      <Box flex={4} p={2}>
        <Share/>
        <Post />
        <Post />
        <Post />
      </Box>
    </>
  );
};

export default Feed;
