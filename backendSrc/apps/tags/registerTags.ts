import type { RouterType } from '../../router'
import { GetTagsApi, CreateTagApi, UpdateTagApi, DeleteTagApi } from '../tags/api/workTagsApi'

export default function registerTagsRouter(router: RouterType) {
  router.get("/api/tags", GetTagsApi)
  router.post("/api/tags", CreateTagApi)
  router.patch("/api/tags/:id", UpdateTagApi)
  router.delete("/api/tags/:id", DeleteTagApi) 
}