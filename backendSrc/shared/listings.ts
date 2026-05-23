import type { Env } from "..";
import {
  resolvePrimaryCategory,
  untitledFallbackSlugBase,
  type EntityType,
  type PrimaryCategory,
} from "./primaryCategory";
import { allocateUniqueSlug, buildBaseSlug } from "./slug";

export interface PublicListingRow {
  id: number;
  slug: string;
  entity_type: EntityType;
  entity_id: number;
  primary_category: PrimaryCategory;
  created_at: string;
  updated_at: string;
}

export async function listingExists(
  env: Env,
  entityType: EntityType,
  entityId: number
): Promise<boolean> {
  const row = await env.DB.prepare(
    `SELECT id FROM public_listings WHERE entity_type = ? AND entity_id = ?`
  )
    .bind(entityType, entityId)
    .first<{ id: number }>();

  return Boolean(row);
}

export async function loadTakenSlugs(env: Env): Promise<Set<string>> {
  const { results } = await env.DB.prepare(
    `SELECT slug FROM public_listings`
  ).all<{ slug: string }>();

  return new Set((results ?? []).map((row) => row.slug));
}

async function allocateSlugFromDb(
  env: Env,
  baseSlug: string,
  taken?: Set<string>
): Promise<{ slug: string; suffix: number | null }> {
  const slugSet = taken ?? (await loadTakenSlugs(env));
  return allocateUniqueSlug(baseSlug, slugSet);
}

export async function createPublicListing(
  env: Env,
  params: {
    entityType: EntityType;
    entityId: number;
    title: string | null | undefined;
    categoryNames: string[];
    taken?: Set<string>;
  }
): Promise<PublicListingRow> {
  const exists = await listingExists(env, params.entityType, params.entityId);
  if (exists) {
    throw new Error(
      `Listing already exists for ${params.entityType} ${params.entityId}`
    );
  }

  const primaryCategory = resolvePrimaryCategory(params.categoryNames);
  const fallbackBase = untitledFallbackSlugBase(
    primaryCategory,
    params.entityType
  );
  const baseSlug = buildBaseSlug(params.title, fallbackBase);
  const { slug } = await allocateSlugFromDb(env, baseSlug, params.taken);

  const result = await env.DB.prepare(
    `
    INSERT INTO public_listings (slug, entity_type, entity_id, primary_category)
    VALUES (?, ?, ?, ?)
    `
  )
    .bind(slug, params.entityType, params.entityId, primaryCategory)
    .run();

  const row = await env.DB.prepare(
    `SELECT * FROM public_listings WHERE id = ?`
  )
    .bind(result.meta.last_row_id)
    .first<PublicListingRow>();

  if (!row) {
    throw new Error("Failed to create public listing");
  }

  return row;
}

export async function deletePublicListing(
  env: Env,
  entityType: EntityType,
  entityId: number
): Promise<void> {
  await env.DB.prepare(
    `DELETE FROM public_listings WHERE entity_type = ? AND entity_id = ?`
  )
    .bind(entityType, entityId)
    .run();
}

export async function updatePublicListingCategory(
  env: Env,
  entityType: EntityType,
  entityId: number,
  categoryNames: string[]
): Promise<void> {
  const primaryCategory = resolvePrimaryCategory(categoryNames);

  await env.DB.prepare(
    `
    UPDATE public_listings
    SET primary_category = ?, updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now')
    WHERE entity_type = ? AND entity_id = ?
    `
  )
    .bind(primaryCategory, entityType, entityId)
    .run();
}

export async function getPublicListingBySlug(
  env: Env,
  slug: string
): Promise<PublicListingRow | null> {
  const row = await env.DB.prepare(
    `SELECT * FROM public_listings WHERE slug = ?`
  )
    .bind(slug)
    .first<PublicListingRow>();

  return row ?? null;
}

export async function getCategoryNamesForImage(
  env: Env,
  imageId: number
): Promise<string[]> {
  const { results } = await env.DB.prepare(
    `
    SELECT c.name
    FROM categories c
    INNER JOIN image_categories ic ON ic.category_id = c.id
    WHERE ic.image_id = ?
    `
  )
    .bind(imageId)
    .all<{ name: string }>();

  return (results ?? []).map((row) => row.name);
}

export async function getCategoryNamesForArchive(
  env: Env,
  archiveId: number
): Promise<string[]> {
  const { results } = await env.DB.prepare(
    `
    SELECT c.name
    FROM categories c
    INNER JOIN archive_categories ac ON ac.category_id = c.id
    WHERE ac.archive_id = ?
    `
  )
    .bind(archiveId)
    .all<{ name: string }>();

  return (results ?? []).map((row) => row.name);
}

export async function getCategoryNamesByIds(
  env: Env,
  categoryIds: number[]
): Promise<string[]> {
  if (!categoryIds.length) return [];

  const placeholders = categoryIds.map(() => "?").join(", ");
  const { results } = await env.DB.prepare(
    `SELECT name FROM categories WHERE id IN (${placeholders})`
  )
    .bind(...categoryIds)
    .all<{ name: string }>();

  return (results ?? []).map((row) => row.name);
}
