import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINTS } from "../../utils";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    tagTypes: ["CategoryList"],
    prepareHeaders: (headers) => {
      const tokenData = JSON.parse(localStorage.getItem("token"));
      const token = tokenData?.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: ENDPOINTS.CATEGORY_GET_ALL,
        method: "GET",
      }),
      providesTags: ["CategoryList"],
    }),
    getCategory: builder.query({
      query: (id) => ({
        url: `${ENDPOINTS.CATEGORY_GET_ONE}?id=${id}`,
        method: "GET",
      }),
    }),
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: ENDPOINTS.CATEGORY_CREATE,
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["CategoryList"],
    }),
    updateCategory: builder.mutation({
      query: (updatedCategory) => ({
        url: ENDPOINTS.CATEGORY_UPDATE,
        method: "PUT",
        body: updatedCategory,
      }),
      invalidatesTags: ["CategoryList"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${ENDPOINTS.CATEGORY_DELETE}?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CategoryList"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
