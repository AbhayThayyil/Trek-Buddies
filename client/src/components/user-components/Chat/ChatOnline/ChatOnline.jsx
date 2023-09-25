import { Avatar, Badge, Box, Typography } from "@mui/material";
import React from "react";

const ChatOnline = () => {
  return (
    <>
      <Box className="chatOnline">
        <Box
          className="chatOnlineFriend"
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
            margin: "10px",
            padding:'10px'
          }}
        >
          <Badge color="success" variant="dot">
            <Avatar />
          </Badge>
          <Typography>Jane Doe</Typography>
        </Box>
      </Box>
    </>
  );
};

export default ChatOnline;
