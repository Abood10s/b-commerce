import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { PATHS } from "../../Routes";

const ProtectedRoute = () => {
  const { authenticated } = useSelector((state) => state.auth);

  return authenticated ? <Outlet /> : <Navigate to={PATHS.LOGIN} />;
};
export default ProtectedRoute;
