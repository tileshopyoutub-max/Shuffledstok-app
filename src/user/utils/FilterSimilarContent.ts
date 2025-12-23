import type { MediaItem } from '../../components/admin/hooks/useAllMedia'
import type { ImageItems } from '../../shared/types/images'

export function findSimilarImages(
  allMedia: MediaItem[],
  current: MediaItem
): ImageItems[] {
  if (current.type !== 'image') return []

  const currentImage = current.original

  const currentTags = currentImage.tags?.map(t => t.toLowerCase()) || []
  const currentTitle = currentImage.title?.toLowerCase() || ''
  const currentDescription = currentImage.description?.toLowerCase() || ''

  return allMedia
    .filter((item): item is Extract<MediaItem, { type: 'image' }> => item.type === 'image')
    .map(item => item.original)
    .filter(img => {
      if (img.url === currentImage.url) return false

      if (img.title?.toLowerCase().includes(currentTitle)) return true
      if (img.description?.toLowerCase().includes(currentDescription)) return true

      const imgTags = img.tags?.map(t => t.toLowerCase()) || []
      if (currentTags.some(tag => imgTags.includes(tag))) return true

      return false
    })
}
