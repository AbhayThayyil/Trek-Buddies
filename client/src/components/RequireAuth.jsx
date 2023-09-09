import React from "react";

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../Redux/slices/userSlice";

const RequireAuth = ({isAdmin}) => {
  const userInfo = useSelector(selectAllUsers);
  // console.log(userInfo, "user details from store");

  const location = useLocation();

  if (isAdmin && (!userInfo || !userInfo.isAdmin)) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!isAdmin && !userInfo?._id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
    <Outlet/>
    </>
  )

  // return userInfo?._id ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );
};

export default RequireAuth;
