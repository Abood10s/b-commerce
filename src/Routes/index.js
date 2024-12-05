import { lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import SignupForm from "../components/forms/SignupForm";

const LoginForm = lazy(() => import("../components/forms/LoginForm"));
const HomePage = lazy(() => import("../pages/Home"));

export const PATHS = {
  SIGNUP: "/signup",
  LOGIN: "/login",
  HOME: "/",
};

export const router = [
  { path: PATHS.LOGIN, element: <LoginForm /> },
  { path: PATHS.SIGNUP, element: <SignupForm /> },
  {
    element: <ProtectedRoute />,
    children: [{ path: PATHS.HOME, element: <HomePage /> }],
  },
  { path: "*", element: <h1>Page Doesn't Exist lil Nigga </h1> },
];
