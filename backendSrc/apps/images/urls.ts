import type { RouterType } from '../../router'
import { downloadImageApi } from './api/downloadImageApi'
import { GetViewImageApi } from './api/getViewImageApi'
import { GetImagesApi } from './api/getImagesApi'
import { PostImageApi } from './api/postImageApi'
import { DeleteImageApi } from './api/deleteImageApi'
import { postArchiveApi } from '../images/api/postArchiveApi'

export default function registerImagesRoutes(router: RouterType) {
  router.get("/api/images/", GetImagesApi)
  router.post("/api/images/upload", PostImageApi)
  router.get("/image/:key", GetViewImageApi)
  router.get("/image/:key/download", downloadImageApi)
  router.delete("/api/images/:id", DeleteImageApi)

  router.post("/api/archives/upload", postArchiveApi);
}