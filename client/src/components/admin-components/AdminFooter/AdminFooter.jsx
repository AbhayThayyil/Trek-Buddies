import { Box } from "@mui/material";
import React from "react";

const AdminFooter = () => {
  return (
    <>
      <Box
        className="footer"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding:'30px'
        }}
      >
        <Box component={"span"} sx={{fontWeight:'bold'}}>trekbuddies</Box>
        <Box component={"span"} sx={{fontSize:'14px'}}>Trek Buddies Admin Dashboard</Box>
      </Box>
    </>
  );
};

export default AdminFooter;
