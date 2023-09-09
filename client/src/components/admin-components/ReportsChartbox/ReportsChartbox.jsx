import React from 'react'
import ReportIcon from '@mui/icons-material/Report';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const ReportsChartbox = () => {
  return (
    <>
    <Box className="usersBox">
        <Box
          className="boxHead"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <ReportIcon />
          <Typography variant="h6">Total Reports</Typography>
        </Box>
        <Box
          className="boxBody"
          sx={{
            backgroundColor: "#D4F1F4",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "20px",
            gap: 3,
          }}
        >
          <Typography variant="h4" fontSize={50}>
            3
          </Typography>
          <Link to="/admin/reportsList" style={{ textDecoration: "none", paddingBottom: "20px" }}>
            View All
          </Link>
        </Box>
      </Box>
      </>
  )
}

export default ReportsChartbox