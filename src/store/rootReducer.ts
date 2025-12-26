import { combineReducers } from '@reduxjs/toolkit'
import { imagesApi } from '../shared/api/imagesApi'
import { tagsApi } from '../shared/api/tagsApi'
import watermarkReducer from './slices/watermarkSlice'
import imagesFilterReducer from './slices/imagesFilterSlice'
import imageModalReducer from './slices/imageModalSlice'
import heroReducer from './slices/heroSlice'
import { categoriesApi } from '../shared/api/categoriesApi'
import sidebarReducer from './slices/sidebarSlice'
import { archivesApi } from '../shared/api/archivesApi'
import viewedImagesReducer from './slices/viewedImagesSlice'

export const rootReducer = combineReducers({
  [imagesApi.reducerPath]: imagesApi.reducer,
  [tagsApi.reducerPath]: tagsApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [archivesApi.reducerPath]: archivesApi.reducer,
  watermark: watermarkReducer,
  imagesFilter: imagesFilterReducer,
  imageModal: imageModalReducer,
  hero: heroReducer,
  sidebar: sidebarReducer,
  viewedImages: viewedImagesReducer,
})

export type RootReducer = ReturnType<typeof rootReducer>