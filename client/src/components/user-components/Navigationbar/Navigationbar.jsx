import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  TextField,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Autocomplete from "@mui/material/Autocomplete";

import {
  getAllUsersData,
  getAllUsersInfo,
  selectAllUsers,
  userLogout,
} from "../../../Redux/slices/userSlice";

import { useSelector, useDispatch } from "react-redux";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

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
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

  // TODO: WRITE CODE : handle the logout here

  const handleProfileClick = () => {
    <Link to={`/profile/${currentUser?._id}`} />;
  };
  const handleLogout = () => {
    dispatch(userLogout({ axiosPrivate }));
    localStorage.clear()
  };

  // get all users dispatch
  useEffect(() => {
    dispatch(getAllUsersInfo({ axiosPrivate }));
  }, []);

  const user = useSelector(selectAllUsers);
  const allUsers = useSelector(getAllUsersData);

  const currentUser = allUsers.find((eachUser) => eachUser._id === user._id);

  //on clicking an option in search bar
  const handleOptionClick = (e, option) => {
    navigate(`/profile/${option._id}`);
  };

  // console.log(user, "user");
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#05445E" }}>
        <StyledToolbar>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Typography
              fontFamily="Irish Grover"
              fontWeight={700}
              fontSize={25}
              color={"#D4F1F4"}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Trek Buddies
            </Typography>
          </Link>
          <Typography
            fontFamily="Irish Grover"
            fontWeight={700}
            fontSize={25}
            color={"#D4F1F4"}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            TB
          </Typography>

          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={allUsers.map((option) => option)}
            getOptionLabel={(option) =>
              `${option.firstName} ${option.lastName}`
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search for users"
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
            // clearOnBlur="true"
            // blurOnSelect="true"
          />

          <Icons>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <IconButton sx={{ color: "white" }}>
                <HomeIcon />
              </IconButton>
            </Link>

            <IconButton sx={{ color: "white" }}>
              <PersonIcon />
            </IconButton>
            <Link to="/chat" style={{ textDecoration: "none" }}>
              <IconButton sx={{ color: "white" }}>
                <Badge badgeContent={4} color="primary">
                  <ChatIcon />
                </Badge>
              </IconButton>
            </Link>

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
              <Avatar
                alt="Remy Sharp"
                src={
                  currentUser?.profilePicture
                    ? currentUser.profilePictureURL
                    : "/static/images/avatar/1.jpg"
                }
              />
            </IconButton>
          </Icons>
          <UserBox
            onClick={() => {
              setOpenMenu(true);
            }}
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Typography variant="span">{`${currentUser?.firstName} ${currentUser?.lastName}`}</Typography>
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
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </AppBar>
    </>
  );
};

export default Navigationbar;
