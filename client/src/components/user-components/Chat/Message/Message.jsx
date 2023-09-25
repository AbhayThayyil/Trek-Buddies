import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

const Message = ({ own }) => {
  const messageAllignment = own ? "flex-end" : "flex-start";
  const messageBackgroundColor = own ? "#EDF0F5" : "#189AB4";
  const messageTextColor = own ? "black" : "white";

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: messageAllignment,
        }}
      >
        <Box
          className="messageTop"
          sx={{ display: "flex", gap: 2, marginTop: "10px" }}
        >
          {!own && <Avatar src="" alt="messageImage" />}
          <Typography
            className="messageText"
            sx={{
              padding: "10px",
              borderRadius: "20px",
              backgroundColor: messageBackgroundColor,
              color: messageTextColor,
              maxWidth: "300px",
            }}
          >
            This is a messageaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa
          </Typography>
        </Box>
        <Box
          className="messageBottom"
          sx={{ fontSize: "12px", marginTop: "10px" }}
        >
          {" "}
          1 hour ago
        </Box>
      </Box>
    </>
  );
};

export default Message;
