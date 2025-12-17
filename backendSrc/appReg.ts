import registerImagesRoutes from "./apps/images/urls";
import registerTagsRouter from "./apps/tags/registerTags";
import { RouterType } from "./router";

export function registerAllRoutes(router: RouterType) {
  registerImagesRoutes(router)
  registerTagsRouter(router)
}