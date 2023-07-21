import { Avatar, AvatarGroup, Box, Typography } from "@mui/material";
import React from "react";

const Rightbar = () => {
  return (
    <>
      <Box
        bgcolor={"#D4F1F4"}
        flex={2}
        p={2}
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <Box position={"fixed"}>
          <Typography variant="h6" fontWeight={200}>
            Online Friends
          </Typography>
          <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
          <Typography variant="h6" fontWeight={200} marginTop={10}>
            People you might know
          </Typography>
          <Box display={"flex"} alignItems={"center"} margin={2} >
            <Avatar />
            <Typography marginLeft={2}>Name</Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} margin={2} >
            <Avatar />
            <Typography marginLeft={2}>Name</Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} margin={2} >
            <Avatar />
            <Typography marginLeft={2}>Name</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Rightbar;
