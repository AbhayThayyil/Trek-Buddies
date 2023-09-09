import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Person2Icon from "@mui/icons-material/Person2";
import GroupsIcon from "@mui/icons-material/Groups";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import ReportIcon from "@mui/icons-material/Report";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <Box className="menu" sx={{ marginTop: "10px" }}>
        <Box className="item">
          <Box className="title" component={"span"}>
            MAIN
          </Box>
          <List>
            <Link
              to="/admin"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
            </Link>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <Person2Icon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Box className="item">
          <Box className="title" component={"span"}>
            LISTS
          </Box>
          <List>
            <Link
              to="/admin/userList"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <GroupsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to="/admin/postsList"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <InsertPhotoIcon />
                  </ListItemIcon>
                  <ListItemText primary="Posts" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to="/admin/reportsList"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <ReportIcon />
                  </ListItemIcon>
                  <ListItemText primary="Reports" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Box>
      </Box>
    </>
  );
};

export default AdminMenu;
