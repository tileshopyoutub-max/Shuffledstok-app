import { useMemo } from "react";
import { useAllMedia } from "../../components/admin/hooks/useAllMedia";
import { useTypedSelector } from "../../shared/hooks/redux";

export interface CategoryPageProps {
  category: string;
}

export const useFilterPage = ({ category }: CategoryPageProps) => {
  const { allMedia, isLoading } = useAllMedia();
  const { search, selectedTags } = useTypedSelector(
    (state) => state.imagesFilter
  );

  const filteredImages = useMemo(() => {
    return allMedia.filter((item) => {
      // Фильтр по категории
      if (!item.original.categories?.includes(category)) return false;

      // Фильтр по search
      const matchesTitle =
        !search.trim() ||
        item.original.title?.toLowerCase().includes(search.toLowerCase());

      // Фильтр по tags
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => item.original.tags?.includes(tag));

      return matchesTitle && matchesTags;
    });
  }, [allMedia, category, search, selectedTags]);

  return { filteredImages, isLoading };
};
