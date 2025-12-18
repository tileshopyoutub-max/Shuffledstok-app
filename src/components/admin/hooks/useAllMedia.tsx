import { useSearchParams } from "react-router-dom"
import { useGetImagesQuery } from "../../../shared/api/imagesApi";
import { usePagination } from "./usePagination";

export function useAllMedia() {
    const {data: images = []} = useGetImagesQuery();
    console.log(images)

    const [searchParams, setSearchParams] = useSearchParams();

    const imagesQuery = searchParams.get('q') || '';

    const filteredImages = images.filter(img => img.title?.toLocaleLowerCase().includes(imagesQuery.toLocaleLowerCase())
        || img.id.toString().includes(imagesQuery)
        || img.tags.some(tag => tag.toLocaleLowerCase().includes(imagesQuery.toLocaleLowerCase())))

    const { page, setPage, startIndex, endIndex, pages } = usePagination({ total: filteredImages.length, pageSize: 10 });
    const visibleImages = filteredImages.slice(startIndex, endIndex);

    return {
        images,
        page,
        setPage,
        startIndex,
        endIndex,
        pages,
        visibleImages,
        setSearchParams,
        imagesQuery,
        filteredImages,
    }
}