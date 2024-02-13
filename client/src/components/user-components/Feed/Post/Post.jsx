import React, { useCallback, useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TimeAgo from "timeago-react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

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
import SendIcon from "@mui/icons-material/Send";
import Comments from "./Comments/Comments";
import { useTheme } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchUser,
  getAllUsersData,
  selectAllUsers,
} from "../../../../Redux/slices/userSlice";
import {
  createComment,
  deletePost,
  handleLike,
  reportPost,
} from "../../../../Redux/slices/postSlice";
import ConfirmDelete from "../../DialogComponents/confirmDelete";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../../../../helpers/ToastHelper";
import UpdatePost from "./UpdatePost/UpdatePost";
import ReportPost from "./ReportPost/ReportPost";

// const development=import.meta.env.VITE_APP_DEVELOPMENT==='true'  // todo : To save s3 calls.Change on production

const Post = ({ post }) => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const [like, setLike] = useState(post?.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState();
  const [viewComments, setViewComments] = useState(false);
  const [postSettings, setPostSettings] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tags, setTags] = useState([]);

  const allUsers = useSelector(getAllUsersData);

  const currentUser = allUsers.find((user) => user._id === post.owner._id);

  console.log(currentUser);

  // To set tags
  useEffect(() => {
    if (post?.tags) setTags(post.tags);
  }, []);

  // To edit a post
  const [showEditDialog, setShowEditDialog] = useState(false);
  const handleEditPostClick = () => {
    setShowEditDialog(true);
  };
  const handleEditPostCancel = () => {
    setShowEditDialog(false);
    setPostSettings(false);
  };
  const handeleEditPostConfirm = () => {
    // todo write update post dispatch code here

    setShowEditDialog(false);
    setPostSettings(false);
    showToast("Updated the post successfully");
  };

  // To report a Post
  const [showReportPostDialog, setShowReportPostDialog] = useState(false);
  const handleReportPostClick = () => {
    setShowReportPostDialog(true);
  };

  const handleReportPostConfirm = (reportReasonText) => {
    // console.log(reportObject,"updated chk in confirm");
    dispatch(reportPost({ axiosPrivate, reportReasonText, postId: post._id }));
    //todo write dispatch for report post

    setShowReportPostDialog(false);
    setPostSettings(false);
    showToast("Reported successfully !");
  };

  const handleReportPostCancel = () => {
    setShowReportPostDialog(false);
    setPostSettings(false);
  };

  // To delete a Post
  const [showDeletePostConfirm, setShowDeletePostConfirm] = useState(false);
  const handleDeletePostClick = () => {
    setShowDeletePostConfirm(true);
  };

  const handleDeletePostConfirm = () => {
    dispatch(deletePost({ axiosPrivate, postId: post._id }));

    setShowDeletePostConfirm(false);
    setPostSettings(false);
    showToast("Deleted the post successfully");
  };

  const handleDeletePostCancel = () => {
    setShowDeletePostConfirm(false);
    setPostSettings(false);
  };

  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

  const user = useSelector(selectAllUsers);

  useEffect(() => {
    const sortedComments = [...post?.comments].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    setComments(sortedComments);
  }, [post.comments]);

  // console.log(user,"user data ");
  // console.log(post, "post details passed ");
  // console.log(comments, "comments list");

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  // Optimize the effect by memoizing the dispatch function
  const fetchUserData = useCallback(() => {
    dispatch(fetchUser({ post, axiosPrivate }));
  }, [dispatch, post, axiosPrivate]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const likeHandler = () => {
    dispatch(handleLike({ post, user, axiosPrivate }));

    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked((prevLiked) => !prevLiked);
  };

  const handlePostSettingsOpen = (e) => {
    setPostSettings(true);
    setAnchorEl(e.currentTarget);
  };

  const handleComment = (e) => {
    e.preventDefault;
    // console.log("comment is :", commentText);
    dispatch(createComment({ commentText, post, axiosPrivate }));
    setCommentText("");
  };

  return (
    <>
      <ToastContainer />
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
            <Link to={`/profile/${post?.owner?._id}`}>
              <Avatar
                sx={{ bgcolor: "red[500]" }}
                aria-label="recipe"
                src={
                  currentUser?.profilePicture
                    ? currentUser?.profilePictureURL
                    : "/Images/noUser.jpg"
                }
              />
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
                {post?.owner?._id === user._id ? (
                  <Box key={post._id}>
                    <MenuItem onClick={handleEditPostClick}>Edit</MenuItem>
                    <UpdatePost
                      open={showEditDialog}
                      handleClose={handleEditPostCancel}
                      handleConfirm={handeleEditPostConfirm}
                      postId={post._id}
                    />
                    <MenuItem onClick={handleDeletePostClick}>Delete</MenuItem>
                    <ConfirmDelete
                      open={showDeletePostConfirm}
                      handleClose={handleDeletePostCancel}
                      handleConfirm={handleDeletePostConfirm}
                      description="Are you sure you want to delete this post ? Once deleted,it can't be recovered "
                    />
                  </Box>
                ) : (
                  <Box key={post._id}>
                    <MenuItem onClick={handleReportPostClick}>Report</MenuItem>
                    <ReportPost
                      open={showReportPostDialog}
                      handleClose={handleReportPostCancel}
                      handleConfirm={handleReportPostConfirm}
                      postId={post._id}
                    />
                  </Box>
                )}
              </Menu>
            </>
          }
          //  todo: fix all links
          title={
            <Link
              to={`/profile/${post?.owner?._id}`}
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                gap: "10px",
              }}
            >
              <Typography sx={{ fontWeight: "700" }}>
                {post?.owner?.firstName + " " + post?.owner?.lastName}
              </Typography>
              <Typography>
                {tags.length > 0 && `with ${tags.length} others`}
              </Typography>
              <Typography>{post?.location && `at ${post.location}`}</Typography>
            </Link>
          }
          subheader={
            <>
              <TimeAgo datetime={post?.createdAt} />
            </>
          }
        />

        <Box paddingLeft={1} paddingRight={1}>
          {post.image && (
            <CardMedia
              component="img"
              height="250"
              
              image={
                import.meta.env.VITE_NODE_ENV === "production"
                  ? post?.imageURL
                  : "Images/coverPic.avif"
              }
              alt="Paella dish"
              // maxWidth={"100%"}

              // style={{paddingLeft:'10px',paddingRight:'10px'}}
              sx={{ objectFit: "contain" }}
            />
          )}
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
          <Typography>
            {" "}
            {like <= 1 ? `${like} Like` : `${like} Likes`}
          </Typography>

          <IconButton onClick={() => setViewComments(!viewComments)}>
            <CommentOutlinedIcon />
          </IconButton>
          <Typography> {post?.comments?.length} Comments</Typography>
        </CardActions>

        {viewComments && (
          <>
            <Box
              className="user-comment-container"
              display={"flex"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
              padding={2}
              gap={2}
            >
              <Avatar />
              <TextField
                placeholder="Add a comment..."
                name="comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                autoComplete="off"
              />
              <IconButton onClick={handleComment} type="submit">
                <SendIcon
                  sx={{
                    color: "#189AB4",
                  }}
                />
              </IconButton>
            </Box>
          </>
        )}

        {viewComments &&
          comments.map((comment) => (
            <Comments key={comment._id} comment={comment} post={post._id} />
          ))}
      </Card>
    </>
  );
};

export default Post;
