import type { ImageItems } from "../../../../shared/types/images"


export function findSimilarImages(
  allImages: ImageItems[],
  current: ImageItems
): ImageItems[] {
  const currentTags = current.tags?.map(t => t.toLowerCase()) || []
  const currentTitle = current.title?.toLowerCase() || ''
  const currentDescription = current.description?.toLowerCase() || ''

  return allImages.filter(img => {
    if (img.url === current.url) return false // не показываем саму картинку

    // совпадение по title
    if (img.title?.toLowerCase().includes(currentTitle)) return true

    // совпадение по description
    if (img.description?.toLowerCase().includes(currentDescription)) return true

    // совпадение по тегам
    const imgTags = img.tags?.map(t => t.toLowerCase()) || []
    if (currentTags.some(tag => imgTags.includes(tag))) return true

    return false
  })
}
