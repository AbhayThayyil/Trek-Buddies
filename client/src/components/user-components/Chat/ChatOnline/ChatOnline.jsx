import { Avatar, Badge, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFriendsDetails } from "../../../../Redux/slices/userSlice";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const ChatOnline = ({ onlineUsers, currentUserId, setCurrentChat }) => {
  const axiosPrivate = useAxiosPrivate();

  const friends = useSelector(getFriendsDetails);

  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((friend) => onlineUsers.includes(friend._id))
    );
  }, [friends, onlineUsers]);

  const handleOnlineUserClick = async (user) => {
    try {
      const response = await axiosPrivate.get(
        `conversations/getConversation/${currentUserId}/${user._id}`
      );
      setCurrentChat(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Box className="chatOnline">
        {onlineFriends.map((friend) => (
          <Box
            className="chatOnlineFriend"
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
              margin: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleOnlineUserClick(friend)}
          >
            <Badge color="success" variant="dot">
              <Avatar src={friend?.profilePictureURL} />
            </Badge>
            <Typography>
              {friend?.firstName} {friend?.lastName}{" "}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ChatOnline;
