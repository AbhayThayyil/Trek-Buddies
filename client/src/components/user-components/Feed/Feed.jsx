import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import { Box, Button } from "@mui/material";
import Share from "./Share/Share";
import { Link } from "react-router-dom";
import axios from "../../../utils/axios";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useSelector ,useDispatch} from "react-redux";

import { selectAllUsers } from "../../../Redux/slices/userSlice";
import { fetchPosts, getAllPosts } from "../../../Redux/slices/postSlice";

const Feed = ({ userId }) => {
  const axiosPrivate=useAxiosPrivate()

  const dispatch=useDispatch()
  
  const posts=useSelector(getAllPosts)
  const user = useSelector(selectAllUsers);
  // console.log(user, "user data from redux store");
  

  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

  

  useEffect(()=>{
    dispatch(fetchPosts({userId,axiosPrivate}))
    // console.log('fetch posts useeffect runs');
    
  },[dispatch,userId,axiosPrivate])

  return (
    <>
      <Box flex={3.5} p={2} >
        {(!userId || user._id === userId) && <Share />}
        {posts.map((post) => (
          <Post key={post._id} post={post} development={import.meta.env.VITE_APP_DEVELOPMENT==='true'} />
        ))}
      </Box>
    </>
  );
};

export default Feed;
