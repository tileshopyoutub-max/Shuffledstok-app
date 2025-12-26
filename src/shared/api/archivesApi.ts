import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ArchiveItem } from '../types/archives'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787'

interface ArchivesResponse {
  archives: ArchiveItem[];
}

export const archivesApi = createApi({
  reducerPath: 'archivesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Archives'],
  endpoints: builder => ({
    getArchives: builder.query<ArchiveItem[], void>({
      query: () => '/api/archives',
      transformResponse: (response: ArchivesResponse): ArchiveItem[] => {
        return response.archives || [];
      },
      providesTags: ['Archives'],
    }),

    uploadArchive: builder.mutation<{ success: boolean; archive: ArchiveItem }, FormData>({
      query: formData => ({
        url: '/api/archives/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Archives'],
    }),

    downloadArchive: builder.mutation<Blob, string>({
      query: key => ({
        url: `/archive/${key}/download`,
        method: 'GET',
        responseHandler: async res => await res.blob(),
      }),
    }),

    deleteArchive: builder.mutation<{ success: boolean; message: string }, { id: number }>({
      query: ({ id }) => ({
        url: `/api/archives/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Archives'],
    }),
    updateFeatured: builder.mutation<{ success: boolean; id: number; featured: number }, { id: number; featured: number }>({
      query: ({ id, featured }) => ({
        url: '/api/admin/update-featured-archive',
        method: 'POST',
        body: { id, value: featured },
      }),
      invalidatesTags: ['Archives'],
    }),
    updateArchivePreview: builder.mutation<void, { id: number, preview_image_id: number }>({
      query: ({ id, preview_image_id }) => ({
        url: `/archives/${id}/preview`,
        method: 'PATCH',
        body: { preview_image_id },
      }),
    }),
  }),
})

export const { useGetArchivesQuery, useUploadArchiveMutation, useDownloadArchiveMutation, useDeleteArchiveMutation, useUpdateFeaturedMutation, useUpdateArchivePreviewMutation  } = archivesApi