import type { RouterType } from '../../router'
import { postArchiveApi } from '../archive/api/postArchiveApi'
import { getArchivesApi } from '../archive/api/getArchivesApi'
import { deleteArchiveApi } from '../archive/api/deleteArchiveApi'
import { updateFeaturedArchiveApi } from './api/updateFeaturedArchiveApi'
import { updateArchivePreviewApi } from './api/updateArchivePreviewApi'

export default function registerArchiveRoutes(router: RouterType) {
  router.post("/api/archives/upload", postArchiveApi);
  router.get("/api/archives", getArchivesApi)
  router.delete("/api/archives/:id", deleteArchiveApi);
  router.post("/api/admin/update-featured-archive", updateFeaturedArchiveApi);
  router.patch("/archives/:id/preview", updateArchivePreviewApi);
}