import { useAllMedia } from "../../components/admin/hooks/useAllMedia";
import { useTypedSelector } from "../../shared/hooks/redux";

export const useFilteredMedia = () => {
  const { allMedia } = useAllMedia();
  const { selectedCategories, selectedTags, accessType, photoType, search } =
    useTypedSelector((state) => state.imagesFilter);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredMedia = allMedia.filter((item) => {
    const media = item.original;

    // Фильтр по типу (Single / Archive)
    if (photoType === "Single" && item.type !== "image") return false;
    if (photoType === "Archive" && item.type !== "archive") return false;

    // Фильтр по accessType (и для image, и для archive)

    if (accessType === "free" && !media.downloadFree) return false;
    if (accessType === "premium" && media.downloadFree) return false;

    // Фильтр по категориям
    if (
      selectedCategories.length &&
      !selectedCategories.every((cat) => media.categories.includes(cat))
    ) {
      return false;
    }

    // Фильтр по тегам
    if (
      selectedTags.length &&
      !selectedTags.some((tag) => media.tags.includes(tag))
    ) {
      return false;
    }

    // Фильтр по поиску
    if (normalizedSearch) {
      const inTitle = media.title?.toLowerCase().includes(normalizedSearch);
      if (!inTitle) return false;
    }

    return true;
  });

  return filteredMedia;
};
