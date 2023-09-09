import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { adminGetAllUsers, getUsers } from "../../../Redux/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";

const UserList = () => {
  const axiosPrivate=useAxiosPrivate()

  const dispatch=useDispatch()

  const users=useSelector(adminGetAllUsers)

  useEffect(() => {
    dispatch(getUsers({ axiosPrivate }));
  }, [dispatch, axiosPrivate]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      width: 150,
      editable: true,
      valueFormatter: (params) => {
        return params.value.toString(); // Convert number to string without formatting
      },
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      sortable: true,
      width: 160,
    },
    {
      field: "dob",
      headerName: "Date Of Birth",
      type: "date",
      sortable: "true",
      valueGetter: ({ value }) => value && new Date(value),
    },
  ];

  // const rows = [{ id: 1, lastName: "Snow", firstName: "Jon", age: 35 }];

  const rows = users.map((user, index) => ({
    id: index+1,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
    dob: user.dob,
  }));

  return (
    <>
      <Box className="userList">
        <Box
          className="listHeading"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Typography variant="h4" fontWeight={700}>
            Users List
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

export default UserList;
