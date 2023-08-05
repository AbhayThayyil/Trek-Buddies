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

const Comments = ({comment}) => {
  const [commentSettings, setCommentSettings] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSettingsOpen = (e) => {
    setCommentSettings(true);
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <Box className="comment-container">
        <Box
          className="user-comment-container"
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          padding={2}
          gap={2}
        >
          <Avatar />
          <TextField  placeholder="Add a comment..." />
          <Button
            sx={{
              backgroundColor: "#189AB4",
              color: "white",
              "&:hover": {
                backgroundColor: "#75E6DA",
              },
            }}
          >
            Send
          </Button>
        </Box>
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
              {comment}
            </Typography>
            <Typography component={"span"} marginLeft={2} color={"grey"}>
              {" "}
              an hour ago
            </Typography>
            <Typography
              component={"p"}
              fullWidth={"true"}
              sx={{ wordWrap: "break-word", maxWidth: "350px" }}
            >
              {comment.comment}
            </Typography>
          </Box>

          <IconButton aria-label="settings" onClick={handleSettingsOpen}>
            <MoreVertIcon />
          </IconButton>
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
            <MenuItem>Delete</MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default Comments;
