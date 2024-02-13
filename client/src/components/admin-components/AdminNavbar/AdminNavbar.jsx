import {
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const AdminNavbar = () => {
  return (
    <Box
      className="navbar"
      sx={{
        width: "100%",
        backgroundColor:'#189AB4',
        padding:'10px 0',
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position:'sticky'
      }}
    >
      <Box
        className="logo"
        sx={{
          display: "flex",
          alignItems: "center",
          paddingLeft:'20px'
        }}
      >
        <Typography
          fontFamily="Irish Grover"
          fontWeight={700}
          fontSize={25}
          color={"#D4F1F4"}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Trek Buddies
          <Box
            component={"span"}
            sx={{ paddingLeft: "10px", fontSize: "15px" }}
          >
            admin
          </Box>
        </Typography>
      </Box>
      <Box className="icons" sx={{ display: "flex", alignItems: "center" }}>
        <IconButton sx={{ color: "white" }}>
          <HomeIcon />
        </IconButton>

        <IconButton sx={{ color: "white" }}>
          <PersonIcon />
        </IconButton>
        
        <IconButton sx={{ color: "white" }}>
          <Badge badgeContent={4} color="primary">
            <NotificationsActiveIcon />
          </Badge>
        </IconButton>

        <IconButton>
          <Avatar alt="Remy Sharp" src="" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AdminNavbar;
