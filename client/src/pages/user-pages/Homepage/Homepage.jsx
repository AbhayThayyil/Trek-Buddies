import React from "react";
import {Link} from 'react-router-dom'

import Sidebar from "../../../components/user-components/Sidebar/Sidebar";
import Feed from "../../../components/user-components/Feed/Feed";
import Rightbar from "../../../components/user-components/Rightbar/Rightbar";
import { Box, Stack } from "@mui/material";
import Navigationbar from "../../../components/user-components/Navigationbar/Navigationbar";
import Share from "../../../components/user-components/Feed/Share/Share";
import Users from "../../../components/Users";

const Homepage = () => {
  return (
    <>
      <Box>
       
        <Navigationbar />
        
        <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
          <Sidebar />
          
          <Feed />
          <Rightbar />
        </Stack>
      </Box>
    </>
  );
};

export default Homepage;
