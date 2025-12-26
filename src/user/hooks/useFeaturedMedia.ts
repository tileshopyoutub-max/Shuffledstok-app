import { useMemo } from 'react'
import { useGetArchivesQuery } from '../../shared/api/archivesApi'
import { useGetImagesQuery } from '../../shared/api/imagesApi'

export const useFeaturedMedia = () => {
  const { data: images = [] } = useGetImagesQuery()
  const { data: archives = [] } = useGetArchivesQuery()

  const featuredMedia = useMemo(() => {
    return [
      ...images
        .filter(img => img.featured === 1)
        .map(img => ({
          id: img.id,
          type: 'image' as const,
          title: img.title || 'Untitled Image',
          url: img.url!,
          created_at: img.created_at,
        })),

      ...archives
        .filter(archive => archive.featured === 1)
        .map(archive => {
          const previewImage = archive.images.find(img => img.id === archive.preview_image_id) || archive.images[0];
          return {
            id: archive.id,
            type: 'archive' as const,
            title: archive.title || 'Untitled Archive',
            url: previewImage?.url!,
            created_at: archive.created_at ?? '',
          };
        }),
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }, [images, archives]);



  return { featuredMedia }
}