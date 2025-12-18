import type { RouterType } from '../../router'
import { GetTagsApi } from './api/getTagsApi'
import { CreateTagApi } from './api/createTagApi'
import { UpdateTagApi } from './api/updateTagApi'
import { DeleteTagApi } from './api/deleteTagApi'

export default function registerTagsRouter(router: RouterType) {
  router.get("/api/tags", GetTagsApi)
  router.post("/api/tags", CreateTagApi)
  router.patch("/api/tags/:id", UpdateTagApi)
  router.delete("/api/tags/:id", DeleteTagApi) 
}