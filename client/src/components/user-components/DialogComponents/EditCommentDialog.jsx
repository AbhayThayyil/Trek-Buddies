import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { getAllPosts } from "../../../Redux/slices/postSlice";

const EditCommentDialog = ({
  open,
  handleClose,
  handleConfirm,
  commentId,
  postId,
}) => {
  const posts = useSelector(getAllPosts);
  const post = posts.find((post) => post._id === postId);
  const comment = post.comments.find((comment) => comment._id === commentId);

  const textRef = useRef();

  const [editedCommentText, setEditedCommentText] = useState(comment.comment);

  const handleCommentTextChange=(e)=>{
    e.preventDefault()
    console.log(e.target.value,"value chk");
    setEditedCommentText(e.target.value)
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit a Comment</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "20px" }}>
            Edit your comment below
          </DialogContentText>
          <Stack>
            <TextField
              name="comment"
              ref={textRef}
              value={editedCommentText}
              onChange={handleCommentTextChange}
              
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="success"
            onClick={handleConfirm(editedCommentText)}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditCommentDialog;
