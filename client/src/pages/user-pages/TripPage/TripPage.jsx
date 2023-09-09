import { Box, Stack } from "@mui/material";
import React from "react";
import Navigationbar from "../../../components/user-components/Navigationbar/Navigationbar";
import Sidebar from "../../../components/user-components/Sidebar/Sidebar";
import Feed from "../../../components/user-components/Feed/Feed";
import Rightbar from "../../../components/user-components/Rightbar/Rightbar";
import Trip from "../../../components/user-components/Trip/Trip";

const TripPage = () => {
  return (
    <>
      <Box>
        <Navigationbar />
        <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
          <Sidebar />
            <Trip/>
          <Rightbar />
        </Stack>
      </Box>
    </>
  );
};

export default TripPage;
