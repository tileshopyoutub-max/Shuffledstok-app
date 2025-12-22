import { useGetImagesQuery } from '../../../../shared/api/imagesApi'
import { useTypedSelector } from '../../../../shared/hooks/redux'

export const imagesFilter = () => {
  const { data: images = [] } = useGetImagesQuery()
  const { selectedCategories, selectedTags, accessType, search } = useTypedSelector(state => state.imagesFilter)

  const normalizedSearch = search.trim().toLowerCase()
  const filteredImages = images.filter(img => {
    // access type
    if (accessType === 'free' && !img.downloadFree) return false
    if (accessType === 'premium' && img.downloadFree) return false

    // categories
    if (selectedCategories.length && !selectedCategories.every(category => img.categories.includes(category))) {
      return false
    }

    // tags
    if (selectedTags.length && !selectedTags.every(tag => img.tags.includes(tag))) {
      return false
    }

    if (normalizedSearch) {
      const inTitle = img.title?.toLowerCase().includes(normalizedSearch)

      if (!inTitle) {
        return false
      }
    }

    return true
  })
  return filteredImages
}
