import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";

import { categoryApi } from "./api/categoryApi";
import { subcategoryApi } from "./api/subCategoryApi";
import { productApi } from "./api/productsApi";
import { orderApi } from "./api/orderApi";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,

    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [subcategoryApi.reducerPath]: subcategoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      categoryApi.middleware,
      subcategoryApi.middleware,
      productApi.middleware,
      orderApi.middleware
    ),
});

export default store;
