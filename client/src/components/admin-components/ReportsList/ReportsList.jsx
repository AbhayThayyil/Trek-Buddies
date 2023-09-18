import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import {
  adminGetAllPosts,
  adminGetAllReports,
  adminGetAllUsers,
  getReports,
} from "../../../Redux/slices/adminSlice";
import PostModalAdmin from "../PostsList/PostModalAdmin/PostModalAdmin";

const ReportsList = () => {
  const reports = useSelector(adminGetAllReports);
  const axiosPrivate = useAxiosPrivate();

  const dispatch = useDispatch();

  const users = useSelector(adminGetAllUsers);

  const posts = useSelector(adminGetAllPosts);

  useEffect(() => {
    dispatch(getReports({ axiosPrivate }));
  }, [dispatch, axiosPrivate]);

  // To open MODAL to VIEW the POST
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");

  const handlePostDialogClick = (postId) => {
    // console.log(postId, "postid click check");
    setPostDialogOpen(true);
    setSelectedPostId(postId);
  };

  const handlePostDialogCancel = () => {
    setPostDialogOpen(false);
  };

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
    {
      field: "operations",
      headerName: "Operations",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              sx={{ margin: "5px" }}
              onClick={() => handlePostDialogClick(params.row.postId)}
            >
              View{" "}
            </Button>
            <PostModalAdmin
              open={postDialogOpen}
              close={handlePostDialogCancel}
              postId={selectedPostId}
            />
            <Button variant="contained" color="error" sx={{ margin: "5px" }}>
              Remove{" "}
            </Button>
            <Button variant="contained" color="success" sx={{ margin: "5px" }}>
              Approve{" "}
            </Button>
          </>
        );
      },
    },
  ];

  const rows = reports.map((report, index) => ({
    id: index + 1,
    reporter: report.userId,
    reportee: report.reportedUserId,
    postId: report.postId,
    reason: report.reportReason,
  }));

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
