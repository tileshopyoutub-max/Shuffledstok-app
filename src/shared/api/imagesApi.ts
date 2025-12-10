import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ImageItem } from "../types/images";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787'

export const imagesApi = createApi({
  reducerPath: "imagesApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Images"],
  endpoints: (builder) => ({
    getImages: builder.query<ImageItem[], void>({
      query: () => "/api/images/",
      providesTags: ["Images"],
    }),
    uploadImage: builder.mutation<{ success: boolean; key: string }, File>({
      query: (file) => {
        const formData = new FormData()
        formData.append("file", file)
        return {
          url: "/api/images/upload",
          method: "POST",
          body: formData,
        }
      },
      invalidatesTags: ["Images"],
    }),
    downloadFile: builder.mutation<Blob, string>({
      query: (key) => ({
        url: `/api/files/${key}/download`,
        method: "GET",
        responseHandler: async (res) => {
          const blob = await res.blob()
          return blob
        },
      }),
    }),
  }),
})

export const { useGetImagesQuery, useUploadImageMutation, useDownloadFileMutation } = imagesApi