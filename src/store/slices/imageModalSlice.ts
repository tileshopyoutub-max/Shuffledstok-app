import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ImageItems } from '../../shared/types/images'


interface ImageModalState {
  isOpen: boolean
  selectedImage: ImageItems | null
}

const initialState: ImageModalState = {
  isOpen: false,
  selectedImage: null,
}

const imageModalSlice = createSlice({
  name: 'imageModal',
  initialState,
  reducers: {
    openImageModal(state, action: PayloadAction<ImageItems>) {
      state.isOpen = true
      state.selectedImage = action.payload
    },
    closeImageModal(state) {
      state.isOpen = false
      state.selectedImage = null
    },
  },
})

export const { openImageModal, closeImageModal } = imageModalSlice.actions
export default imageModalSlice.reducer
