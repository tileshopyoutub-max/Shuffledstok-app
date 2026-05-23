import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PublicListingResponse } from "../types/listing";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8787";

export const publicListingApi = createApi({
  reducerPath: "publicListingApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getPublicListing: builder.query<
      PublicListingResponse,
      { category: string; slug: string }
    >({
      query: ({ category, slug }) =>
        `/api/public/listing/${category}/${slug}`,
    }),
  }),
});

export const { useGetPublicListingQuery } = publicListingApi;
