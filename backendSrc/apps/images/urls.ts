import type { RouterType } from '../../router'
import { getImageByIdApi } from './api/getImageByIdApi'
import { GetImagesApi } from './api/getImagesApi'
import { PostImageApi } from './api/postImageApi'

export default function registerImagesRoutes(router: RouterType) {
  router.get("/api/images/", GetImagesApi)
  router.post("/api/images/upload", PostImageApi)
  router.get("/image/:key", getImageByIdApi)
}