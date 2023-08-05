import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import MapIcon from "@mui/icons-material/Map";
import ApartmentIcon from "@mui/icons-material/Apartment";

import { Link } from "react-router-dom";
import React from "react";
import MiniProfile from "./MiniProfile";
import { useSelector } from "react-redux";

import { selectAllUsers } from "../../../Redux/slices/userSlice";



const Sidebar = () => {
  const user=useSelector(selectAllUsers)
  return (
    <>
      <Box
        bgcolor={"#189AB4"}
        flex={1}
        p={2}
        sx={{ display: { xs: "none", sm: "block" }, position: "sticky" }}
      >
        <Box position={"fixed"} justifyContent={"center"}>
          <Link to={`/profile/${user?._id}`} style={{textDecoration:'none',color:'black'}}>
            <MiniProfile />
          </Link>

          <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <GroupsIcon />
                </ListItemIcon>
                <ListItemText primary="Groups" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Dream Spots" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <Diversity3Icon />
                </ListItemIcon>
                <ListItemText primary="Travel Mates" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <MapIcon />
                </ListItemIcon>
                <ListItemText primary="Trips" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <ApartmentIcon />
                </ListItemIcon>
                <ListItemText primary="Accomodations" />
              </ListItemButton>
            </ListItem>

            <Link to={"/listUsers"}>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <ApartmentIcon />
                </ListItemIcon>
                <ListItemText primary="Accomodations" />
              </ListItemButton>
            </ListItem>
            </Link>

          </List>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
