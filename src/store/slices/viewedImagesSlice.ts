import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { MediaItem } from '../../components/admin/hooks/useAllMedia'

interface ViewedImagesState {
  viewed: MediaItem[]
}

const initialState: ViewedImagesState = {
  viewed: [],
}
const MAX_VIEWED = 50
const viewedImagesSlice = createSlice({
  name: 'viewedImages',
  initialState,
  reducers: {
    addViewedImage(state, action: PayloadAction<MediaItem>) {
      const exists = state.viewed.some(img => img.id === action.payload.id && img.type === action.payload.type)

      if (!exists) {
        state.viewed.unshift(action.payload)
        state.viewed = state.viewed.slice(0, MAX_VIEWED)
      }
    },
  },
})

export const { addViewedImage } = viewedImagesSlice.actions
export default viewedImagesSlice.reducer
