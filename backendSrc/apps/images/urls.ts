import type { RouterType } from "../../router";
import { downloadImageApi } from "./api/downloadImageApi";
import { GetViewImageApi } from "./api/getViewImageApi";
import { GetImagesApi } from "./api/getImagesApi";
import { PostImageApi } from "./api/postImageApi";
import { DeleteImageApi } from "./api/deleteImageApi";
import { updateFeaturedImageApi } from "./api/updateFeaturedImageApi";

import { updateImageCategoryApi } from "./api/updateImageCategoryApi";
import { updateImageTagsApi } from "./api/updateImageTagsApi";
import { updateImageAccessApi } from "./api/updateImageAccessApi";

export default function registerImagesRoutes(router: RouterType) {
  router.get("/api/images/", GetImagesApi);
  router.post("/api/images/upload", PostImageApi);
  router.get("/image/:key", GetViewImageApi);
  router.get("/image/:key/download", downloadImageApi);
  router.delete("/api/images/:id", DeleteImageApi);
  router.post("/api/admin/update-featured", updateFeaturedImageApi);

  router.put("/api/images/update-image-category", updateImageCategoryApi);
  router.put("/api/images/update-image-tags", updateImageTagsApi);
  router.patch("/api/images/update-image-access", updateImageAccessApi);
}
