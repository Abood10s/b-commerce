import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
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
    getOrders: builder.query({
      query: () => `/Order/getOrders`,
    }),
    getOrderDetails: builder.query({
      query: (id) => `/Order/GetOrderDetails?id=${id}`,
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: `/Order/Create`,
        method: "POST",
        body: orderData,
      }),
    }),
    changeCancelOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/Order/ChangeCancelStatus?id=${id}`,
        method: "PUT",
        body: { id, status },
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useCreateOrderMutation,
  useChangeCancelOrderStatusMutation,
} = orderApi;
