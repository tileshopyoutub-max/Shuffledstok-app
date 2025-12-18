import { useGetImagesQuery } from "../../../shared/api/imagesApi";

export interface CategoryPageProps {
  category: string;
};

export const useFilterPage = ({category}: CategoryPageProps) => {
  const { data: images = []} = useGetImagesQuery();
  
    // Фильтруем по категории
    const filteredImages = images.filter(img =>
      img.categories?.includes(category)
    )
  return (
    filteredImages
  );
};
