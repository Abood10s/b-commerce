import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subcategoryApi = createApi({
  reducerPath: "subcategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    tagTypes: ["SubCategoryList"],
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
        url: "/Category/GetAll",
        method: "GET",
      }),
      providesTags: ["SubCategoryList"],
    }),
    getAllSubCategories: builder.query({
      query: () => ({
        url: "/Subcategory/GetAll",
        method: "GET",
      }),
      providesTags: ["SubCategoryList"],
    }),
    getSubCategoriesByCategory: builder.query({
      query: (categoryId) => ({
        url: `/Subcategory/GetAllBycategory?categoryId=${categoryId}`,
        method: "GET",
      }),
      providesTags: (result, error, categoryId) => [
        { type: "SubCategoryList", id: categoryId },
      ],
    }),
    createSubCategory: builder.mutation({
      query: (newSubCategory) => ({
        url: "/Subcategory/Create",
        method: "POST",
        body: newSubCategory,
      }),
      invalidatesTags: ["SubCategoryList"],
    }),
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/Subcategory/Delete?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubCategoryList"],
    }),
    updateSubCategory: builder.mutation({
      query: (updatedSubCategory) => ({
        url: "/Subcategory/Update",
        method: "PUT",
        body: updatedSubCategory,
      }),
      invalidatesTags: ["SubCategoryList"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetSubCategoriesByCategoryQuery,
  useUpdateSubCategoryMutation,
} = subcategoryApi;
