import type { Env } from "../../..";
import { isPrimaryCategory } from "../../../shared/primaryCategory";
import { getPublicListingBySlug } from "../../../shared/listings";
import { loadPublicImageAsset, loadPublicArchiveAsset } from "./loadPublicAsset";

const PUBLIC_IMAGE_ORIGIN =
  "https://shuffledstok-app.tileshopyoutub.workers.dev";

export async function getPublicListingApi(request: Request, env: Env) {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const category = parts[3];
    const slug = parts[4];

    if (!isPrimaryCategory(category) || !slug) {
      return new Response(JSON.stringify({ error: "Invalid listing path" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const listing = await getPublicListingBySlug(env, slug);

    if (!listing) {
      return new Response(JSON.stringify({ error: "Listing not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (listing.primary_category !== category) {
      const redirectUrl = `${url.origin}/${listing.primary_category}/${listing.slug}`;
      return new Response(null, {
        status: 301,
        headers: {
          Location: redirectUrl,
          "Content-Type": "application/json",
        },
      });
    }

    const asset =
      listing.entity_type === "image"
        ? await loadPublicImageAsset(env, listing.entity_id, PUBLIC_IMAGE_ORIGIN)
        : await loadPublicArchiveAsset(
            env,
            listing.entity_id,
            PUBLIC_IMAGE_ORIGIN
          );

    if (!asset) {
      return new Response(JSON.stringify({ error: "Asset not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        listing: {
          slug: listing.slug,
          primaryCategory: listing.primary_category,
          entityType: listing.entity_type,
          entityId: listing.entity_id,
          createdAt: listing.created_at,
          updatedAt: listing.updated_at,
        },
        asset,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("getPublicListingApi error:", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
