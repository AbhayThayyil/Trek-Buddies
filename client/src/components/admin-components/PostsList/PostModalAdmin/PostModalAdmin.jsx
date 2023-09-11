import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import TimeAgo from "timeago-react";
import { useSelector } from "react-redux";
import { adminGetAllPosts } from "../../../../Redux/slices/adminSlice";
import Comments from "../../../user-components/Feed/Post/Comments/Comments";

const PostModalAdmin = ({ open, close, postId }) => {
  const [viewComments, setViewComments] = useState(false);
  const [comments, setComments] = useState();

  const posts = useSelector(adminGetAllPosts);

  const post = posts.find((post) => post._id === postId);
  //   console.log(post,"post to display");
  
    // To set comments to state
  useEffect(() => {
    if (post?.comments) {
      setComments(post.comments);
    }
    else{
        setComments(null)
    }
  });

  

  return (
    <>
      <Dialog
        open={open}
        onClose={close}
        maxWidth="lg"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">This is the Post</DialogTitle>
        <DialogContent>
          <Box>
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
                  <Avatar
                    sx={{ bgcolor: "red[500]" }}
                    aria-label="recipe"
                    src={post?.owner?.profilePicture}
                  />
                }
                title={
                  <Typography sx={{ fontWeight: "700" }}>
                    {post?.owner?.firstName + " " + post?.owner?.lastName}
                  </Typography>
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
                  height="250"
                  image={post?.imageURL}
                  alt="Paella dish"
                  // maxWidth={"100%"}

                  // style={{paddingLeft:'10px',paddingRight:'10px'}}
                  sx={{ objectFit: "contain" }}
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
                <IconButton>
                  <FavoriteBorderIcon />
                  <Typography> {post?.likes?.length} Likes</Typography>
                </IconButton>

                <IconButton onClick={() => setViewComments(!viewComments)}>
                  <CommentOutlinedIcon />
                </IconButton>
                <Typography> {post?.comments?.length} Comments</Typography>
              </CardActions>

              {viewComments &&
                comments.map((comment) => (
                  <Comments
                    key={comment._id}
                    comment={comment}
                    post={post._id}
                  />
                ))}
            </Card>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostModalAdmin;
