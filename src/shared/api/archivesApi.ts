import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ArchiveResponse } from '../types/archiveFile';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787'

export const archivesApi = createApi({
    reducerPath: 'archivesApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: ['Archives'],
    endpoints: builder => ({
        uploadArchive: builder.mutation<{ success: boolean; archive: ArchiveResponse }, FormData>({
            query: formData => ({
                url: '/api/archives/upload',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Archives'],
        }),
        getArchives: builder.query<any[], void>({
            query: () => '/api/archives',
            providesTags: ['Archives'],
        }),
    }),
})

export const { useUploadArchiveMutation, useGetArchivesQuery } = archivesApi