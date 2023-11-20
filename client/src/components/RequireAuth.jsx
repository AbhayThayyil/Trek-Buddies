import React from "react";

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../Redux/slices/userSlice";
import { selectAdminInfo } from "../Redux/slices/adminSlice";

const RequireAuth = ({ isAdmin }) => {
  const userInfo = useSelector(selectAllUsers);
  const adminInfo=useSelector(selectAdminInfo)
  // console.log(userInfo, "user details from store");

  const location = useLocation();

  // return userInfo?.accessToken ? (
  //   <Outlet />
  // ) : isAdmin ? (
  //   <Navigate to="/admin/login" state={{ from: location }} replace />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );

  return isAdmin ? (
    adminInfo?.accessToken ? (
      <Outlet />
    ) : (
      <Navigate to="/admin/login" state={{ from: location }} replace />
    )
  ) : userInfo?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
