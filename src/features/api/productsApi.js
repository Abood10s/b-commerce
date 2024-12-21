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
      providesTags: ["Products"],
    }),
    getProductsByCategory: builder.query({
      query: (categoryId) =>
        `/Product/GetProductsByCategoty?categoryId=${categoryId}`,
      providesTags: ["Products"],
    }),
    getProductsBySubcategory: builder.query({
      query: (subcategoryId) =>
        `/Product/GetProductsBySubcategoty?sucategoryId=${subcategoryId}`,
      providesTags: ["Products"],
    }),
    getProductDetails: builder.query({
      query: (productId) => `/Product/GetProductDetails?productId=${productId}`,
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/Product/Create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: (updatedFormData) => ({
        url: `/Product/Update`,
        method: "PUT",
        body: updatedFormData,
      }),
      invalidatesTags: ["Products", "ProductDetails"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/Product/Delete`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["Products", "ProductDetails"],
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
