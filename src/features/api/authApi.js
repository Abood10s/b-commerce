import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINTS } from "../../utils";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: ENDPOINTS.SIGNUP,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: ENDPOINTS.LOGIN,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
