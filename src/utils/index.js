import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { PATHS } from "../Routes";
import LoginForm from "../components/forms/LoginForm";
import SignupForm from "../components/forms/SignupForm";

export const ENDPOINTS = {
  // Auth
  SIGNUP: "/Auth/Register",
  LOGIN: "/Auth/Login",

  //Category
  CATEGORY_GET_ALL: "/Category/GetAll",
  CATEGORY_GET_ONE: "/Category/GetOne",
  CATEGORY_CREATE: "/Category/Create",
  CATEGORY_UPDATE: "/Category/Update",
  CATEGORY_DELETE: "/Category/Delete",

  // Subcategory
  SUBCATEGORY_GET_ALL: "/Subcategory/GetAll",
  SUBCATEGORY_GET_BY_CATEGORY: "/Subcategory/GetAllBycategory",
  SUBCATEGORY_GET_ONE: "/Subcategory/GetOne",
  SUBCATEGORY_CREATE: "/Subcategory/Create",
  SUBCATEGORY_UPDATE: "/Subcategory/Update",
  SUBCATEGORY_DELETE: "/Subcategory/Delete",

  // Order
  ORDER_GET_ORDERS: "/Order/GetOrders",
  ORDER_GET_ORDER_DETAILS: "/Order/GetOrderDetails",
  ORDER_GET_CUSTOMER_ORDERS: "/Order/GetCustomerOrders",
  ORDER_CREATE: "/Order/Create",
  ORDER_CHANGE_CANCEL_STATUS: "/Order/ChangeCancelStatus",

  // Product
  PRODUCT_GET_ALL: "/Product/GetAll",
  PRODUCT_GET_BY_CATEGORY: "/Product/GetProductsByCategory",
  PRODUCT_GET_BY_SUBCATEGORY: "/Product/GetProductsBySubcategory",
  PRODUCT_GET_DETAILS: "/Product/GetProductDetails",
  PRODUCT_CREATE: "/Product/Create",
  PRODUCT_UPDATE: "/Product/Update",
  PRODUCT_DELETE: "/Product/Delete",
};
export const AuthenticatedUserRedirect = () => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const location = useLocation(); // Get the current location/path

  if (authenticated) {
    return <Navigate to={PATHS.HOME} />;
  }

  if (location.pathname === PATHS.LOGIN) {
    return <LoginForm />;
  }

  if (location.pathname === PATHS.SIGNUP) {
    return <SignupForm />;
  }
};
export const AdminToken = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user?.userTypeName === "Admin" && user?.userType === 1) {
    return children;
  }
  return <Navigate to={PATHS.HOME} />;
};

const withAdminToken = (Component) => {
  return (
    <AdminToken>
      <Component />
    </AdminToken>
  );
};
export default withAdminToken;
