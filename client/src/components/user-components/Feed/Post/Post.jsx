import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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

const Post = () => {
  const [like, setLike] = useState(2);
  const [isLiked, setIsLiked] = useState(false);
  const [viewComments, setViewComments] = useState(false);
  const [postSettings, setPostSettings] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const likeHandler=()=>{
    setLike(isLiked?like-1:like+1)
    setIsLiked(!isLiked)
  }

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
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red[500]" }} aria-label="recipe">
              R
            </Avatar>
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
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image="https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
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
            />
          </IconButton>
          <Typography> {like} Likes</Typography>

          <IconButton onClick={() => setViewComments(!viewComments)}>
            <CommentOutlinedIcon />
          </IconButton>
          <Typography> 5 Comments</Typography>
        </CardActions>
        {viewComments && <Comments />}
      </Card>
    </>
  );
};

export default Post;
