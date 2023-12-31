import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllPosts, getPosts } from "../../../Redux/slices/adminSlice";
import PostModalAdmin from "./PostModalAdmin/PostModalAdmin";

const PostsList = () => {
  const axiosPrivate = useAxiosPrivate();

  const dispatch = useDispatch();

  const posts = useSelector(adminGetAllPosts);

  useEffect(() => {
    dispatch(getPosts({ axiosPrivate }));
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
      field: "postId",
      headerName: "Post ID",
      width: 150,
      editable: false,
    },
    {
      field: "owner",
      headerName: "Owner",
      width: 150,
      editable: false,
    },
    {
      field: "reports",
      headerName: "Reports",
      type: "number",
      width: 150,
      editable: true,
      sortable: true,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      type: "date",
      sortable: true,
      width: 160,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "operations",
      headerName: "Operations",
      width: 180,
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
            <PostModalAdmin open={postDialogOpen} close={handlePostDialogCancel} postId={selectedPostId} />
            <Button variant="contained" color="error" sx={{ margin: "5px" }}>
              Remove{" "}
            </Button>
          </>
        );
      },
    },
  ];

  const rows = posts.map((post, index) => ({
    id: index + 1,
    postId: post._id,
    owner: post.owner.firstName + " " + post.owner.lastName,
    reports: post.reports.length,
    updatedAt: post.updatedAt,
  }));

  return (
    <>
      <Box className="postsList">
        <Box
          className="listHeading"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Typography variant="h4" fontWeight={700}>
            Posts List
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

export default PostsList;
