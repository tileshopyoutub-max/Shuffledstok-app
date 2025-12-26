import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"
import { useGetImagesQuery } from "../../../shared/api/imagesApi";
import { usePagination } from "./usePagination";
import { useGetCategoriesQuery } from "../../../shared/api/categoriesApi";
import { useGetArchivesQuery } from "../../../shared/api/archivesApi";
import type { ArchiveItem } from "../../../shared/types/archives";
import type { ImageItems } from "../../../shared/types/images";
import { useUpdateFeaturedMutation as useUpdateImageFeatured } from '../../../shared/api/imagesApi'
import { useUpdateFeaturedMutation as useUpdateArchiveFeatured } from '../../../shared/api/archivesApi'
import { useUpdateArchivePreviewMutation } from "../../../shared/api/archivesApi";


export type MediaItem =
    | {
        id: number
        type: 'image'
        title: string
        url?: string
        categories: string[]
        tags: string[]
        created_at: string
        original: ImageItems
        featured?: number
    }
    | {
        id: number
        type: 'archive'
        title: string
        url?: string
        categories: string[]
        tags: string[]
        created_at: string
        imageCount: number
        original: ArchiveItem
        featured?: number
    }

export function useAllMedia() {
    const { data: images = [] } = useGetImagesQuery();
    const { data: categories = [] } = useGetCategoriesQuery();
    const { data: archives = [] } = useGetArchivesQuery();

    const [updateImageFeatured] = useUpdateImageFeatured();
    const [updateArchiveFeatured] = useUpdateArchiveFeatured();
    const [updateArchivePreview] = useUpdateArchivePreviewMutation();

    const [localArchivePreviews, setLocalArchivePreviews] = useState<Record<number, number>>({});

    const allMedia: MediaItem[] = [

        ...images.map(img => ({
            id: img.id,
            type: 'image' as const,
            title: img.title || 'Untitled Image',
            url: img.url,
            categories: img.categories || [],
            tags: img.tags || [],
            created_at: img.created_at,
            original: img,
            featured: img.featured,
        })),

        ...archives.map(archive => {
            const previewId = localArchivePreviews[archive.id] || archive.preview_image_id || archive.images[0]?.id;
            const previewImage = archive.images.find(img => img.id === previewId) || archive.images[0];

            return {
                id: archive.id,
                type: 'archive' as const,
                title: archive.title || 'Untitled Archive',
                categories: archive.categories || [],
                tags: archive.tags || [],
                created_at: archive.created_at || new Date().toISOString(),
                imageCount: archive.images.length,
                url: previewImage?.url,
                original: archive,
                featured: archive.featured
            }
        })
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    async function updateFeatured(item: MediaItem, value: number) {
        if (item.type === 'image') {
            await updateImageFeatured({ id: item.id, featured: value });
        } else {
            await updateArchiveFeatured({ id: item.id, featured: value });
        }
    }

    async function setArchivePreview(archiveId: number, previewImageId: number) {
        setLocalArchivePreviews(prev => ({ ...prev, [archiveId]: previewImageId }));
        try {
            await updateArchivePreview({ id: archiveId, preview_image_id: previewImageId }).unwrap();
        } catch (error) {
            setLocalArchivePreviews(prev => {
                const newState = { ...prev };
                delete newState[archiveId];
                return newState;
            });
        }
    }

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const imagesQuery = searchParams.get('q') || '';

    let filteredImages = allMedia.filter(img => img.title?.toLocaleLowerCase().includes(imagesQuery.toLocaleLowerCase())
        || img.id.toString().includes(imagesQuery)
        || img.tags.some(tag => tag.toLocaleLowerCase().includes(imagesQuery.toLocaleLowerCase())))

    if (selectedCategory) {
        filteredImages = filteredImages.filter(img => img.categories.includes(selectedCategory));
    }

    const { page, setPage, startIndex, endIndex, pages } = usePagination({ total: filteredImages.length, pageSize: 10 });
    const visibleMedia = filteredImages.slice(startIndex, endIndex);

    return {
        images,
        categories,
        page,
        setPage,
        pages,
        visibleMedia,
        setSearchParams,
        imagesQuery,
        filteredImages,
        selectedCategory,
        setSelectedCategory,
        navigate,
        allMedia,
        updateFeatured,
        localArchivePreviews,
        setArchivePreview
    }
}