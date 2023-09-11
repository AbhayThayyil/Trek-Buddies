import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import React, { useState } from "react";
import TimeAgo from "timeago-react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../../../../../Redux/slices/userSlice";
import ConfirmDelete from "../../../DialogComponents/confirmDelete";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import {
  deleteComment,
  editComment,
} from "../../../../../Redux/slices/postSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../../../../../helpers/ToastHelper";
import EditCommentDialog from "../../../DialogComponents/EditCommentDialog";

const Comments = ({ comment, post }) => {
  const [commentSettings, setCommentSettings] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const user = useSelector(selectAllUsers);

  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

  const handleSettingsOpen = (e) => {
    setCommentSettings(true);
    setAnchorEl(e.currentTarget);
  };

  // Edit comment
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleEditClick = () => {
    setShowEditDialog(true);
  };

  const handleEditConfirm = (editedCommentText) => {
    // console.log(editedCommentText,"dispaxcth chk");
    dispatch(
      editComment({
        axiosPrivate,
        commentId: comment._id,
        postId: post,
        editedCommentText,
      })
    );
    showToast("Comment edited");

    setShowEditDialog(false);
    setCommentSettings(false);
  };

  const handleEditCancel = () => {
    setShowEditDialog(false);
    setCommentSettings(false);
  };

  // Delete comment
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(
      deleteComment({ axiosPrivate, commentId: comment._id, postId: post })
    );
    showToast("Deleted successfully");

    setShowConfirm(false);
    setCommentSettings(false);
  };

  const handleDeleteCancel = () => {
    setShowConfirm(false);
    setCommentSettings(false);
  };

  return (
    <>
      <Box className="comment-container">
        <ToastContainer />
        <Box
          className="other-comments-container"
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={4}
          gap={2}
        >
          <Avatar />
          <Box sx={{ flex: 1, marginLeft: 2 }}>
            <Typography component={"span"} variant="h6">
              {" "}
              {`${comment.userId.firstName} ${comment.userId.lastName}`}
            </Typography>
            <Typography component={"span"} marginLeft={2} color={"grey"}>
              {" "}
              <TimeAgo datetime={comment?.updatedAt} />
            </Typography>
            <Typography
              component={"p"}
              fullwidth={"true"}
              sx={{ wordWrap: "break-word", maxWidth: "350px" }}
            >
              {comment.comment}
            </Typography>
          </Box>

          <IconButton aria-label="settings" onClick={handleSettingsOpen}>
            <MoreVertIcon />
          </IconButton>
          {user._id === comment.userId._id && (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={commentSettings}
              onClose={() => {
                setCommentSettings(false);
              }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleEditClick}>Edit</MenuItem>
              <EditCommentDialog
                open={showEditDialog}
                commentId={comment._id}
                postId={post}
                handleConfirm={handleEditConfirm}
                handleClose={handleEditCancel}
              />

              <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>

              <ConfirmDelete
                open={showConfirm}
                handleClose={handleDeleteCancel}
                handleConfirm={handleDeleteConfirm}
                description="Are you sure you want to delete this comment ? "
              />
            </Menu>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Comments;
