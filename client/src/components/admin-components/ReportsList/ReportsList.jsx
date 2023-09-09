import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState,useEffect } from "react";

const ReportsList = () => {
  const [reports,setReports]=useState([])
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "reporter",
      headerName: "Reported By",
      width: 150,
      editable: false,
    },
    {
      field: "reportee",
      headerName: "Report on",
      width: 150,
      editable: false,
    },
    {
      field: "postId",
      headerName: "Post ID",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "reason",
      headerName: "Report Reason",
      sortable: true,
      width: 160,
    },
  ];

  const rows = [{ id: 1, lastName: "Snow", firstName: "Jon", age: 35 }];

  return (
    <>
      <Box className="reportsList">
        <Box
          className="listHeading"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Typography variant="h4" fontWeight={700}>
            Report List
          </Typography>
        </Box>
        <Box
          className="listBody"
          sx={{ height: 400, width: "100%", backgroundColor: "#D4F1F4" }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    </>
  );
};

export default ReportsList;
