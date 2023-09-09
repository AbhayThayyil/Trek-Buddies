import { Box } from "@mui/material";
import React from "react";
import AdminNavbar from "../../components/admin-components/AdminNavbar/AdminNavbar";
import AdminFooter from "../../components/admin-components/AdminFooter/AdminFooter";
import AdminMenu from "../../components/admin-components/AdminMenu/AdminMenu";

import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <Box className="main" sx={{ backgroundColor: "#BDD6F1" }}>
      <AdminNavbar />
      <Box className="container" sx={{ display: "flex" }}>
        <Box
          className="menuContainer"
          sx={{
            width: "250px",
            padding: "5px 20px",
            borderRight: "2px solid lightGrey",
          }}
        >
          <AdminMenu />
        </Box>
        <Box
          className="contentContainer"
          sx={{ padding: "5px 20px", width: "100%" }}
        >
          <Outlet />
        </Box>
      </Box>
      <AdminFooter />
    </Box>
  );
};

export default AdminLayout;
