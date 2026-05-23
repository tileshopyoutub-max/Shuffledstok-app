import type { Env } from "../../..";

export async function GetImagesApi(_: Request, env: Env) {
  try {
    const { results } = await env.DB.prepare(
      `
      SELECT
      i.price_cents,
        i.id,
        i.key,
        i.title,
        i.description,
        i.has_watermark,
        i.created_at,
        i.download_free,
        i.featured,
        pl.slug AS listing_slug,
        pl.primary_category AS primary_category,
        GROUP_CONCAT(DISTINCT t.name) AS tags,
        GROUP_CONCAT(DISTINCT c.name) AS categories
      FROM images i
      LEFT JOIN public_listings pl ON pl.entity_type = 'image' AND pl.entity_id = i.id
      LEFT JOIN image_tags it ON i.id = it.image_id
      LEFT JOIN tags t ON t.id = it.tag_id
      LEFT JOIN image_categories ic ON i.id = ic.image_id
      LEFT JOIN categories c ON c.id = ic.category_id
      GROUP BY i.id
      ORDER BY i.created_at DESC
      LIMIT 100
    `
    ).all();

    const images = results.map((img: any) => {
      const { download_free, featured, price_cents, ...rest } = img;

      return {
        ...rest,
        downloadFree: !!Number(download_free),
        priceCents: Number(price_cents) || 0,
        featured: Number(featured) || 0,
        tags: img.tags
          ? img.tags.split(",").map((tag: string) => tag.trim())
          : [],
        categories: img.categories
          ? img.categories.split(",").map((c: string) => c.trim())
          : [],
        slug: img.listing_slug ?? null,
        primaryCategory: img.primary_category ?? null,
        url: `https://shuffledstok-app.tileshopyoutub.workers.dev/image/${img.key}`,
      };
    });

    return new Response(JSON.stringify(images), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Get images error:", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
