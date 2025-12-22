import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"
import { useGetImagesQuery } from "../../../shared/api/imagesApi";
import { usePagination } from "./usePagination";
import { useGetCategoriesQuery } from "../../../shared/api/categoriesApi";
import { useGetArchivesQuery } from "../../../shared/api/archivesApi";


interface MediaItem {
    id: number;
    type: 'image' | 'archive';
    title: string;
    url?: string;
    categories: string[];
    tags: string[];
    created_at: string;
    imageCount?: number;
}

export function useAllMedia() {
    const { data: images = [] } = useGetImagesQuery();
    const { data: categories = [] } = useGetCategoriesQuery();
    const { data: archives = [] } = useGetArchivesQuery();

    const allMedia: MediaItem[] = [

        ...images.map(img => ({
            id: img.id,
            type: 'image' as const,
            title: img.title || 'Untitled Image',
            url: img.url,
            categories: img.categories || [],
            tags: img.tags || [],
            created_at: img.created_at
        })),

        ...archives.map(archive => ({
            id: archive.id,
            type: 'archive' as const,
            title: archive.title || 'Untitled Archive',
            categories: archive.categories || [],
            tags: archive.tags || [],
            created_at: archive.created_at || new Date().toISOString(),
            imageCount: archive.images.length,
            url: archive.images[0].url
        }))
    ];

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
        startIndex,
        endIndex,
        pages,
        visibleMedia,
        setSearchParams,
        imagesQuery,
        filteredImages,
        selectedCategory,
        setSelectedCategory,
        navigate,
    }
}