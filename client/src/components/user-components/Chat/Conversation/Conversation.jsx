import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import React from "react";

const Conversation = () => {
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
              <Avatar src="" alt="Avatar" />
              <Typography sx={{fontWeight:600}}>Jane Doe</Typography>
            </Box>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};

export default Conversation;
