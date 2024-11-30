import { lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const LoginForm = lazy(() => import("../components/forms/LoginForm"));

export const PATHS = {
  SIGNUP: "/signup",
  LOGIN: "/login",
  HOME: "/",
};

export const router = [
  { path: PATHS.LOGIN, element: <LoginForm /> },

  {
    element: <ProtectedRoute />, // This is the wrapper for protected routes
    children: [{ path: PATHS.HOME, element: <h1>Home</h1> }],
  },

  { path: "*", element: <h1>Page Doesn't Exist lil Nigga </h1> },
];
