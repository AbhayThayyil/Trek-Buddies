import React, { useEffect } from 'react'
import ReportIcon from '@mui/icons-material/Report';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import { adminGetAllReports, getReports } from '../../../Redux/slices/adminSlice';


const ReportsChartbox = () => {

  const axiosPrivate = useAxiosPrivate();

  const dispatch = useDispatch();

  const reports = useSelector(adminGetAllReports);

  useEffect(() => {
    dispatch(getReports({ axiosPrivate }));
  }, [dispatch, axiosPrivate]);


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
            {reports.length}
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