import registerImagesRoutes from "./apps/images/urls";
import { RouterType } from "./router";

export function registerAllRoutes(router: RouterType) {
  registerImagesRoutes(router)
}