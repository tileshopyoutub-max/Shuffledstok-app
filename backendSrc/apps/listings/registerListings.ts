import type { RouterType } from "../../router";
import { getPublicListingApi } from "./api/getPublicListingApi";

export default function registerListingsRoutes(router: RouterType) {
  router.get("/api/public/listing/:category/:slug", getPublicListingApi);
}
