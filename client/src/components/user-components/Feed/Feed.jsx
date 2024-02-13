import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import { Box, Button } from "@mui/material";
import Share from "./Share/Share";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useSelector, useDispatch } from "react-redux";

import {
  getAllUsersInfo,
  selectAllUsers,
} from "../../../Redux/slices/userSlice";
import { fetchPosts, getAllPosts } from "../../../Redux/slices/postSlice";

const Feed = ({ userId }) => {
  // console.log(userId, "id check");
  const axiosPrivate = useAxiosPrivate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersInfo({ axiosPrivate }));
  }, []);

  

  const posts = useSelector(getAllPosts);
  console.log(posts);
  const user = useSelector(selectAllUsers);
  console.log(user, "user data from redux store");

  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

  

  useEffect(() => {
    dispatch(fetchPosts({ axiosPrivate }));

    // console.log('fetch posts useeffect runs');
  }, [dispatch, axiosPrivate]);

  // console.log(posts, "all posts on feed");
 

  return (
    <>
      <Box flex={3.5} p={2}>
        {(!userId || user._id === userId) && <Share />}

        {userId
          ? posts
              .filter((post) => post.owner._id === userId)
              .map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  
                />
              ))
          : posts.map((post) => (
              <Post
                key={post._id}
                post={post}
                
              />
            ))}
      </Box>
    </>
  );
};

export default Feed;
