import { lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { Navigate } from "react-router-dom";

const LoginForm = lazy(() => import("../components/forms/LoginForm"));

export const PATHS = {
  SIGNUP: "/signup",
  LOGIN: "/login",
  HOME: "/",
};

export const router = [
  { path: PATHS.LOGIN, element: <LoginForm /> },

  // Protected Route wrapper, applying Outlet to nested routes
  {
    element: <ProtectedRoute />, // This is the wrapper for protected routes
    children: [
      { path: PATHS.HOME, element: <h1>Home</h1> },
      // You can add more protected routes here, for example:
      // { path: PATHS.PROFILE, element: <Profile /> },
    ],
  },

  // Catch-all route for non-existent pages
  { path: "*", element: <h1>PageNotFound </h1> },
];
