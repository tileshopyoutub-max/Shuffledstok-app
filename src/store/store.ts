import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { imagesApi } from '../shared/api/imagesApi'
import watermarkReducer from './slices/watermarkSlice'
import imagesFilterReducer from './slices/imagesFilterSlice'
import imageModalReducer from './slices/imageModalSlice'

const rootReducer = combineReducers({
  [imagesApi.reducerPath]: imagesApi.reducer,
  watermark: watermarkReducer,
  imagesFilter: imagesFilterReducer,
  imageModal: imageModalReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(imagesApi.middleware),
  })
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppState = ReturnType<typeof setupStore>
export type AppDispatch = AppState['dispatch']
