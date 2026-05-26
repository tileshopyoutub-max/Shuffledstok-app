import type { MediaItem } from "../../components/admin/hooks/useAllMedia";
import type { EntityType, PrimaryCategory } from "../../shared/types/listing";

const DEFAULT_LIMIT = 6;

export interface RelatedAssetsCurrent {
  id: number;
  entityType: EntityType;
  slug: string;
  primaryCategory: PrimaryCategory;
  tags: string[];
}

export function findRelatedAssets(
  allMedia: MediaItem[],
  current: RelatedAssetsCurrent,
  limit = DEFAULT_LIMIT
): MediaItem[] {
  const currentTags = current.tags.map((tag) => tag.toLowerCase());

  const isCurrentAsset = (item: MediaItem) =>
    item.id === current.id &&
    (current.entityType === "image"
      ? item.type === "image"
      : item.type === "archive");

  const candidates = allMedia.filter((item) => {
    if (isCurrentAsset(item)) return false;
    if (item.primaryCategory !== current.primaryCategory) return false;
    if (!item.slug || !item.primaryCategory) return false;
    return true;
  });

  const ranked = candidates
    .map((item) => {
      const itemTags = item.tags.map((tag) => tag.toLowerCase());
      const tagOverlap = currentTags.filter((tag) => itemTags.includes(tag))
        .length;
      return { item, tagOverlap };
    })
    .sort((a, b) => b.tagOverlap - a.tagOverlap);

  const withTagOverlap = ranked
    .filter((entry) => entry.tagOverlap > 0)
    .map((entry) => entry.item);
  const sameCategoryFallback = ranked
    .filter((entry) => entry.tagOverlap === 0)
    .map((entry) => entry.item);

  return [...withTagOverlap, ...sameCategoryFallback].slice(0, limit);
}
