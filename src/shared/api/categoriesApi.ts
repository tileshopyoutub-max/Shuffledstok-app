import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category } from "../types/Category";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8787";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    // Получить все категории
    getCategories: builder.query<Category[], void>({
      query: () => "/api/categories",
      providesTags: (result = []) => [
        "Category",
        ...result.map(({ id }) => ({ type: "Category" as const, id })),
      ],
      transformResponse: (response: { categories: Category[] }) =>
        response.categories,
    }),

    // Создать новый категорию
    createCategory: builder.mutation<
      { success: boolean; category: Category },
      { name: string }
    >({
      query: ({ name }) => ({
        url: "/api/categories",
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["Category"],
    }),

    // Обновить категорию
    updateCategory: builder.mutation<
      { success: boolean; category: Category },
      { id: number; name: string }
    >({
      query: ({ id, name }) => ({
        url: `/api/categories/${id}`,
        method: "PATCH",
        body: { id, name },
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Category", id }],
    }),

    // Удалить категорию
    deleteCategory: builder.mutation<
      { success: boolean; message: string },
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/api/categories/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
