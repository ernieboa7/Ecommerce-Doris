// src/components/AdminRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.userSignin);
  const location = useLocation();

  if (!userInfo) {
    // User not logged in — redirect to signin with intended path
    //return <Navigate to={`/signin?redirect=${location.pathname}`} />;
    return <Navigate to="/signin" state={{ from: location.pathname }} />;

  }

  if (!userInfo.isAdmin) {
    // Logged in but not admin
    return <Navigate to="/signin?accessDenied=true" />;
  }

  return children;
};

export default AdminRoute;
