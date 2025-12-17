import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ImagesFilterState {
  search: string;
  selectedTags: string[];
}

const initialState: ImagesFilterState = {
  search: '',
  selectedTags: [],
};

const imagesFilterSlice = createSlice({
  name: 'imagesFilter',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    clearSearch(state) {
      state.search = '';
    },
    toggleTag(state, action: PayloadAction<string>) {
      const tag = action.payload
      state.selectedTags = state.selectedTags.includes(tag)
        ? state.selectedTags.filter(t => t !== tag)
        : [...state.selectedTags, tag]
    },
  },
});

export const { setSearch, clearSearch, toggleTag} = imagesFilterSlice.actions;
export default imagesFilterSlice.reducer;
