import { createSlice } from '@reduxjs/toolkit'

interface HeroState {
  isVisible: boolean
}

const initialState: HeroState = {
  isVisible: true, 
}

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    hideHero(state) {
      state.isVisible = false
    },
  },
})

export const { hideHero } = heroSlice.actions
export default heroSlice.reducer
