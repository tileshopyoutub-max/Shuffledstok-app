import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ImagesFilterState {
  search: string
  selectedTags: string[]
  selectedCategories: string[]
  accessType: 'free' | 'premium' | null
  photoType: 'Single' | 'Archive' | null
}

const initialState: ImagesFilterState = {
  search: '',
  selectedTags: [],
  selectedCategories: [],
  accessType: null,
  photoType: null,
}

const imagesFilterSlice = createSlice({
  name: 'imagesFilter',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    clearSearch(state) {
      state.search = ''
    },
    toggleTag(state, action: PayloadAction<string>) {
      const tag = action.payload
      state.selectedTags = state.selectedTags.includes(tag)
        ? state.selectedTags.filter(t => t !== tag)
        : [...state.selectedTags, tag]
    },
    toggleCategory(state, action: PayloadAction<string>) {
      const category = action.payload
      state.selectedCategories = state.selectedCategories.includes(category)
        ? state.selectedCategories.filter(c => c !== category)
        : [...state.selectedCategories, category]
    },
    clearCategories(state) {
      state.selectedCategories = []
    },
    toggleAccessType(state, action: PayloadAction<'free' | 'premium'>) {
      state.accessType = state.accessType === action.payload ? null : action.payload
    },
    togglePhotoType(state, action: PayloadAction<'Single' | 'Archive'>) {
      state.photoType = state.photoType === action.payload ? null : action.payload
    },

    resetFilters(state) {
      state.search = ''
      state.selectedTags = []
      state.selectedCategories = []
      state.accessType = null
      state.photoType = null
    },
  },
})

export const {
  setSearch,
  clearSearch,
  toggleTag,
  toggleCategory,
  resetFilters,
  toggleAccessType,
  clearCategories,
  togglePhotoType,
} = imagesFilterSlice.actions
export default imagesFilterSlice.reducer
