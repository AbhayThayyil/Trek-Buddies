import React from "react";

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const userInfo = useSelector((state) => state.user);
  console.log(userInfo, "user details from store");

  const location = useLocation();

  return userInfo?.userId ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
