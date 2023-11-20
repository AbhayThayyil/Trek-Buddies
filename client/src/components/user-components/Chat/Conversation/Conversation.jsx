import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../../../Redux/slices/userSlice";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const Conversation = ({ conversation }) => {
  const axiosPrivate = useAxiosPrivate();

  const [friendData, setFriendData] = useState(null);

  const user = useSelector(selectAllUsers);

  useEffect(() => {
    const friendId = conversation.members.find((member) => member !== user._id);

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(`/users/${friendId}`);

        setFriendData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [user, conversation]);

  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Avatar src={friendData?.profilePictureURL} alt="Avatar" />
              <Typography sx={{ fontWeight: 600 }}>
                {friendData?.firstName} {friendData?.lastName}
              </Typography>
            </Box>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};

export default Conversation;
