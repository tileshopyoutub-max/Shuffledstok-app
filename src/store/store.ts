import { configureStore } from '@reduxjs/toolkit'
import { imagesApi } from '../shared/api/imagesApi'
import { tagsApi } from '../shared/api/tagsApi'
import { categoriesApi } from '../shared/api/categoriesApi'
import { archivesApi } from '../shared/api/archivesApi'
import { type PersistConfig } from 'redux-persist'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import { rootReducer, type RootReducer } from './rootReducer'
import storage from 'redux-persist/lib/storage'

const persistConfig: PersistConfig<RootReducer> = {
  key: 'root',
  storage,
  whitelist: ['viewedImages'], 
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
       getDefaultMiddleware({
      serializableCheck: false, 
    })
      .concat(imagesApi.middleware).concat(tagsApi.middleware).concat(categoriesApi.middleware).concat(archivesApi.middleware),
  })

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
