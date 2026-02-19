import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Tag } from "../types/tags";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8787";

export const tagsApi = createApi({
  reducerPath: "tagsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Tag"],
  endpoints: (builder) => ({
    // Получить все теги
    getTags: builder.query<Tag[], void>({
      query: () => "/api/tags",
      providesTags: (result = []) => [
        "Tag",
        ...result.map(({ id }) => ({ type: "Tag" as const, id })),
      ],
      transformResponse: (response: { tags: Tag[] }) => response.tags,
    }),

    // Создать новый тег
    createTag: builder.mutation<
      { success: boolean; tag: Tag },
      { name: string }
    >({
      query: ({ name }) => ({
        url: "/api/tags",
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["Tag"],
    }),

    // Обновить тег
    updateTag: builder.mutation<
      { success: boolean; tag: Tag },
      { id: number; name: string }
    >({
      query: ({ id, name }) => ({
        url: `/api/tags/${id}`,
        method: "PATCH",
        body: { id, name },
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Tag", id }],
    }),

    // Удалить тег
    deleteTag: builder.mutation<
      { success: boolean; message: string },
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/api/tags/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Tag"],
    }),
  }),
});

export const {
  useGetTagsQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagsApi;
