import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
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
    getProducts: builder.query({
      query: ({ page = 1, subcategoryId, categoryId }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (subcategoryId) params.append("subcategoryId", subcategoryId);
        if (categoryId) params.append("categoryId", categoryId);

        return `/Product/GetAll?${params.toString()}`;
      },
    }),
    getProductsByCategory: builder.query({
      query: (categoryId) =>
        `/Product/GetProductsByCategoty?categoryId=${categoryId}`,
    }),
    getProductsBySubcategory: builder.query({
      query: (subcategoryId) =>
        `/Product/GetProductsBySubcategory?sucategoryId=${subcategoryId}`,
    }),
    getProductDetails: builder.query({
      query: (productId) => `/Product/GetProductDetails?productId=${productId}`,
    }),
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/Product/Create",
        method: "POST",
        body: formData,
      }),
    }),
    updateProduct: builder.mutation({
      query: (formData) => ({
        url: "/Product/Update",
        method: "POST",
        body: formData,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/Product/Delete`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductsBySubcategoryQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
