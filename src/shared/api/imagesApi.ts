import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ImageItems } from "../types/images";

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:8787";
const API_BASE_URL = "https://shuffledstok-app.tileshopyoutub.workers.dev";

export const imagesApi = createApi({
  reducerPath: "imagesApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Images"],
  endpoints: (builder) => ({
    getImages: builder.query<ImageItems[], void>({
      query: () => "/api/images",
      providesTags: ["Images"],
    }),
    uploadImage: builder.mutation<
      {
        success: boolean;
        key: string;
        id: number;
        downloadFree: number;
        priceCents: number;
      },
      FormData
    >({
      query: (formData) => ({
        url: "/api/images/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Images"],
    }),
    downloadImage: builder.mutation<Blob, string>({
      query: (key) => ({
        url: `/image/${key}/download`,
        method: "GET",
        responseHandler: async (res) => {
          return await res.blob();
        },
      }),
    }),
    deleteImage: builder.mutation<
      { success: boolean; message: string },
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/api/images/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Images"],
    }),
    updateFeatured: builder.mutation<
      { success: boolean; id: number; featured: number },
      { id: number; featured: number }
    >({
      query: ({ id, featured }) => ({
        url: "/api/admin/update-featured",
        method: "POST",
        body: { id, value: featured },
      }),
      invalidatesTags: ["Images"],
    }),

    //
    updateImageCategory: builder.mutation<
      { success: boolean; id: number; categoryId: number | null },
      { id: number; categoryId: number | null }
    >({
      query: ({ id, categoryId }) => ({
        url: "/api/images/update-image-category",
        method: "PUT",
        body: { id, categoryId },
      }),
      invalidatesTags: ["Images"],
    }),

    updateImageTags: builder.mutation<
      { success: boolean; id: number; tags: string[] },
      { id: number; tags: string[] }
    >({
      query: ({ id, tags }) => ({
        url: "/api/images/update-image-tags",
        method: "PUT",
        body: { id, tags },
      }),
      invalidatesTags: ["Images"],
    }),

    updateImageAccess: builder.mutation<
      {
        success: boolean;
        id: number;
        downloadFree: boolean;
        priceCents: number;
      },
      { id: number; access: "free" | "premium"; price?: string }
    >({
      query: ({ id, access, price }) => ({
        url: "/api/images/update-image-access",
        method: "PATCH",
        body: { id, access, price },
      }),
      invalidatesTags: ["Images"],
    }),

    //
  }),
});

export const {
  useGetImagesQuery,
  useUploadImageMutation,
  useDownloadImageMutation,
  useDeleteImageMutation,
  useUpdateFeaturedMutation,
  useUpdateImageCategoryMutation,
  useUpdateImageTagsMutation,
  useUpdateImageAccessMutation,
} = imagesApi;
