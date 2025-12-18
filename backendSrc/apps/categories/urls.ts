import type { RouterType } from '../../router'
import { DeleteCategoryApi } from './api/deleteCategoriesApi'
import { GetCategoriesApi } from './api/getCategoriesApi'
import { UpdateCategoryApi } from './api/patchCategoryApi'
import { PostCategoryApi } from './api/postCategoryApi'

export default function registerCategoriesRouter(router: RouterType) {
  router.get("/api/categories", GetCategoriesApi)
  router.post("/api/categories", PostCategoryApi)
  router.patch("/api/categories/:id", UpdateCategoryApi)
  router.delete("/api/categories/:id", DeleteCategoryApi) 
}