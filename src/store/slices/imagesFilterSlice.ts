import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ImagesFilterState {
  search: string
  selectedTags: string[]
  selectedCategories: string[]
  accessType: 'free' | 'premium' | null
}

const initialState: ImagesFilterState = {
  search: '',
  selectedTags: [],
  selectedCategories: [],
  accessType: null,
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
      state.selectedCategories = [];
    },
    setAccessType(state, action: PayloadAction<'free' | 'premium' | null>) {
      state.accessType = action.payload
    },

    resetFilters(state) {
      state.search = ''
      state.selectedTags = []
      state.selectedCategories = []
      state.accessType = null
    },
  },
})

export const { setSearch, clearSearch, toggleTag, toggleCategory, resetFilters, setAccessType, clearCategories } = imagesFilterSlice.actions
export default imagesFilterSlice.reducer
