import React, { useEffect, useRef, useState } from "react";
import Navigationbar from "../Navigationbar/Navigationbar";
import {
  Autocomplete,
  Avatar,
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Conversation from "./Conversation/Conversation";
import Message from "./Message/Message";

import SendIcon from "@mui/icons-material/Send";
import ChatOnline from "./ChatOnline/ChatOnline";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriendsDetails,
  selectAllUsers,
} from "../../../Redux/slices/userSlice";
import {
  initializeSocket,
  selectOnlineUsers,
  selectSocket,
  setOnlineUsers,
} from "../../../Redux/slices/chatSlice";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { io } from "socket.io-client";

const Chat = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState(null);

  const onlineUsers = useSelector(selectOnlineUsers);

  console.log(onlineUsers, "online users chk");

  const socket = useRef();
  const scrollRef = useRef();

  const user = useSelector(selectAllUsers);

  const allFriends = useSelector(getFriendsDetails);

  useEffect(() => {
    socket.current = io("http://localhost:5000");

    socket.current.on("getMessage", (data) => {
      setReceivedMessage({
        sender: data.senderId,
        message: data.text,
        createdAt: Date.now(),
      });
    });
    return () => {
      socket.current.close();
    };
  }, [socket]);

  useEffect(() => {
    receivedMessage &&
      currentChat?.members?.includes(receivedMessage.sender) &&
      setMessages((prev) => [...prev, receivedMessage]);
  }, [receivedMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      dispatch(
        setOnlineUsers(
          user?.following?.filter((friend) =>
            users.some((elem) => elem.userId === friend)
          )
        )
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axiosPrivate.get(
          "/conversations/getConversations"
        );
        setConversations(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getConversations();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axiosPrivate.get(`/chats/${currentChat?._id}`);
        setMessages(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const messageObj = {
      sender: user?._id,
      message: newMessage,
      conversationId: currentChat?._id,
    };

    // To find receiver Id
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    try {
      const response = await axiosPrivate.post("/chats", messageObj);
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  //on clicking an option in search bar
  const handleOptionClick = async (e, option) => {
    try {
      const response = await axiosPrivate.get(
        `conversations/getConversation/${user._id}/${option._id}`
      );
      setCurrentChat(response.data);
    } catch (err) {
      console.log(err);
    }
  };

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
            <Box className="searchWrapper">
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={allFriends.map((option) => option)}
                getOptionLabel={(option) =>
                  `${option.firstName} ${option.lastName}`
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search for friends"
                    sx={{
                      backgroundColor: "white",
                      width: 350,
                      borderRadius: 10,
                    }}
                    size="small"
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props} onClick={(e) => handleOptionClick(e, option)}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={option.profilePictureURL}
                        alt={option.firstName}
                      />
                      <div style={{ marginLeft: 10 }}>
                        <Typography>{`${option.firstName} ${option.lastName}`}</Typography>
                      </div>
                    </div>
                  </li>
                )}
              />
            </Box>
            <Box className="conversationWrapper" sx={{ padding: "10px" }}>
              {conversations.map((conversation) => (
                <Box
                  key={conversation._id}
                  onClick={() => setCurrentChat(conversation)}
                >
                  <Conversation conversation={conversation} />
                </Box>
              ))}
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
              height: "85vh",
            }}
          >
            {currentChat ? (
              <>
                <Box
                  className="chatBoxTop"
                  sx={{
                    height: "100%",
                    flexGrow: 1,
                    overflowY: "scroll",
                    padding: "5px",
                  }}
                >
                  {messages.map((message) => (
                    <Box ref={scrollRef} key={message._id}>
                      <Message
                        message={message}
                        own={message?.sender === user?._id}
                      />
                    </Box>
                  ))}
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
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <IconButton
                    type="submit"
                    sx={{ padding: "10px", margin: "5px" }}
                    onClick={handleMessageSubmit}
                  >
                    <SendIcon
                      sx={{
                        color: "#189AB4",
                      }}
                    />
                  </IconButton>
                </Box>
              </>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  variant="h3"
                  color="grey"
                  textAlign={"center"}
                  sx={{ marginTop: "100px" }}
                >
                  Click a conversation to start a chat
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box
          className="chatOnline"
          sx={{ flex: 3, backgroundColor: "#EDF0F5" }}
        >
          <Box
            className="chatOnlineWrapper"
            sx={{ padding: "10px", height: "100%" }}
          >
            <Typography variant="h5">These people are Online</Typography>
            <ChatOnline
              currentUserId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Chat;
