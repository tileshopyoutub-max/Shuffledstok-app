import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ImagesFilterState {
  search: string;
}

const initialState: ImagesFilterState = {
  search: '',
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
  },
});

export const { setSearch, clearSearch } = imagesFilterSlice.actions;
export default imagesFilterSlice.reducer;
