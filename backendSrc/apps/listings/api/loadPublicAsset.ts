import type { Env } from "../../..";

export async function loadPublicImageAsset(
  env: Env,
  imageId: number,
  origin: string
) {
  const img = await env.DB.prepare(
    `
    SELECT
      i.id,
      i.key,
      i.title,
      i.description,
      i.has_watermark,
      i.created_at,
      i.download_free,
      i.featured,
      i.price_cents,
      GROUP_CONCAT(DISTINCT t.name) AS tags,
      GROUP_CONCAT(DISTINCT c.name) AS categories
    FROM images i
    LEFT JOIN image_tags it ON i.id = it.image_id
    LEFT JOIN tags t ON t.id = it.tag_id
    LEFT JOIN image_categories ic ON i.id = ic.image_id
    LEFT JOIN categories c ON c.id = ic.category_id
    WHERE i.id = ?
    GROUP BY i.id
    `
  )
    .bind(imageId)
    .first<{
      id: number;
      key: string;
      title: string | null;
      description: string | null;
      has_watermark: number;
      created_at: string;
      download_free: number;
      featured: number;
      price_cents: number;
      tags: string | null;
      categories: string | null;
    }>();

  if (!img) return null;

  const { download_free, featured, price_cents, ...rest } = img;

  return {
    type: "image" as const,
    ...rest,
    downloadFree: !!Number(download_free),
    priceCents: Number(price_cents) || 0,
    featured: Number(featured) || 0,
    tags: img.tags ? img.tags.split(",").map((tag) => tag.trim()) : [],
    categories: img.categories
      ? img.categories.split(",").map((category) => category.trim())
      : [],
    url: `${origin}/image/${img.key}`,
  };
}

export async function loadPublicArchiveAsset(
  env: Env,
  archiveId: number,
  origin: string
) {
  const archive = await env.DB.prepare(
    `
    SELECT
      a.id,
      a.title,
      a.description,
      a.download_free,
      a.created_at,
      a.featured,
      a.price_cents,
      a.preview_image_id,
      GROUP_CONCAT(DISTINCT t.name) AS tags,
      GROUP_CONCAT(DISTINCT c.name) AS categories
    FROM archives a
    LEFT JOIN archive_tags at ON a.id = at.archive_id
    LEFT JOIN tags t ON t.id = at.tag_id
    LEFT JOIN archive_categories ac ON a.id = ac.archive_id
    LEFT JOIN categories c ON c.id = ac.category_id
    WHERE a.id = ?
    GROUP BY a.id
    `
  )
    .bind(archiveId)
    .first<{
      id: number;
      title: string | null;
      description: string | null;
      download_free: number;
      created_at: string;
      featured: number;
      price_cents: number;
      preview_image_id: number | null;
      tags: string | null;
      categories: string | null;
    }>();

  if (!archive) return null;

  const imagesResult = await env.DB.prepare(
    `
    SELECT id, key, archive_id, sort_order
    FROM archive_images
    WHERE archive_id = ?
    ORDER BY sort_order
    `
  )
    .bind(archiveId)
    .all<{ id: number; key: string; archive_id: number; sort_order: number }>();

  const imageList = (imagesResult.results ?? []).map((img) => ({
    id: img.id,
    key: img.key,
    url: `${origin}/image/${img.key}`,
    archiveId: img.archive_id,
    sortOrder: img.sort_order,
  }));

  return {
    type: "archive" as const,
    id: archive.id,
    title: archive.title,
    description: archive.description,
    downloadFree: !!Number(archive.download_free),
    priceCents: Number(archive.price_cents) || 0,
    featured: Number(archive.featured) || 0,
    created_at: archive.created_at,
    tags: archive.tags ? archive.tags.split(",").map((tag) => tag.trim()) : [],
    categories: archive.categories
      ? archive.categories.split(",").map((category) => category.trim())
      : [],
    images: imageList,
    preview_image_id: archive.preview_image_id ?? imageList[0]?.id,
  };
}
