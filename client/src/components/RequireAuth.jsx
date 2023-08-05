import React from "react";

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../Redux/slices/userSlice";

const RequireAuth = () => {
  const userInfo = useSelector(selectAllUsers);
  console.log(userInfo, "user details from store");

  const location = useLocation();

  return userInfo?._id ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
