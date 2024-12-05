import { lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthenticatedUserRedirect } from "../utils";
import Cart from "../pages/Cart";
const HomePage = lazy(() => import("../pages/Home"));

export const PATHS = {
  SIGNUP: "/signup",
  LOGIN: "/login",
  HOME: "/",
  CART: "/cart",
};

export const router = [
  {
    path: PATHS.LOGIN,
    element: <AuthenticatedUserRedirect />,
  },
  {
    path: PATHS.SIGNUP,
    element: <AuthenticatedUserRedirect />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: PATHS.HOME, element: <HomePage /> },
      { path: PATHS.CART, element: <Cart /> },
    ],
  },
  { path: "*", element: <h1>Page Doesn't Exist lil Nigga </h1> },
];
