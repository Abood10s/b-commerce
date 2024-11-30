import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const authenticated = useSelector((state) => state.auth.authenticated);

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
