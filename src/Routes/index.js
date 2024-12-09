import { lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { AdminToken, AuthenticatedUserRedirect } from "../utils";
import Cart from "../pages/Cart";
import Dashboard from "../pages/Dashboard";
const HomePage = lazy(() => import("../pages/Home"));
const Category = lazy(() => import("../pages/Category"));
const SubCategory = lazy(() => import("../pages/SubCategory"));
const Product = lazy(() => import("../pages/Product"));

export const PATHS = {
  SIGNUP: "/signup",
  LOGIN: "/login",
  HOME: "/",
  DASHBOARD: "/dashboard",
  CART: "/cart",
  DASHBOARD_CATEGORY: "/dashboard/category",
  DASHBOARD_SUBCATEGORY: "/dashboard/subcategory",
  DASHBOARD_PRODUCT: "/dashboard/product",
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
      {
        path: PATHS.DASHBOARD,
        element: (
          <AdminToken>
            <Dashboard />
          </AdminToken>
        ),
      },
      {
        path: `${PATHS.DASHBOARD}/category`,
        element: (
          <AdminToken>
            <Category />
          </AdminToken>
        ),
      },
      {
        path: `${PATHS.DASHBOARD}/subcategory`,
        element: (
          <AdminToken>
            <SubCategory />
          </AdminToken>
        ),
      },
      {
        path: `${PATHS.DASHBOARD}/product`,
        element: (
          <AdminToken>
            <Product />
          </AdminToken>
        ),
      },
    ],
  },
  { path: "*", element: <h1>Page Doesn't Exist lil Nigga </h1> },
];
