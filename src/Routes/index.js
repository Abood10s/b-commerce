import { lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import withAdminToken, { AuthenticatedUserRedirect } from "../utils";

import Dashboard from "../pages/Dashboard";
import ProductForm from "../components/CreateProductForm";
import SingleProduct from "../pages/SingleProduct/index.js";
import Cart from "../pages/Cart/index.js";
const HomePage = lazy(() => import("../pages/Home"));
const Category = lazy(() => import("../pages/Category"));
const SubCategory = lazy(() => import("../pages/SubCategory"));
const Order = lazy(() => import("../pages/Order"));
const SingleOrder = lazy(() => import("../pages/Order/SingleOrder"));

const Product = lazy(() => import("../pages/Product"));
const ControlProducts = lazy(() =>
  import("../pages/Dashboard/ControlProducts.js")
);

export const PATHS = {
  SIGNUP: "/signup",
  LOGIN: "/login",
  HOME: "/",
  DASHBOARD: "/dashboard",
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
      {
        path: `products/:id`,
        element: <SingleProduct />,
      },
      {
        path: PATHS.CART,
        element: <Cart />,
      },
      {
        path: PATHS.DASHBOARD,
        element: withAdminToken(Dashboard),
      },
      {
        path: `${PATHS.DASHBOARD}/category`,
        element: withAdminToken(Category),
      },
      {
        path: `${PATHS.DASHBOARD}/subcategory`,
        element: withAdminToken(SubCategory),
      },
      {
        path: `${PATHS.DASHBOARD}/product`,
        element: withAdminToken(Product),
      },
      {
        path: `${PATHS.DASHBOARD}/product/create`,
        element: withAdminToken(ProductForm),
      },
      {
        path: `${PATHS.DASHBOARD}/product/control`,
        element: withAdminToken(ControlProducts),
      },
      {
        path: `${PATHS.DASHBOARD}/order`,
        element: withAdminToken(Order),
      },
      {
        path: `orders/:id`,
        element: withAdminToken(SingleOrder),
      },
    ],
  },
  { path: "*", element: <h1>Page Doesn't Exist lil Nigga </h1> },
];
