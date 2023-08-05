import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import { Box, Button } from "@mui/material";
import Share from "./Share/Share";
import { Link } from "react-router-dom";

import axios from "../../../utils/axios";
import { useSelector } from "react-redux";

import { selectAllUsers } from "../../../Redux/slices/userSlice";

const Feed = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectAllUsers);
  // console.log(user, "user data from redux store");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = userId
        ? await axios.get(`/posts/profile/${userId}`)
        : await axios.get(`/posts/timeline/${user._id}`);
      console.log(response.data, "posts fetched");
      setPosts(response.data.reverse());
    };
    fetchPosts();
  }, [userId, user._id]);

  return (
    <>
      <Box flex={3.5} p={2}>
        {(!userId || user._id === userId) && <Share />}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </Box>
    </>
  );
};

export default Feed;
