import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import { useSelector, useDispatch } from "react-redux";

import React, { useEffect, useState } from "react";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  backgroundColor: "#05445E",
  display: "none",
  gap: "15px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#05445E",
  display: "flex",
  gap: "15px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navigationbar = () => {
  const dispatch = useDispatch();


  // WRITE CODE : handle the logout here 
  const handleLogout=()=>{

  }

  
  const user = useSelector(state=>state.user)
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#05445E" }}>
        <StyledToolbar>
          <Typography
            fontFamily="Irish Grover"
            fontWeight={700}
            fontSize={25}
            color={"#D4F1F4"}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Trek Buddies
          </Typography>
          <Typography
            fontFamily="Irish Grover"
            fontWeight={700}
            fontSize={25}
            color={"#D4F1F4"}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            TB
          </Typography>
          <Search>
            <InputBase placeholder="Search..." />
          </Search>
          <Icons>
            <IconButton sx={{ color: "white" }}>
              <HomeIcon />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <PersonIcon />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <Badge badgeContent={4} color="primary">
                <ChatIcon />
              </Badge>
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <Badge badgeContent={4} color="primary">
                <NotificationsActiveIcon />
              </Badge>
            </IconButton>

            <IconButton
              onClick={() => {
                setOpenMenu(true);
              }}
            >
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </IconButton>
          </Icons>
          <UserBox
            onClick={() => {
              setOpenMenu(true);
            }}
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Typography variant="span">{user.name}</Typography>
          </UserBox>
        </StyledToolbar>
        <Menu
          id="basic-menu"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={openMenu}
          onClose={() => {
            setOpenMenu(false);
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </AppBar>
    </>
  );
};

export default Navigationbar;
