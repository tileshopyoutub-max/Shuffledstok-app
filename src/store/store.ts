import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { imagesApi } from '../shared/api/imagesApi'
import { tagsApi } from '../shared/api/tagsApi'
import watermarkReducer from './slices/watermarkSlice'
import imagesFilterReducer from './slices/imagesFilterSlice'
import imageModalReducer from './slices/imageModalSlice'
import heroReducer from './slices/heroSlice'
import { categoriesApi } from '../shared/api/categoriesApi'
import sidebarReducer from './slices/sidebarSlice'

const rootReducer = combineReducers({
  [imagesApi.reducerPath]: imagesApi.reducer,
  [tagsApi.reducerPath]: tagsApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  watermark: watermarkReducer,
  imagesFilter: imagesFilterReducer,
  imageModal: imageModalReducer,
  hero: heroReducer,
  sidebar: sidebarReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(imagesApi.middleware).concat(tagsApi.middleware).concat(categoriesApi.middleware),
  })
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppState = ReturnType<typeof setupStore>
export type AppDispatch = AppState['dispatch']
