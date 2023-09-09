import { Box, Card, Grid } from "@mui/material";
import React from "react";
import UsersChartbox from "../../../components/admin-components/UsersChartbox/UsersChartbox";
import PostsChartbox from "../../../components/admin-components/PostsChartbox/PostsChartbox";
import ReportsChartbox from "../../../components/admin-components/ReportsChartbox/ReportsChartbox";


const AdminDashboardPage = () => {
  return (
    <>
      <Grid className="home" container spacing={2} my={2}>
        <Grid item className="box1" xs={6} md={4}>
          <Card sx={{ backgroundColor: "#189AB4" }}>
            <UsersChartbox/>
          </Card>
        </Grid>
        <Grid item className="box2" xs={6} md={4}>
          <Card sx={{ backgroundColor: "#189AB4" }}>
            <PostsChartbox/>
          </Card>
        </Grid>
        <Grid item className="box3" xs={6} md={4}>
          <Card sx={{ backgroundColor: "#189AB4" }}>
            <ReportsChartbox/>
          </Card>
        </Grid>
        
      </Grid>
    </>
  );
};

export default AdminDashboardPage;
