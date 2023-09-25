import React from "react";
import Navigationbar from "../Navigationbar/Navigationbar";
import { Box, IconButton, TextField } from "@mui/material";
import Conversation from "./Conversation/Conversation";
import Message from "./Message/Message";

import SendIcon from "@mui/icons-material/Send";
import ChatOnline from "./ChatOnline/ChatOnline";

const Chat = () => {
  return (
    <>
      <Navigationbar />
      <Box
        className="chat"
        sx={{ height: "calc(100vh-65px)", display: "flex", overflow: "" }}
      >
        <Box className="chatMenu" sx={{ flex: 3 }}>
          <Box
            className="chatMenuWrapper"
            sx={{ padding: "10px", height: "100%", backgroundColor: "#D4F1F4" }}
          >
            {/* <Box className="searchWrapper"> */}
            <TextField
              label="Search"
              placeholder="Search for friends..."
              type="search"
              fullWidth
              sx={{ marginTop: "5px", backgroundColor: "white" }}
            />
            {/* </Box> */}
            <Box className="conversationWrapper" sx={{ padding: "10px" }}>
            <Conversation />
            <Conversation />
            <Conversation />
            </Box>
          </Box>
        </Box>
        <Box
          className="chatBox"
          sx={{ flex: 6, marginTop: "10px", height: "100%" }}
        >
          <Box
            className="chatBoxWrapper"
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              height:'85vh'
            }}
          >
            <Box className="chatBoxTop" sx={{height:'100%',flexGrow:1,overflowY:'scroll',padding:'5px'}}>
              <Message />
              <Message own="true" />
              <Message />
              <Message own="true" />
              <Message />
            </Box>
            <Box
              className="chatBoxBottom"
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "5px",
                justifyContent: "space-between",
              }}
            >
              <TextField
                className="chatMessageInput"
                fullWidth
                placeholder="Message..."
              />
              <IconButton type="submit" sx={{ padding: "10px", margin: "5px" }}>
                <SendIcon
                  sx={{
                    color: "#189AB4",
                  }}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box className="chatOnline" sx={{ flex: 3, backgroundColor: "#EDF0F5" }}>
          <Box
            className="chatOnlineWrapper"
            sx={{ padding: "10px", height: "100%" }}
          >
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Chat;
