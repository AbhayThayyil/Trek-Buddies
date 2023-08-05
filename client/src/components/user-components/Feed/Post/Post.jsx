import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TimeAgo from "timeago-react";
import axios from "../../../../utils/axios";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Collapse,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import Comments from "./Comments/Comments";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const [like, setLike] = useState(post?.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [comments,setComments]=useState(post?.comments)
  const [viewComments, setViewComments] = useState(false);
  const [postSettings, setPostSettings] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [postOwner, setPostOwner] = useState();

  const user = useSelector((state) => state.user);
  console.log(post, "post details passed ");
  console.log(comments,"comments list");

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`users/${post?.owner?._id}`);
      console.log(response.data, "User details of post");
      setPostOwner(response.data);
    };
    fetchUser();
  }, [post?.owner?._id]);

  const likeHandler = () => {
    const handleLike=async()=>{
      try {
        const response=await axios.put(`/posts/${post?._id}/like`, { owner: user._id });
        console.log(response,"like response");
      } catch (err) {
        console.log(err, "like error ");
      }
    }
    handleLike()
    
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked((prevLiked)=>!prevLiked);
  };

  const handlePostSettingsOpen = (e) => {
    setPostSettings(true);
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <Card
        sx={{
          margin: 5,
          maxWidth: "100%",
          boxShadow: "0px 0px 4px rgba(0,0,0,0.2)",
          "@media (max-width: 600px)": {
            maxWidth: "100%",
          },
        }}
      >
        {/* // todo: FIX THE LINKS */}
        <CardHeader
          avatar={
            <Link to={`/profile/${postOwner?._id}`} >
              <Avatar sx={{ bgcolor: "red[500]" }} aria-label="recipe" src="" />
            </Link>
          }
          action={
            <>
              <IconButton
                aria-label="settings"
                onClick={handlePostSettingsOpen}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={postSettings}
                onClose={() => {
                  setPostSettings(false);
                }}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Report</MenuItem>
              </Menu>
            </>
          }
          //  todo: fix all links
          title={
            <Link
              to={`/profile/${postOwner?._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography sx={{ fontWeight: "700" }}>
                {postOwner?.firstName + " " + postOwner?.lastName}
              </Typography>
            </Link>
          }
          subheader={
            <>
              <TimeAgo datetime={post?.createdAt} />
            </>
          }
        />
        <Box paddingLeft={1} paddingRight={1}>
          <CardMedia
            component="img"
            height="194"
            image="https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
            alt="Paella dish"
            // maxWidth={"100%"}

            // style={{paddingLeft:'10px',paddingRight:'10px'}}
          />
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post?.description}
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{ display: "flex", alignItems: "center" }}
        >
          <IconButton onClick={likeHandler}>
            <Checkbox
              icon={<FavoriteBorderIcon />}
              checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
              checked={isLiked}
            />
          </IconButton>
          <Typography> {like} Likes</Typography>

          <IconButton onClick={() => setViewComments(!viewComments)}>
            <CommentOutlinedIcon />
          </IconButton>
          <Typography> {post?.comments?.length} Comments</Typography>
        </CardActions>
        {viewComments && (comments.map((comment)=>(
          <Comments key={comment.userId} comment={comment}/>
        )))}
      </Card>
    </>
  );
};

export default Post;
