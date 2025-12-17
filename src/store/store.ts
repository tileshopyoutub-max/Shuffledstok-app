import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { imagesApi } from '../shared/api/imagesApi'
import { tagsApi } from '../shared/api/tagsApi'
import watermarkReducer from './slices/watermarkSlice'

const rootReducer = combineReducers({
  [imagesApi.reducerPath]: imagesApi.reducer,
  [tagsApi.reducerPath]: tagsApi.reducer,
  watermark: watermarkReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(imagesApi.middleware).concat(tagsApi.middleware),
  })
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppState = ReturnType<typeof setupStore>
export type AppDispatch = AppState['dispatch']
