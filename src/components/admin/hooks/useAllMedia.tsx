import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"
import { useGetImagesQuery } from "../../../shared/api/imagesApi";
import { usePagination } from "./usePagination";
import { useGetCategoriesQuery } from "../../../shared/api/categoriesApi";

export function useAllMedia() {
    const {data: images = []} = useGetImagesQuery();
    const {data: categories = []} = useGetCategoriesQuery();

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const imagesQuery = searchParams.get('q') || '';

    let filteredImages = images.filter(img => img.title?.toLocaleLowerCase().includes(imagesQuery.toLocaleLowerCase())
        || img.id.toString().includes(imagesQuery)
        || img.tags.some(tag => tag.toLocaleLowerCase().includes(imagesQuery.toLocaleLowerCase())))

    if (selectedCategory) {
        filteredImages = filteredImages.filter(img => img.categories.includes(selectedCategory));
    }

    const { page, setPage, startIndex, endIndex, pages } = usePagination({ total: filteredImages.length, pageSize: 10 });
    const visibleImages = filteredImages.slice(startIndex, endIndex);

    return {
        images,
        categories,
        page,
        setPage,
        startIndex,
        endIndex,
        pages,
        visibleImages,
        setSearchParams,
        imagesQuery,
        filteredImages,
        selectedCategory,
        setSelectedCategory,
        navigate,
    }
}